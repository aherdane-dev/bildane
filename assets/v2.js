// Bildane v2: scroll, menú i radiografia. L'assistent és a assets/assistent.js.
// Sense dependències. Contracte dels workers: _docs/workers.md
(() => {
  const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- adreces de la web antiga ----------
  // Era una sola pàgina: les seccions anaven per àncora i el castellà es
  // recordava a localStorage ("dm-lang"). Portem cada cosa al seu lloc nou.
  const antigues = { '#sectors': '#serveis', '#projecte': '#feines', '#proces': '#com-treballo', '#accio': '#contacte', '#top': '#inici' };
  if (antigues[location.hash]) {
    history.replaceState(null, '', antigues[location.hash]);
    addEventListener('load', () => document.querySelector(location.hash)?.scrollIntoView());
  }
  try {
    if (localStorage.getItem('dm-lang') === 'es') {
      localStorage.removeItem('dm-lang');
      if (location.pathname === '/') { location.replace('/es/' + location.hash); return; }
    }
  } catch {}
  const arrel = document.documentElement;

  // ---------- progrés del scroll ----------
  // [data-scroll]: escena enganxada; --p va de 0 a 1 mentre es travessa.
  // [data-prog]: element normal; --q va de 0 (entra per baix) a 1 (surt per dalt).
  const escenes = [...document.querySelectorAll('[data-scroll]')];
  const progs = new Set();
  // una escena quieta: alçada normal i el moment de repòs (data-quiet)
  const aquieta = s => { s.classList.add('quiet'); s.style.setProperty('--p', s.dataset.quiet ?? 1); };
  if (quiet) {
    escenes.forEach(aquieta);
  } else {
    // al mòbil, el hero no fa escena: va quiet, com amb moviment reduït (director D2)
    const mobil = matchMedia('(max-width: 760px)');
    const segonsMida = () => escenes.forEach(s => { if (mobil.matches) aquieta(s); else s.classList.remove('quiet'); });
    segonsMida();
    mobil.addEventListener('change', () => { segonsMida(); demana(); });
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? progs.add(e.target) : progs.delete(e.target)), { rootMargin: '20% 0px' });
    document.querySelectorAll('[data-prog]').forEach(el => io.observe(el));
    let pendent = 0;
    const posa = () => {
      pendent = 0;
      const h = innerHeight;
      for (const s of escenes) {
        if (s.classList.contains('quiet')) continue;
        const r = s.getBoundingClientRect();
        if (r.bottom < -h || r.top > h * 2) continue;
        s.style.setProperty('--p', Math.min(1, Math.max(0, -r.top / (r.height - h))).toFixed(4));
      }
      for (const el of progs) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--q', Math.min(1, Math.max(0, (h - r.top) / (h + r.height))).toFixed(4));
      }
    };
    const demana = () => { pendent ||= requestAnimationFrame(posa); };
    addEventListener('scroll', demana, { passive: true });
    addEventListener('resize', demana);
    posa();

    // Scroll amb inèrcia suau només amb ratolí (no al mòbil ni amb teclat de pantalla).
    // El script només es descarrega en aquest cas.
    if (matchMedia('(pointer: fine)').matches) {
      const sc = document.createElement('script');
      sc.src = document.currentScript?.src.replace('v2.js', 'lenis.min.js') || '/assets/lenis.min.js';
      sc.onload = () => engega();
      document.head.append(sc);
    }
    function engega() {
      const lenis = new window.Lenis({ lerp: .11, wheelMultiplier: .9 });
      lenis.on('scroll', demana);
      const pas = t => { lenis.raf(t); requestAnimationFrame(pas); };
      requestAnimationFrame(pas);
      // els enllaços interns també llisquen
      document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute('href') === '#') return;
        const desti = document.querySelector(a.getAttribute('href'));
        if (!desti) return;
        e.preventDefault();
        lenis.scrollTo(desti, { offset: 0 });
        history.pushState(null, '', a.getAttribute('href'));
        desti.setAttribute('tabindex', '-1');
        desti.focus({ preventScroll: true });
      });
    }
  }

  // ---------- capçalera ----------
  // Quan baixes marxen la marca i la llengua; el WhatsApp i el menú es queden (director D4).
  const cap = document.querySelector('.cap');
  if (cap) {
    let abans = scrollY, pend = 0;
    addEventListener('scroll', () => {
      pend ||= requestAnimationFrame(() => {
        pend = 0;
        const ara = scrollY;
        if (Math.abs(ara - abans) > 6) cap.classList.toggle('amagada', ara > abans && ara > innerHeight * .6 && !document.body.classList.contains('menu-obert'));
        abans = ara;
      });
    }, { passive: true });
    cap.addEventListener('focusin', () => cap.classList.remove('amagada'));
  }

  // ---------- menú ----------
  const obre = document.querySelector('.cap .obre');
  const menu = document.getElementById('menu');
  if (obre && menu) {
    const tanca = menu.querySelector('.tanca');
    const posaMenu = obert => {
      menu.hidden = !obert;
      obre.setAttribute('aria-expanded', obert);
      document.body.classList.toggle('menu-obert', obert);
      document.querySelectorAll('main, footer').forEach(e => { e.inert = obert; });
      // en obrir, el focus va al primer element: el botó de WhatsApp (director D25)
      (obert ? menu.querySelector('a, button') : obre).focus();
    };
    obre.addEventListener('click', () => posaMenu(true));
    tanca.addEventListener('click', () => posaMenu(false));
    menu.addEventListener('click', e => { if (e.target.closest('a')) posaMenu(false); });
    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') posaMenu(false);
      if (e.key !== 'Tab') return;
      const focus = [...menu.querySelectorAll('a, button')];
      const [primer, darrer] = [focus[0], focus.at(-1)];
      if (e.shiftKey && document.activeElement === primer) { e.preventDefault(); darrer.focus(); }
      else if (!e.shiftKey && document.activeElement === darrer) { e.preventDefault(); primer.focus(); }
    });
  }

  // ---------- copiar el correu i el telèfon ----------
  // El botó diu «Copiat» uns segons; un avís aria-live ho diu als lectors de pantalla.
  if (navigator.clipboard) document.querySelectorAll('.copia').forEach(b => {
    b.hidden = false;
    const text = b.textContent, estat = b.closest('section')?.querySelector('.copia-estat');
    b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copia); } catch { return; }
      b.textContent = b.dataset.fet;
      if (estat) estat.textContent = `${b.dataset.fet}: ${b.dataset.copia}`;
      setTimeout(() => { b.textContent = text; }, 2200);
    });
  });

  const llengua = document.documentElement.lang === 'es' ? 'es' : 'ca';
  const json = (el, sel) => JSON.parse(el.querySelector(sel).textContent);
  const crida = async (url, cos, ms) => {
    const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), ms);
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(cos), signal: ctrl.signal });
      const dades = await r.json().catch(() => ({}));
      return { estat: r.status, dades };
    } finally { clearTimeout(t); }
  };

  // ---------- radiografia de la web ----------
  // Amb endpoint envia { url, lang } i espera { url, notes, pes, carrega, troballes }.
  // Sense endpoint, la radiografia es demana per WhatsApp (no s'ensenya cap resultat).
  document.querySelectorAll('.radiografia').forEach(sec => {
    const tx = json(sec, '.rg-textos');
    const form = sec.querySelector('.rg-form'), input = form.querySelector('input'), error = form.querySelector('.rg-error');
    const endpoint = sec.dataset.endpoint, enviada = form.querySelector('.rg-enviada');
    const res = sec.querySelector('.rg-resultat'), estat = res?.querySelector('.rg-estat');
    const trencadis = res?.querySelector('.rg-trencadis'), troballes = res?.querySelector('.rg-troballes'), arregla = res?.querySelector('.rg-arregla');
    const nivell = n => n >= 90 ? 'be' : n >= 50 ? 'millorable' : 'malament';
    const neteja = v => {
      v = v.trim(); if (!v) return null;
      try { const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`); return /^https?:$/.test(u.protocol) && /\.[a-z]{2,}$/i.test(u.hostname) ? u.href : null; } catch { return null; }
    };
    const peca = (classe, valor, nom, niv) => {
      const d = document.createElement('div'); d.className = `rg-peca ${classe} ${niv}`;
      d.innerHTML = '<span class="valor"></span><span class="nom"></span>';
      d.firstChild.textContent = valor; d.lastChild.textContent = nom; return d;
    };
    const pinta = (r, nota, demanada = r.url) => {
      const mb = r.pes.bytes / 1048576;
      trencadis.replaceChildren(
        ...['rendiment', 'accessibilitat', 'seo', 'bonesPractiques'].map((k, i) => peca(`p${i + 1}`, r.notes[k], tx.notes[k], nivell(r.notes[k]))),
        peca('p5', `${mb.toLocaleString(llengua, { maximumFractionDigits: mb < 10 ? 1 : 0 })} MB`, tx.notes.pes, mb <= 2 ? 'be' : mb <= 5 ? 'millorable' : 'malament'),
      );
      troballes.replaceChildren(...r.troballes.map(x => {
        const li = document.createElement('li'); li.className = x.nivell;
        const b = document.createElement('strong'); b.textContent = x.titol;
        li.append(b, document.createTextNode(' ' + x.text)); return li;
      }));
      estat.textContent = nota || '';
      arregla.href = `https://wa.me/34643844107?text=${encodeURIComponent(tx.arreglaText.replace('{url}', demanada))}`;
    };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const url = neteja(input.value);
      error.textContent = '';
      if (!url) { error.textContent = tx.errors.url; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
      input.removeAttribute('aria-invalid');
      if (!endpoint) {
        const wa = `https://wa.me/34643844107?text=${encodeURIComponent(tx.demanaText.replace('{url}', url))}`;
        window.open(wa, '_blank', 'noopener');
        enviada.textContent = tx.enviada;
        return;
      }
      const boto = form.querySelector('button'); boto.disabled = true;
      res.hidden = false; res.setAttribute('aria-busy', 'true'); res.classList.add('carregant');
      estat.textContent = tx.analitzant; trencadis.replaceChildren(); troballes.replaceChildren();
      try {
        {
          const r = await crida(endpoint, { url, lang: llengua }, 70000);
          if (r.estat === 200 && r.dades.notes) pinta(r.dades);
          else { res.hidden = true; error.textContent = r.estat === 429 ? tx.errors.limit : r.estat === 400 ? tx.errors.url : tx.errors.servei; }
        }
      } catch { res.hidden = true; error.textContent = tx.errors.servei; }
      res.setAttribute('aria-busy', 'false'); res.classList.remove('carregant'); boto.disabled = false;
    });
  });
})();

'use strict';

// Asistente de NEXA. Va después de app.js y avisos.js.
// Sustituye las funciones de IA de app.js (el bloque viejo de voz puede borrarse).

(() => {
  const CLAVE_VOZ = 'nexa_ia_voz';
  const GO_VALIDOS = ['belleza', 'restaurante', 'comida', 'calzado', 'moda', 'farmacia', 'spa', 'super',
    'tecnologia', 'reservas', 'carrito', 'pedido', 'tarjetas', 'favoritos', 'mapa', 'explorar', 'perfil'];

  let leerEnVoz = true;
  try { leerEnVoz = JSON.parse(localStorage.getItem(CLAVE_VOZ) ?? 'true'); } catch (e) {}
  let voz = null, reconocimiento = null, escuchando = false, ocupado = false, saludado = false;
  const memoria = [];
  const uno = lista => lista[Math.floor(Math.random() * lista.length)];
  const nombre = () => (state.user && state.user.provider !== 'guest') ? ', ' + userFirst() : '';

  const css = document.createElement('style');
  css.textContent = `
    .ai-card #iaVoiceBtn, .ai-card #iaMic { margin-left: 0; width: 32px; height: 32px; border-radius: 50%;
      background: var(--accent-soft); color: var(--text); opacity: 1; font-size: 14px; }
    .ia-mic.listening { background: #ef4444 !important; opacity: 1; animation: micPulse 1.1s infinite; }
    @keyframes micPulse { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,.5); } 100% { box-shadow: 0 0 0 12px rgba(239,68,68,0); } }
    .ia-orb.speaking { animation-duration: 1.1s; box-shadow: 0 20px 50px rgba(108,92,231,.55), inset 0 -10px 30px rgba(255,255,255,.5); }
    .ia-avatar.speaking { animation: micPulse 1.1s infinite; }
    .ia-input input.live { color: var(--accent); }
    .ia-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 18px 6px 56px; animation: fadeUp .3s ease; }
    .ia-chips button { border: 1px solid var(--accent-soft); background: var(--bg-card); color: var(--accent);
      font: 600 12px 'Inter', sans-serif; padding: 6px 11px; border-radius: 999px; cursor: pointer; }
    .ia-chips button:active { transform: scale(.96); }
  `;
  document.head.appendChild(css);

  /* Voz */

  function elegirVoz() {
    if (!('speechSynthesis' in window)) return;
    const puntos = v => {
      let p = 0;
      if (/es[-_]ES/i.test(v.lang)) p += 3;
      if (/natural|neural|online/i.test(v.name)) p += 5;
      if (/google/i.test(v.name)) p += 3;
      if (/elvira|helena|laura|m[oó]nica|paulina|luc[ií]a|[aá]lvaro/i.test(v.name)) p += 2;
      return p;
    };
    voz = speechSynthesis.getVoices().filter(v => /^es/i.test(v.lang)).sort((a, b) => puntos(b) - puntos(a))[0] || null;
  }
  if ('speechSynthesis' in window) { elegirVoz(); speechSynthesis.onvoiceschanged = elegirVoz; }

  // quita lo que suena raro al leerlo en voz alta
  const paraLeer = t => String(t)
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B50}]/gu, '')
    .replace(/[*_#`•·]/g, ' ')
    .replace(/(\d+(?:,\d+)?)\s*€/g, '$1 euros')
    .replace(/(\d+(?:,\d+)?)\s*km\b/gi, '$1 kilómetros')
    .replace(/(\d+)\s*m\b/g, '$1 metros')
    .replace(/\bmin\b/gi, 'minutos')
    .replace(/\s+/g, ' ').trim();

  function marcarHablando(si) {
    document.querySelector('.ia-orb')?.classList.toggle('speaking', si);
    document.querySelector('.ia-avatar')?.classList.toggle('speaking', si);
  }
  function callar() {
    try { speechSynthesis.cancel(); } catch (e) {}
    marcarHablando(false);
  }
  function hablar(texto, forzar = false) {
    if ((!leerEnVoz && !forzar) || !('speechSynthesis' in window)) return;
    callar();
    // frases sueltas: suena mejor y Chrome no corta los textos largos
    const frases = (paraLeer(texto).match(/[^.!?¡¿\n]+[.!?]?/g) || []).map(s => s.trim()).filter(Boolean);
    frases.forEach((f, i) => {
      const u = new SpeechSynthesisUtterance(f);
      u.lang = 'es-ES'; u.rate = 1.02; u.pitch = 1;
      if (voz) u.voice = voz;
      if (i === 0) u.onstart = () => marcarHablando(true);
      if (i === frases.length - 1) u.onend = u.onerror = () => marcarHablando(false);
      speechSynthesis.speak(u);
    });
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) callar(); });

  /* Mensajes */

  window.pushMsg = function (role, html, action, chips) {
    const log = $('#chatLog'); if (!log) return;
    const bot = role !== 'user';
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    const plano = tmp.textContent;

    const fila = document.createElement('div');
    fila.className = 'ia-message' + (bot ? '' : ' user-message');
    fila.innerHTML = `${bot ? '<div class="ai-avatar">✨</div>' : ''}<div class="message">${html}` +
      `${action ? `<button type="button" class="inline-action">${esc(action.label)}</button>` : ''}` +
      `${bot && 'speechSynthesis' in window ? '<button type="button" class="link-btn speak-message">🔊 Escuchar</button>' : ''}</div>`;
    log.appendChild(fila);

    fila.querySelector('.inline-action')?.addEventListener('click', () => {
      cerrarIA();
      action.biz ? abrirNegocio(action.biz) : mostrarSeccion(action.go);
    });
    fila.querySelector('.speak-message')?.addEventListener('click', () => hablar(plano, true));

    if (bot && chips?.length) {
      const caja = document.createElement('div');
      caja.className = 'ia-chips';
      chips.forEach(c => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = c;
        b.onclick = () => sendChat(c);
        caja.appendChild(b);
      });
      log.appendChild(caja);
    }
    log.scrollTop = log.scrollHeight;
    return fila;
  };

  /* Cerebro local (sin servidor) */

  const TEMAS = [
    { rx: /pizza|pizzer/, tipo: 'comida', q: /pizza|pizzer/, cosa: 'pizza' },
    { rx: /hamburgues|burger/, tipo: 'comida', q: /burger|hamburg/, cosa: 'hamburguesa' },
    { rx: /sushi|japones/, tipo: 'comida', q: /sushi|japon/, cosa: 'sushi' },
    { rx: /kebab|durum/, tipo: 'comida', q: /kebab|turk/, cosa: 'kebab' },
    { rx: /cafe|desayun|merend/, tipo: 'comida', q: /cafe|panader|pasteler|bakery/, cosa: 'un café' },
    { rx: /hambre|comer|cenar|almorzar|comida|restaurante|tapas/, tipo: 'comida', cosa: 'comida' },
    { rx: /farmacia|medicin|medicament|ibuprofeno|paracetamol|pastilla/, tipo: 'farmacia', cosa: 'farmacia' },
    { rx: /pelo|peluquer|barber|cortarme|barba|manicura/, tipo: 'belleza', cosa: 'peluquería' },
    { rx: /supermercado|\bsuper\b|fruta|verdura/, tipo: 'super', cosa: 'supermercado' },
    { rx: /zapatilla|zapato|calzado|botas/, tipo: 'calzado', cosa: 'tienda de calzado' },
    { rx: /ropa|camiseta|pantalon|vestido|chaqueta|moda/, tipo: 'moda', cosa: 'tienda de moda' },
    { rx: /movil|telefono|auricular|cargador|ordenador/, tipo: 'tecnologia', cosa: 'tienda de tecnología' },
    { rx: /\bspa\b|masaje|relax|talaso/, tipo: 'spa', cosa: 'spa' },
  ];
  const textoDe = b => norm([b.name, b.category, ...(b.tags || [])].join(' '));

  function buscarCerca(tema) {
    let lista = BUSINESSES.filter(b => b.type === tema.tipo);
    let exacto = true;
    if (tema.q) {
      const f = lista.filter(b => tema.q.test(textoDe(b)));
      if (f.length) lista = f; else exacto = false;
    }
    const conPos = lista.filter(b => b.distM != null).sort((a, b) => a.distM - b.distM);
    return { lista: (conPos.length ? conPos : lista).slice(0, 3), exacto };
  }
  const nombrar = l => l.length > 1
    ? `${l[0].name}, a ${l[0].distance}, y ${l[1].name}, a ${l[1].distance}`
    : `${l[0].name}, a ${l[0].distance}`;

  function charla(l) {
    if (/^(hola|buenas|hey|ey|buenos dias|buenas tardes)\b/.test(l)) return uno([`${saludo()}${nombre()}. ¿Qué te apetece?`, `¡Hola${nombre()}! ¿En qué te echo una mano?`]);
    if (/gracias|genial|perfecto|estupendo/.test(l) && l.length < 28) return uno(['A ti. Si necesitas algo más, dime.', 'De nada. Aquí sigo.']);
    if (/quien eres|que eres|que puedes|que sabes/.test(l)) return 'Soy NEXA IA. Te busco sitios cerca de ti, te ayudo a pedir, a reservar y a seguir tu pedido.';
    if (/adios|hasta luego|chao|nos vemos/.test(l)) return uno(['Hasta luego.', 'Que te vaya bien.']);
    return null;
  }

  function cerebro(texto) {
    const l = norm(texto), f = flat(texto);

    const hablado = charla(l);
    if (hablado) return { reply: hablado };

    const negocio = BUSINESSES.find(b => flat(b.name).length >= (b.real ? 4 : 3) && f.includes(flat(b.name)));
    if (negocio) {
      return {
        reply: uno([`Te abro ${negocio.name}.`, `Vamos con ${negocio.name}.`]) + (negocio.distance ? ` Está a ${negocio.distance}.` : ''),
        action: { label: `Abrir ${negocio.name.slice(0, 24)}`, biz: negocio.id },
      };
    }

    if (/pedido|repartidor|seguimiento|cuanto tarda|donde viene/.test(l)) {
      const o = activeOrder();
      if (o) {
        const s = orderState(o);
        return { reply: `Tu pedido ${o.code} va en "${STAGE_TEXT[s.stage].pill.toLowerCase()}". Llega en unos ${s.eta} minutos.`, action: { label: 'Ver seguimiento', go: 'pedido' } };
      }
      return { reply: 'Ahora mismo no tienes ningún pedido en camino. ¿Pedimos algo?', chips: ['Tengo hambre', 'Farmacia cerca'] };
    }

    if (/reserv|\bmesa\b|turno|\bcita\b/.test(l)) {
      return { reply: 'Claro. Elige el sitio, el día y la hora, y lo dejamos cerrado.', action: { label: 'Reservar', go: 'reservas' } };
    }

    if (/cupon|descuento|codigo/.test(l)) {
      return { reply: 'Prueba el código NEXA10 en el carrito: te quita un 10 por ciento, hasta 5 euros.', action: { label: 'Ir al carrito', go: 'carrito' } };
    }
    if (/pagar|pago|tarjeta/.test(l)) {
      return { reply: 'Puedes pagar con tarjeta o con tu billetera NEXA, confirmando con Face ID.', action: { label: 'Mis tarjetas', go: 'tarjetas' } };
    }
    if (/saldo|billetera|cartera/.test(l)) {
      return { reply: `Tienes ${eur(state.wallet)} en tu billetera.`, action: { label: 'Ver perfil', go: 'perfil' } };
    }
    if (/favorito/.test(l)) return { reply: 'Aquí tienes tus sitios guardados.', action: { label: 'Ver favoritos', go: 'favoritos' } };
    if (/\bmapa\b|ubicacion|como llegar/.test(l)) {
      return { reply: 'Te enseño los negocios que hay a tu alrededor.', action: { label: 'Abrir mapa', go: 'mapa' } };
    }

    const tema = TEMAS.find(t => t.rx.test(l));
    if (tema) {
      const { lista, exacto } = buscarCerca(tema);
      if (!lista.length) {
        return { reply: `No veo ${tema.cosa} cerca todavía. Mira el mapa o activa tu ubicación.`, action: { label: 'Abrir mapa', go: 'mapa' } };
      }
      const reply = exacto
        ? uno([`Para ${tema.cosa} tienes ${nombrar(lista)}.`, `Cerca de ti: ${nombrar(lista)}.`])
        : `No encuentro ${tema.cosa} muy cerca, pero tienes ${nombrar(lista)}.`;
      const chips = ['Verlo en el mapa'];
      if (tema.tipo === 'comida') chips.push('Reservar mesa');
      if (tema.tipo === 'belleza' || tema.tipo === 'spa') chips.push('Reservar turno');
      return { reply, action: { label: `Abrir ${lista[0].name.slice(0, 24)}`, biz: lista[0].id }, chips };
    }

    return {
      reply: uno(['No te he pillado del todo. ¿Buscas comida, una tienda o quieres reservar algo?', 'Dímelo de otra forma, por favor. Puedo buscar sitios, reservar o ver tu pedido.']),
      chips: ['Tengo hambre', 'Reservar', 'Mi pedido'],
    };
  }

  /* Servidor de IA (opcional) */

  function accionValida(a) {
    if (!a || typeof a.label !== 'string') return null;
    const label = a.label.slice(0, 40);
    if (a.biz && bizById(a.biz)) return { label, biz: a.biz };
    if (a.go && GO_VALIDOS.includes(a.go)) return { label, go: a.go };
    return null;
  }
  function contexto() {
    const o = typeof activeOrder === 'function' ? activeOrder() : null;
    const s = o ? orderState(o) : null;
    return {
      city: CONFIG.CITY,
      hour: new Date().getHours(),
      userPos: typeof userPos !== 'undefined' ? userPos : null,
      order: o ? { code: o.code, from: o.from, stage: STAGE_TEXT[s.stage].pill, eta: s.eta } : null,
      nearby: BUSINESSES.filter(b => b.lat != null).sort((a, b) => a.distM - b.distM).slice(0, 15)
        .map(b => ({ id: b.id, name: b.name, type: b.type, category: b.category, distance: b.distance, rating: b.rating })),
    };
  }
  async function preguntarAlServidor(texto) {
    if (!CONFIG.AI_API_URL) return null;
    const ctl = new AbortController();
    const corte = setTimeout(() => ctl.abort(), 15000);
    try {
      const r = await fetch(CONFIG.AI_API_URL, {
        method: 'POST', signal: ctl.signal, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: texto, history: memoria.slice(-8), locale: 'es', context: contexto() }),
      });
      clearTimeout(corte);
      return r.ok ? await r.json() : null;
    } catch (e) { clearTimeout(corte); return null; }
  }

  window.sendChat = async function (texto, porVoz = false) {
    texto = (texto || '').trim();
    if (!texto || ocupado) return;
    ocupado = true; callar();

    $('#iaHero')?.classList.add('hidden-hero');
    $('#chatSuggest')?.classList.add('hidden-suggest');
    $$('#chatLog .ia-chips').forEach(c => c.remove());
    pushMsg('user', esc(texto));

    const campo = $('#iaInput');
    if (campo) { campo.value = ''; campo.classList.remove('live'); }

    const log = $('#chatLog'), pensando = document.createElement('div');
    pensando.className = 'ia-message';
    pensando.innerHTML = '<div class="ai-avatar">✨</div><div class="message"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
    log.appendChild(pensando); log.scrollTop = log.scrollHeight;

    const [remota] = await Promise.all([preguntarAlServidor(texto), new Promise(r => setTimeout(r, 400))]);
    pensando.remove();

    let reply, action, chips;
    if (remota && typeof remota.reply === 'string' && remota.reply.trim()) {
      reply = remota.reply.trim().slice(0, 600);
      action = accionValida(remota.action);
      chips = Array.isArray(remota.chips) ? remota.chips.filter(c => typeof c === 'string').slice(0, 3).map(c => c.slice(0, 30)) : [];
    } else {
      ({ reply, action, chips } = cerebro(texto));
    }

    memoria.push({ role: 'user', content: texto }, { role: 'assistant', content: reply });
    pushMsg('bot', esc(reply), action, chips);
    hablar(reply, porVoz);
    ocupado = false;
  };
  window.preguntarIA = () => { const i = $('#iaInput'); if (i) sendChat(i.value); };

  /* Micrófono */

  function marcarEscucha(si) {
    escuchando = si;
    $$('.ia-mic').forEach(b => b.classList.toggle('listening', si));
    const campo = $('#iaInput');
    if (campo) { campo.classList.toggle('live', si); campo.placeholder = si ? 'Te escucho…' : '¿Qué necesitas?'; }
  }

  window.toggleMicIA = function () {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return mostrarNotificacion('Tu navegador no admite dictado. Prueba con Chrome o Edge.', { tipo: 'warn' });
    if (escuchando) { try { reconocimiento.stop(); } catch (e) {} return; }

    abrirIA(true); callar();
    const rec = new SR();
    let dicho = '';
    rec.lang = 'es-ES'; rec.interimResults = true; rec.maxAlternatives = 1;

    rec.onstart = () => marcarEscucha(true);
    rec.onresult = e => {
      let parcial = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) dicho += r[0].transcript; else parcial += r[0].transcript;
      }
      const campo = $('#iaInput'); if (campo) campo.value = (dicho + parcial).trim();
    };
    rec.onerror = e => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') mostrarNotificacion('El micrófono está bloqueado. Actívalo desde el candado de la barra de direcciones.', { tipo: 'warn' });
      else if (e.error === 'no-speech') mostrarNotificacion('No te he oído. Inténtalo otra vez.', { tipo: 'info' });
    };
    rec.onend = () => {
      marcarEscucha(false); reconocimiento = null;
      if (dicho.trim()) sendChat(dicho, true);
    };
    reconocimiento = rec;
    try { rec.start(); } catch (e) { reconocimiento = null; marcarEscucha(false); }
  };

  /* Abrir y cerrar el panel */

  window.abrirIA = function (silencioso) {
    const panel = $('#iaPanel'); if (!panel) return;
    panel.classList.add('open');
    const saludo = $('#iaGreeting');
    if (saludo) saludo.textContent = (state.user && state.user.provider !== 'guest') ? `Hola, ${userFirst()}` : 'Hola';
    if (!saludado && !silencioso) {
      saludado = true;
      setTimeout(() => hablar(`Hola${nombre()}. ¿En qué te puedo ayudar?`), 450);
    }
    if (matchMedia('(hover: hover)').matches) $('#iaInput')?.focus();
  };
  window.cerrarIA = function () {
    callar();
    if (reconocimiento) { try { reconocimiento.stop(); } catch (e) {} }
    $('#iaPanel')?.classList.remove('open');
  };

  /* Botones del HTML que antes apuntaban a funciones inexistentes */

  document.addEventListener('DOMContentLoaded', () => {
    const btnVoz = $('#iaVoiceBtn');
    if (btnVoz) {
      btnVoz.textContent = leerEnVoz ? '🔊' : '🔇';
      btnVoz.onclick = () => {
        leerEnVoz = !leerEnVoz;
        try { localStorage.setItem(CLAVE_VOZ, JSON.stringify(leerEnVoz)); } catch (e) {}
        btnVoz.textContent = leerEnVoz ? '🔊' : '🔇';
        if (!leerEnVoz) callar();
        mostrarNotificacion(leerEnVoz ? 'Voz activada' : 'Voz desactivada', { tipo: 'ok' });
      };
    }
    const micPanel = $('.ia-input .ia-mic');
    if (micPanel) { micPanel.title = 'Hablar'; micPanel.onclick = toggleMicIA; }
  });
})();
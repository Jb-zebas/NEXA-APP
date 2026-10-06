'use strict';

// Va después de app.js y antes de ia.js.
// Reemplaza el toast y el manejo de permisos de notificaciones.

(() => {
  const MSG_BLOQUEO = 'Las notificaciones están bloqueadas en este navegador.';
  const CLAVE_OFRECIDO = 'nexa_avisos_ofrecidos';
  const ICONOS = { info: 'i', ok: '✓', warn: '!', error: '✕' };

  const css = document.createElement('style');
  css.textContent = `
    .toast.nx { top: auto; bottom: calc(92px + env(safe-area-inset-bottom, 0px)); width: max-content; max-width: 88%;
      display: flex; align-items: center; gap: 10px; text-align: left; padding: 11px 14px; border-radius: 16px;
      background: rgba(24,20,44,.96); border: 1px solid rgba(255,255,255,.08); transform: translate(-50%, 16px); }
    .toast.nx.show { transform: translate(-50%, 0); }
    .toast.nx.con-boton { pointer-events: auto; }
    .nx-ico { width: 22px; height: 22px; flex: none; border-radius: 50%; display: grid; place-items: center;
      font-size: 12px; font-weight: 800; background: var(--accent); color: #fff; }
    .toast.nx.ok .nx-ico { background: #16a34a; }
    .toast.nx.warn .nx-ico { background: #f59e0b; color: #2a1c05; }
    .toast.nx.error .nx-ico { background: #dc2626; }
    .nx-txt { flex: 1; min-width: 0; }
    .nx-btn { flex: none; border: 0; border-radius: 999px; padding: 6px 11px; background: #fff; color: #1c1830;
      font: 700 11.5px 'Inter', sans-serif; cursor: pointer; }
    .nx-pasos { margin: 4px 0 12px; padding-left: 20px; color: var(--ps-text); font-size: 13px; line-height: 1.7; }
    @media (max-width: 600px) { .toast.nx { top: auto; } }
  `;
  document.head.appendChild(css);

  /* Toast */

  let reloj = 0;

  function deducirTipo(t) {
    if (/bloquead|denegad|no se pudo|no pudimos|no v[aá]lid|insuficiente|sin conexi|todav[ií]a/i.test(t)) return 'warn';
    if (/activad|a[ñn]adid|aplicado|confirmad|copiado|actualizad|guardad|compartido/i.test(t)) return 'ok';
    return 'info';
  }

  window.mostrarNotificacion = function (texto, opts = {}) {
    const host = document.querySelector('.phone-screen');
    if (!host || !texto) return;
    host.querySelectorAll('.toast').forEach(t => t.remove());
    clearTimeout(reloj);

    const accion = opts.accion || (texto === MSG_BLOQUEO ? { label: 'Cómo activarlas', fn: ayudaNotificaciones } : null);
    const tipo = opts.tipo || deducirTipo(texto);
    const conEmoji = /^\p{Extended_Pictographic}/u.test(texto);

    const el = document.createElement('div');
    el.className = `toast nx ${tipo}${accion ? ' con-boton' : ''}`;
    el.setAttribute('role', 'status');
    el.innerHTML = `${conEmoji ? '' : `<span class="nx-ico">${ICONOS[tipo]}</span>`}<span class="nx-txt">${esc(texto)}</span>`;

    if (accion) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'nx-btn'; b.textContent = accion.label;
      b.onclick = () => { cerrar(el); accion.fn(); };
      el.appendChild(b);
    }
    host.append(el);
    requestAnimationFrame(() => el.classList.add('show'));
    reloj = setTimeout(() => cerrar(el), accion ? 6500 : Math.max(2400, texto.length * 45));
  };

  function cerrar(el) {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }

  /* Mensaje de permiso bloqueado, más corto */

  const permisoMsgOriginal = window.permisoMsg;
  window.permisoMsg = function (kind, err) {
    const r = permisoMsgOriginal(kind, err);
    return kind === 'notify' && r && /bloqueado/.test(r) ? MSG_BLOQUEO : r;
  };

  /* Ayuda para desbloquear */

  const PASOS = {
    ios: [
      'Abre NEXA desde el icono de tu pantalla de inicio. En Safari: Compartir y «Añadir a pantalla de inicio».',
      'Entra en Ajustes, Notificaciones y NEXA.',
      'Activa «Permitir notificaciones».',
    ],
    android: [
      'Toca el candado junto a la dirección de la web.',
      'Entra en Permisos y luego en Notificaciones.',
      'Elige «Permitir» y vuelve aquí.',
    ],
    escritorio: [
      'Pulsa el candado que hay a la izquierda de la dirección.',
      'Busca «Notificaciones» y ponlo en «Permitir».',
      'Recarga la página.',
    ],
  };
  const plataforma = () => {
    const ua = navigator.userAgent;
    return /iPhone|iPad/.test(ua) ? 'ios' : /Android/.test(ua) ? 'android' : 'escritorio';
  };

  window.ayudaNotificaciones = function () {
    const pasos = PASOS[plataforma()].map(p => `<li>${esc(p)}</li>`).join('');
    abrirSheet('Activar notificaciones', `
      <p class="sh-note">Ahora mismo el navegador las tiene bloqueadas, y sin ellas no podemos avisarte cuando tu pedido salga. Se arregla en un minuto:</p>
      <ol class="nx-pasos">${pasos}</ol>
      <button type="button" class="sh-btn" onclick="revisarNotificaciones()">Ya está</button>
      <button type="button" class="sh-btn ghost" onclick="dejarNotificaciones()">Seguir sin avisos</button>`);
  };

  window.revisarNotificaciones = function () {
    if ('Notification' in window && Notification.permission === 'granted') {
      cerrarSheet();
      state.pushOn = true; saveState(); syncSwitches();
      mostrarNotificacion('Notificaciones activadas', { tipo: 'ok' });
      refreshPermissionState();
    } else {
      mostrarNotificacion('Siguen bloqueadas. Si ya lo cambiaste, recarga la página.', { tipo: 'warn' });
    }
  };

  window.dejarNotificaciones = function () {
    state.pushOn = false; saveState(); cerrarSheet(); syncSwitches();
    if (currentView === 'profileScreen') renderProfile();
  };

  /* Permiso: solo se pide cuando el usuario lo ha querido */

  window.ensureNotifyPermission = async function (manual = false) {
    if (!('Notification' in window)) {
      if (manual) mostrarNotificacion('Este navegador no admite notificaciones.', { tipo: 'warn' });
      return false;
    }
    const estado = Notification.permission;
    if (estado === 'granted') {
      window.NexaBackend?.requestNotifyWithFirebase?.().catch(() => {});
      return true;
    }
    if (estado === 'denied') {
      if (manual) ayudaNotificaciones();
      return false;
    }
    if (!manual) return false;

    let r = 'default';
    try { r = await Notification.requestPermission(); } catch (e) {}
    refreshPermissionState();
    if (r === 'denied') ayudaNotificaciones();
    if (r === 'granted') window.NexaBackend?.requestNotifyWithFirebase?.().catch(() => {});
    return r === 'granted';
  };

  window.initPushFromProfile = async function () {
    const ok = await ensureNotifyPermission(true);
    if (ok) {
      pushNotify('NEXA', 'Notificaciones activadas. Te avisaremos del estado de tus pedidos.');
    } else {
      state.pushOn = false; saveState(); syncSwitches();
    }
  };

  window.solicitarPermisosPendientes = async function () {
    const st = await refreshPermissionState();
    if (st.notifications === 'prompt') await ensureNotifyPermission(true);
    else if (st.notifications === 'denied') ayudaNotificaciones();

    if (st.geolocation === 'prompt') pedirUbicacion();
    else if (st.geolocation === 'denied') mostrarNotificacion(permisoMsg('geo', { name: 'NotAllowedError' }));

    await refreshPermissionState();
  };

  /* Preguntamos después del primer pedido, que es cuando tiene sentido */

  window.aceptarAvisos = async function () {
    cerrarSheet();
    state.pushOn = true; saveState();
    const ok = await ensureNotifyPermission(true);
    if (ok) pushNotify('NEXA', 'Listo, te avisaremos de tu pedido.');
    else { state.pushOn = false; saveState(); }
  };

  function ofrecerAvisos() {
    if (!('Notification' in window) || Notification.permission !== 'default') return;
    if (localStorage.getItem(CLAVE_OFRECIDO)) return;
    localStorage.setItem(CLAVE_OFRECIDO, '1');
    abrirSheet('¿Te avisamos?', `
      <p class="sh-note">Te mandamos un aviso cuando empiecen a preparar tu pedido y cuando el repartidor salga. Nada más.</p>
      <button type="button" class="sh-btn" onclick="aceptarAvisos()">Sí, avísame</button>
      <button type="button" class="sh-btn ghost" onclick="cerrarSheet()">Ahora no</button>`);
  }

  const completarPedidoOriginal = window.completarPedido;
  window.completarPedido = function () {
    completarPedidoOriginal();
    setTimeout(ofrecerAvisos, 2200);
  };

  document.addEventListener('DOMContentLoaded', () => {
    // si el navegador ya las bloqueó, que el interruptor lo refleje
    if ('Notification' in window && Notification.permission === 'denied' && state.pushOn) {
      state.pushOn = false; saveState();
    }
  });
})();
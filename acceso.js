'use strict';

// Inicio de sesión de NEXA. Va después de app.js.
// Con CONFIG.AUTH_API_URL usa el servidor; sin él, guarda las cuentas en este dispositivo.

(() => {
  const CUENTAS = 'nexa_cuentas_v2';
  const ULTIMO_CORREO = 'nexa_ultimo_correo';
  const INTENTOS = 'nexa_intentos_login';
  const MAX_INTENTOS = 5;
  const ESPERA_MS = 30000;

  let enCurso = false;
  const hayServidor = () => !!CONFIG.AUTH_API_URL;
  const correoValido = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

  /* Contraseñas (solo para cuentas locales) */

  const aHex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  const deHex = h => Uint8Array.from(h.match(/../g).map(x => parseInt(x, 16)));
  const nuevaSal = () => aHex(crypto.getRandomValues(new Uint8Array(16)));

  async function derivar(clave, sal) {
    if (!(window.crypto && crypto.subtle)) return 'simple:' + hash(sal + clave);
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: deHex(sal), iterations: 120000, hash: 'SHA-256' }, base, 256);
    return aHex(bits);
  }

  function revisarBloqueo() {
    const d = readJSON(INTENTOS, { n: 0, hasta: 0 });
    const falta = d.hasta - Date.now();
    if (falta > 0) throw new Error(`Demasiados intentos. Espera ${Math.ceil(falta / 1000)} segundos.`);
  }
  function sumarFallo() {
    const d = readJSON(INTENTOS, { n: 0, hasta: 0 });
    d.n++;
    if (d.n >= MAX_INTENTOS) { d.hasta = Date.now() + ESPERA_MS; d.n = 0; }
    writeJSON(INTENTOS, d);
  }
  const borrarFallos = () => writeJSON(INTENTOS, { n: 0, hasta: 0 });

  /* Avisos en pantalla */

  const CAMPOS = { name: ['signupName', 'errName'], email: ['loginEmail', 'errEmail'], pass: ['loginPassword', 'errPass'] };

  function marcar(clave, texto) {
    const [idCampo, idError] = CAMPOS[clave];
    const error = $('#' + idError); if (error) error.textContent = texto;
    $('#' + idCampo)?.closest('.input-box')?.classList.add('invalido');
  }
  function enfocar(clave) { $('#' + CAMPOS[clave][0])?.focus(); }
  function quitarMarca(clave) {
    const [idCampo, idError] = CAMPOS[clave];
    const error = $('#' + idError); if (error) error.textContent = '';
    $('#' + idCampo)?.closest('.input-box')?.classList.remove('invalido');
  }
  function aviso(texto) {
    const a = $('#authError'); if (!a) return;
    a.textContent = texto || '';
    a.classList.toggle('hidden', !texto);
  }
  function limpiar() { Object.keys(CAMPOS).forEach(quitarMarca); aviso(''); }
  function sacudir() {
    const tarjeta = $('#authCard'); if (!tarjeta) return;
    tarjeta.classList.remove('sacudir'); void tarjeta.offsetWidth;
    tarjeta.classList.add('sacudir');
    setTimeout(() => tarjeta.classList.remove('sacudir'), 450);
  }
  function ocupar(si) {
    enCurso = si;
    const b = $('#authSubmit'); if (!b) return;
    b.classList.toggle('cargando', si);
    b.disabled = si;
  }

  /* Cuentas */

  async function porLocal(registro, { correo, clave, nombre }) {
    revisarBloqueo();
    const cuentas = readJSON(CUENTAS, {});

    if (registro) {
      if (cuentas[correo]) throw new Error('Ya hay una cuenta con ese correo. Prueba a entrar.');
      const sal = nuevaSal();
      cuentas[correo] = { nombre, sal, clave: await derivar(clave, sal), creada: Date.now() };
      writeJSON(CUENTAS, cuentas);
      return { name: nombre, email: correo, provider: 'email' };
    }

    const c = cuentas[correo];
    const bien = c && (await derivar(clave, c.sal)) === c.clave;
    if (!bien) { sumarFallo(); throw new Error('Correo o contraseña incorrectos.'); }
    borrarFallos();
    return { name: c.nombre, email: correo, provider: 'email' };
  }

  async function porServidor(registro, { correo, clave, nombre }) {
    const base = CONFIG.AUTH_API_URL.replace(/\/$/, '');
    let r;
    try {
      r = await fetch(`${base}/${registro ? 'signup' : 'login'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, password: clave, ...(registro ? { name: nombre } : {}) }),
      });
    } catch (e) { throw new Error('No hay conexión con el servidor de cuentas.'); }
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.user) throw new Error(d.error || (r.status === 401 ? 'Correo o contraseña incorrectos.' : 'No se pudo completar. Inténtalo de nuevo.'));
    return { ...d.user, token: d.token, provider: 'email' };
  }

  window.entrarApp = async function () {
    if (enCurso) return;
    limpiar();

    const registro = authMode === 'signup';
    const correo = ($('#loginEmail')?.value || '').trim().toLowerCase();
    const clave = $('#loginPassword')?.value || '';
    const nombre = ($('#signupName')?.value || '').trim();

    const fallos = [];
    if (registro && nombre.length < 2) fallos.push(['name', 'Escribe tu nombre.']);
    if (!correoValido(correo)) fallos.push(['email', 'Revisa el correo, parece incompleto.']);
    if (registro ? clave.length < 8 : !clave) fallos.push(['pass', registro ? 'Usa al menos 8 caracteres.' : 'Escribe tu contraseña.']);
    if (fallos.length) {
      fallos.forEach(([k, m]) => marcar(k, m));
      enfocar(fallos[0][0]);
      return sacudir();
    }
    if (registro && !$('#acepto')?.checked) {
      aviso('Para crear la cuenta tienes que aceptar la política de privacidad.');
      return sacudir();
    }

    ocupar(true);
    try {
      const datos = { correo, clave, nombre };
      const usuario = hayServidor() ? await porServidor(registro, datos) : await porLocal(registro, datos);
      localStorage.setItem(ULTIMO_CORREO, correo);
      iniciarSesion(usuario);
    } catch (e) {
      aviso(e.message || 'No se pudo entrar. Inténtalo de nuevo.');
      sacudir();
    } finally {
      ocupar(false);
    }
  };

  window.iniciarSesion = function (usuario) {
    state.user = usuario;
    state.remember = $('#rememberMe')?.checked ?? true;
    saveState();
    applyUser();
    setMain('homeScreen');
    mostrarNotificacion(`Hola, ${userFirst()}`, { tipo: 'ok' });
    // aquí es donde se explica y se pide la ubicación
    setTimeout(() => window.NEXA_GEO?.alEntrar(), 700);
  };

  /* Recuperar contraseña */

  window.recuperarAcceso = function () {
    const correo = ($('#loginEmail')?.value || '').trim();
    if (hayServidor()) {
      abrirSheet('Recuperar acceso', `
        <p class="sh-note">Te enviamos un enlace al correo para que crees una contraseña nueva.</p>
        <input id="rcCorreo" class="sh-input" type="email" placeholder="Correo electrónico" value="${esc(correo)}">
        <button type="button" class="sh-btn" onclick="enviarRecuperacion()">Enviar enlace</button>`);
    } else {
      abrirSheet('Nueva contraseña', `
        <p class="sh-note">Las cuentas de esta versión viven solo en este dispositivo, así que no podemos mandarte un correo. Puedes poner una contraseña nueva aquí mismo.</p>
        <input id="rcCorreo" class="sh-input" type="email" placeholder="Correo de tu cuenta" value="${esc(correo)}">
        <input id="rcClave" class="sh-input" type="password" placeholder="Contraseña nueva (mínimo 8)" autocomplete="new-password">
        <button type="button" class="sh-btn" onclick="cambiarClaveLocal()">Cambiar contraseña</button>`);
    }
  };

  window.enviarRecuperacion = async function () {
    const correo = ($('#rcCorreo')?.value || '').trim().toLowerCase();
    if (!correoValido(correo)) return mostrarNotificacion('Escribe un correo válido', { tipo: 'warn' });
    await fetch(`${CONFIG.AUTH_API_URL.replace(/\/$/, '')}/password-reset`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: correo }),
    }).catch(() => null);
    cerrarSheet();
    mostrarNotificacion('Si existe una cuenta con ese correo, recibirás las instrucciones.', { tipo: 'ok' });
  };

  window.cambiarClaveLocal = async function () {
    const correo = ($('#rcCorreo')?.value || '').trim().toLowerCase();
    const clave = $('#rcClave')?.value || '';
    const cuentas = readJSON(CUENTAS, {});
    if (!cuentas[correo]) return mostrarNotificacion('No hay ninguna cuenta con ese correo en este dispositivo', { tipo: 'warn' });
    if (clave.length < 8) return mostrarNotificacion('La contraseña necesita al menos 8 caracteres', { tipo: 'warn' });
    const sal = nuevaSal();
    cuentas[correo].sal = sal;
    cuentas[correo].clave = await derivar(clave, sal);
    writeJSON(CUENTAS, cuentas);
    borrarFallos();
    cerrarSheet();
    mostrarNotificacion('Contraseña cambiada. Ya puedes entrar.', { tipo: 'ok' });
  };

  /* Google y Apple: los botones solo aparecen si están configurados */

  window.loginGoogle = () => mostrarNotificacion('Google necesita el servidor de cuentas para terminar el acceso.', { tipo: 'warn' });
  window.loginApple = () => mostrarNotificacion('Apple necesita el servidor de cuentas para terminar el acceso.', { tipo: 'warn' });

  /* Textos según la pestaña */

  const modoOriginal = window.setAuthMode;
  window.setAuthMode = function (modo) {
    modoOriginal(modo);
    limpiar();
    const registro = modo === 'signup';
    $('#welcomeTitle').textContent = registro ? 'Crea tu cuenta.' : 'Bienvenido.';
    $('#welcomeSub').textContent = registro ? 'Un minuto y ya puedes pedir y reservar.' : 'Descubre todo lo que necesitas cerca de ti.';
  };

  document.addEventListener('DOMContentLoaded', () => {
    const ultimo = localStorage.getItem(ULTIMO_CORREO);
    if (ultimo && $('#loginEmail')) $('#loginEmail').value = ultimo;

    const hayGoogle = !!CONFIG.GOOGLE_CLIENT_ID, hayApple = !!CONFIG.APPLE_CLIENT_ID;
    $('#socialBlock')?.classList.toggle('hidden', !(hayGoogle || hayApple));
    $('#btnGoogle')?.classList.toggle('hidden', !hayGoogle);
    $('#btnApple')?.classList.toggle('hidden', !hayApple);

    Object.keys(CAMPOS).forEach(k => $('#' + CAMPOS[k][0])?.addEventListener('input', () => { quitarMarca(k); aviso(''); }));
  });
})();
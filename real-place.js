'use strict';

// Ubicación real y negocios reales de OpenStreetMap (Overpass).
// Va después de app.js. Antes estaba pegado al final de app.js: ahora vive aquí.

(() => {
  const CENTRO = { lat: 43.5453, lng: -5.6619 };
  const SERVIDORES = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
  ];
  const RADIO_CERCA = 3000;
  const RADIO_MARCAS = 20000;
  const CLAVE_CACHE = 'nexa_osm_v1';
  const CACHE_MS = 6 * 3600 * 1000;
  const CLAVE_OMITIDO = 'nexa_geo_omitido';
  const CLAVE_MANUAL = 'nexa_geo_manual';
  const OMITIR_MS = 24 * 3600 * 1000;

  // Las franquicias de la demo se enlazan con su sucursal real más cercana
  const FRANQUICIAS = {
    mcdonalds: /mcdonald/i, burgerking: /burger king/i, kfc: /\bkfc\b/i,
    telepizza: /telepizza/i, dominos: /domino'?s/i, fosters: /foster'?s/i,
    mercadona: /mercadona/i, corteingles: /corte ingl/i, zara: /^zara\b(?! home)/i,
    hm: /^h ?& ?m\b/i, nike: /\bnike\b/i, adidas: /adidas/i,
    decathlon: /decathlon/i, mediamarkt: /media ?markt/i,
  };
  const TIPO_FIJO = {
    mercadona: 'super', farmacia: 'farmacia', zara: 'moda', hm: 'moda', corteingles: 'moda',
    nike: 'calzado', adidas: 'calzado', mediamarkt: 'tecnologia', barber: 'belleza', lua: 'belleza', spa: 'spa',
  };

  const AMENITY = {
    restaurant: { cat: 'Restaurante', type: 'comida', kind: 'food', icon: '🍽️' },
    fast_food: { cat: 'Comida rápida', type: 'comida', kind: 'food', icon: '🍔' },
    cafe: { cat: 'Cafetería', type: 'comida', kind: 'food', icon: '☕' },
    bar: { cat: 'Bar', type: 'comida', kind: 'food', icon: '🍺' },
    pharmacy: { cat: 'Farmacia', type: 'farmacia', kind: 'shop', icon: '💊' },
  };
  const SHOP = {
    supermarket: { cat: 'Supermercado', type: 'super', kind: 'shop', icon: '🛒' },
    convenience: { cat: 'Tienda de barrio', type: 'super', kind: 'shop', icon: '🏪' },
    variety_store: { cat: 'Tienda', type: 'compras', kind: 'shop', icon: '🛍️' },
    clothes: { cat: 'Moda', type: 'moda', kind: 'shop', icon: '👕' },
    shoes: { cat: 'Calzado', type: 'calzado', kind: 'shop', icon: '👟' },
    hairdresser: { cat: 'Peluquería', type: 'belleza', kind: 'service', icon: '💇' },
    beauty: { cat: 'Belleza', type: 'belleza', kind: 'service', icon: '💅' },
    bakery: { cat: 'Panadería', type: 'comida', kind: 'shop', icon: '🥖' },
    butcher: { cat: 'Carnicería', type: 'super', kind: 'shop', icon: '🥩' },
    electronics: { cat: 'Tecnología', type: 'tecnologia', kind: 'shop', icon: '📱' },
    mobile_phone: { cat: 'Móviles', type: 'tecnologia', kind: 'shop', icon: '📱' },
    sports: { cat: 'Deportes', type: 'compras', kind: 'shop', icon: '⚽' },
    bicycle: { cat: 'Bicicletas', type: 'compras', kind: 'shop', icon: '🚲' },
    pet: { cat: 'Mascotas', type: 'mascotas', kind: 'shop', icon: '🐾' },
    florist: { cat: 'Floristería', type: 'compras', kind: 'shop', icon: '💐' },
  };
  const COLORES = {
    comida: ['#ff8a4c', '#c2410c'], super: ['#22c55e', '#15803d'], farmacia: ['#06b6d4', '#0e7490'],
    moda: ['#ec4899', '#9d174d'], calzado: ['#6c5ce7', '#4c1d95'], belleza: ['#f59e0b', '#b45309'],
    tecnologia: ['#3b82f6', '#1e3a8a'], mascotas: ['#a16207', '#713f12'], compras: ['#64748b', '#334155'],
  };
  const FILTROS_MAPA = [['', 'Todo'], ['comida', 'Comida'], ['super', 'Súper'], ['farmacia', 'Farmacia'],
    ['moda', 'Moda'], ['calzado', 'Calzado'], ['belleza', 'Belleza'], ['tecnologia', 'Tech']];

  /* Estado */

  let centro = { ...CENTRO };
  let modo = 'centro';            // 'gps' | 'manual' | 'centro'
  let etiqueta = '';              // nombre del sitio cuando es manual
  let cargando = false, fallo = false, secuencia = 0, ultimaCarga = null;
  let mapa = null, grupo = null, marcaUsuario = null, mapaDetalle = null, filtroMapa = '', primerAjuste = true;
  let cercanos = [], marcas = [];

  /* Utilidades */

  const rad = x => x * Math.PI / 180;
  function hav(a, b) {
    const R = 6371000, dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }
  const formatoDist = m => m < 1000 ? `${Math.max(10, Math.round(m / 10) * 10)} m` : `${(m / 1000).toFixed(1).replace('.', ',')} km`;
  const ref = () => userPos || centro;
  const hayLeaflet = () => typeof L !== 'undefined';

  /* Overpass */

  const AM = Object.keys(AMENITY).join('|'), SH = Object.keys(SHOP).join('|');
  const consultaCerca = p => `[out:json][timeout:25];(
    nwr(around:${RADIO_CERCA},${p.lat},${p.lng})["name"]["amenity"~"^(${AM})$"];
    nwr(around:${RADIO_CERCA},${p.lat},${p.lng})["name"]["shop"~"^(${SH})$"];
  );out center tags 250;`;
  const consultaMarcas = p => `[out:json][timeout:30];nwr(around:${RADIO_MARCAS},${p.lat},${p.lng})["name"~"McDonald|Burger King|KFC|Telepizza|Domino|Foster|Mercadona|Corte Ingl|Zara|H&M|Nike|adidas|Decathlon|Media ?Markt",i];out center tags 80;`;

  const CAMPOS = ['name', 'amenity', 'shop', 'cuisine', 'addr:street', 'addr:housenumber', 'addr:city', 'opening_hours', 'phone', 'contact:phone', 'website', 'contact:website'];
  const recortar = el => ({
    type: el.type, id: el.id, lat: el.lat ?? el.center?.lat, lon: el.lon ?? el.center?.lon,
    tags: Object.fromEntries(CAMPOS.filter(k => el.tags?.[k]).map(k => [k, el.tags[k]])),
  });

  async function overpass(consulta) {
    for (const url of SERVIDORES) {
      const ctl = new AbortController();
      const corte = setTimeout(() => ctl.abort(), 25000);
      try {
        const r = await fetch(url, {
          method: 'POST', signal: ctl.signal,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'data=' + encodeURIComponent(consulta),
        });
        clearTimeout(corte);
        if (!r.ok) continue;
        const j = await r.json();
        return (j.elements || []).map(recortar);
      } catch (e) { clearTimeout(corte); }
    }
    throw new Error('overpass-no-disponible');
  }

  /* De elementos OSM a negocios de NEXA */

  const clasificar = t => (t.amenity && AMENITY[t.amenity]) || (t.shop && SHOP[t.shop]) || null;
  const franquiciaDe = nombre => Object.keys(FRANQUICIAS).find(id => FRANQUICIAS[id].test(nombre || '')) || null;

  function detalles(el) {
    const t = el.tags || {};
    const calle = [t['addr:street'], t['addr:housenumber']].filter(Boolean).join(' ');
    return {
      lat: el.lat, lng: el.lon,
      address: calle ? calle + (t['addr:city'] ? ' · ' + t['addr:city'] : '') : 'Ver ubicación en el mapa',
      phone: t.phone || t['contact:phone'] || '',
      website: t.website || t['contact:website'] || '',
      hours: t.opening_hours || '',
    };
  }
  function aNegocio(el) {
    const t = el.tags || {}, c = clasificar(t);
    if (!t.name || !c || el.lat == null) return null;
    const [a, b] = COLORES[c.type] || COLORES.compras;
    const cocina = (t.cuisine || '').split(';').map(s => s.trim().replace(/_/g, ' ')).filter(Boolean);
    return Object.assign({
      id: `osm-${el.type[0]}${el.id}`, name: t.name, category: c.cat, type: c.type, kind: c.kind, icon: c.icon,
      rating: '—', distance: '', price: '', time: '', real: true,
      brand: { a, b, mono: t.name.trim().slice(0, 2).toUpperCase() },
      tags: [c.cat.toLowerCase(), ...cocina],
      description: `${c.cat}${cocina.length ? ' · cocina ' + cocina.join(', ') : ''}. Datos reales de OpenStreetMap.`,
    }, detalles(el));
  }

  function aplicar(cerca, marcasOsm) {
    for (let i = BUSINESSES.length - 1; i >= 0; i--) if (BUSINESSES[i].real) BUSINESSES.splice(i, 1);
    BUSINESSES.forEach(b => { if (b.realLoc) { delete b.lat; delete b.lng; delete b.realLoc; delete b.distM; } });

    const candidatas = {}, vistos = new Set();
    [...cerca, ...marcasOsm].forEach(el => {
      const clave = el.type + el.id;
      if (vistos.has(clave) || el.lat == null) return;
      vistos.add(clave);
      const fid = franquiciaDe(el.tags?.name);
      if (fid) { (candidatas[fid] = candidatas[fid] || []).push(el); return; }
      if (cerca.includes(el)) { const n = aNegocio(el); if (n) BUSINESSES.push(n); }
    });
    Object.entries(candidatas).forEach(([fid, els]) => {
      const negocio = bizById(fid); if (!negocio) return;
      els.sort((x, y) => hav(ref(), { lat: x.lat, lng: x.lon }) - hav(ref(), { lat: y.lat, lng: y.lon }));
      Object.assign(negocio, detalles(els[0]), { realLoc: true });
    });
    calcularDistancias();
  }
  function calcularDistancias() {
    BUSINESSES.forEach(b => {
      if (b.lat == null) return;
      b.distM = hav(ref(), b);
      b.distance = formatoDist(b.distM);
    });
  }

  /* Carga con caché */

  const claveZona = p => `${p.lat.toFixed(2)},${p.lng.toFixed(2)}`;
  function leerCache(pos) {
    const c = readJSON(CLAVE_CACHE, null);
    if (!c || Date.now() - c.t > CACHE_MS) return null;
    return !pos || c.key === claveZona(pos) ? c : null;
  }
  async function cargar(pos) {
    const mia = ++secuencia; ultimaCarga = { ...pos }; fallo = false;
    const c = leerCache(pos);
    if (c) { cargando = false; cercanos = c.near; marcas = c.brand; aplicar(cercanos, marcas); pintarTodo(); return; }
    cargando = true; pintarTodo();
    try {
      cercanos = await overpass(consultaCerca(pos));
      if (mia !== secuencia) return;
      aplicar(cercanos, []); pintarTodo();
      marcas = await overpass(consultaMarcas(pos)).catch(() => []);
      if (mia !== secuencia) return;
      aplicar(cercanos, marcas);
      writeJSON(CLAVE_CACHE, { key: claveZona(pos), t: Date.now(), near: cercanos, brand: marcas });
    } catch (e) { if (mia === secuencia) fallo = true; }
    if (mia === secuencia) { cargando = false; pintarTodo(); }
  }

  /* Ubicación */

  async function estadoPermiso() {
    try { return (await navigator.permissions.query({ name: 'geolocation' })).state; }
    catch (e) { return 'prompt'; }
  }
  const omitidoReciente = () => { const t = +localStorage.getItem(CLAVE_OMITIDO); return !!t && Date.now() - t < OMITIR_MS; };

  function fijarPosicion(pos, origen, nombre = '') {
    userPos = pos; centro = { ...pos }; modo = origen; etiqueta = nombre;
    if (!ultimaCarga || hav(ultimaCarga, pos) > 800) cargar(pos);
    else { calcularDistancias(); pintarTodo(); }
    if (mapa) mapa.setView([pos.lat, pos.lng], 16);
  }

  function pedirPosicion(avisar) {
    if (avisar) mostrarNotificacion('Buscando tu ubicación…');
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(p => {
        fijarPosicion({ lat: +p.coords.latitude.toFixed(5), lng: +p.coords.longitude.toFixed(5) }, 'gps');
        if (avisar) mostrarNotificacion('Ubicación actualizada', { tipo: 'ok' });
        resolve(true);
      }, err => {
        if (err && err.code === 1) abrirGate('denied');
        else if (avisar) mostrarNotificacion('No hemos podido obtener tu ubicación. Inténtalo de nuevo.', { tipo: 'warn' });
        resolve(false);
      }, { timeout: 12000, maximumAge: 60000, enableHighAccuracy: true });
    });
  }

  // auto = lo dispara la app (al entrar); si no, lo ha pulsado la persona
  async function buscarUbicacion({ auto }) {
    if (!navigator.geolocation) { abrirGate('cambiar'); return false; }
    const permiso = await estadoPermiso();
    if (permiso === 'granted') return pedirPosicion(!auto);
    if (permiso === 'denied') { if (!auto || !omitidoReciente()) abrirGate('denied'); return false; }
    if (!auto) return pedirPosicion(true);
    if (omitidoReciente() || modo === 'manual') return false;
    abrirGate('prompt');
    return false;
  }

  /* Pantalla que explica el permiso */

  const TEXTOS_GATE = {
    prompt: ['Encuentra lo que tienes cerca', 'Para enseñarte farmacias, restaurantes y tiendas a tu alrededor, NEXA necesita saber dónde estás. El navegador te va a pedir permiso.'],
    denied: ['Ubicación bloqueada', 'El navegador tiene bloqueada la ubicación. Puedes activarla desde el candado de la barra de direcciones, o escribir tu dirección y seguimos igual.'],
    cambiar: ['¿Dónde estás?', 'Escribe tu calle, tu barrio o tu ciudad y buscamos desde ahí.'],
  };
  let tipoGate = 'prompt', temporizadorBusqueda = 0;

  function abrirGate(tipo) {
    const g = $('#geoGate'); if (!g) return;
    tipoGate = tipo;
    const [titulo, texto] = TEXTOS_GATE[tipo];
    $('#gateTitulo').textContent = titulo;
    $('#gateTexto').textContent = texto;
    $('#gatePuntos').classList.toggle('hidden', tipo !== 'prompt');
    $('#gatePermitir').textContent = tipo === 'denied' ? 'Ya la he activado' : 'Usar mi ubicación';
    $('#gatePermitir').classList.toggle('hidden', tipo === 'cambiar');
    $('#gateManual').classList.toggle('hidden', tipo === 'prompt');
    $('#gateManualBtn').classList.toggle('hidden', tipo !== 'prompt');
    $('#gateResultados').innerHTML = '';
    g.classList.add('open'); g.setAttribute('aria-hidden', 'false');
    setTimeout(() => (tipo === 'prompt' ? $('#gatePermitir') : $('#gateBusca'))?.focus(), 350);
  }
  function cerrarGate() {
    const g = $('#geoGate'); if (!g) return;
    g.classList.remove('open'); g.setAttribute('aria-hidden', 'true');
  }

  async function buscarDireccion() {
    const q = ($('#gateBusca')?.value || '').trim();
    const caja = $('#gateResultados'); if (!caja) return;
    if (q.length < 3) { caja.innerHTML = ''; return; }
    caja.innerHTML = '<p>Buscando…</p>';
    const consulta = /,/.test(q) ? q : `${q}, ${CONFIG.CITY}`;
    try {
      const r = await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=es&accept-language=es&q=' + encodeURIComponent(consulta));
      const lista = r.ok ? await r.json() : [];
      if (!lista.length) { caja.innerHTML = '<p>No encontramos ese sitio. Prueba con la calle y la ciudad.</p>'; return; }
      caja.innerHTML = lista.map((x, i) => {
        const partes = x.display_name.split(',').map(s => s.trim());
        return `<button type="button" data-i="${i}"><b>${esc(partes.slice(0, 2).join(', '))}</b><small>${esc(partes.slice(2, 5).join(', '))}</small></button>`;
      }).join('');
      caja.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
        const x = lista[+b.dataset.i];
        elegirManual(+x.lat, +x.lon, x.display_name);
      }));
    } catch (e) {
      caja.innerHTML = '<p>No hay conexión para buscar. Inténtalo en un momento.</p>';
    }
  }

  function elegirManual(lat, lon, nombre) {
    const pos = { lat: +lat.toFixed(5), lng: +lon.toFixed(5) };
    const corto = nombre.split(',').slice(0, 2).join(',').trim();
    writeJSON(CLAVE_MANUAL, { ...pos, nombre: corto });
    fijarPosicion(pos, 'manual', corto);

    // la dirección de entrega también se actualiza
    const dir = { id: 'geo', label: 'Mi ubicación', line: corto };
    const i = state.addresses.findIndex(a => a.id === 'geo');
    if (i >= 0) state.addresses[i] = dir; else state.addresses.push(dir);
    state.addrIdx = state.addresses.findIndex(a => a.id === 'geo');
    saveState(); renderHeaderAddr();

    cerrarGate();
    mostrarNotificacion('Ubicación fijada', { tipo: 'ok' });
  }

  function conectarGate() {
    $('#gatePermitir')?.addEventListener('click', async () => {
      if (tipoGate === 'denied') {
        if (await estadoPermiso() === 'granted') { cerrarGate(); pedirPosicion(true); }
        else mostrarNotificacion('Sigue bloqueada. Si ya lo cambiaste, recarga la página.', { tipo: 'warn' });
        return;
      }
      cerrarGate();
      pedirPosicion(true);
    });
    $('#gateManualBtn')?.addEventListener('click', () => { $('#gateManual').classList.remove('hidden'); $('#gateManualBtn').classList.add('hidden'); $('#gateBusca')?.focus(); });
    $('#gateOmitir')?.addEventListener('click', () => {
      localStorage.setItem(CLAVE_OMITIDO, String(Date.now()));
      cerrarGate();
      mostrarNotificacion('Usaremos el centro de Gijón. Puedes cambiarlo cuando quieras.');
    });
    $('#gateBuscar')?.addEventListener('click', buscarDireccion);
    $('#gateBusca')?.addEventListener('keydown', e => { if (e.key === 'Enter') buscarDireccion(); });
    $('#gateBusca')?.addEventListener('input', () => { clearTimeout(temporizadorBusqueda); temporizadorBusqueda = setTimeout(buscarDireccion, 700); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarGate(); });
  }

  /* Sección "Cerca de ti" del inicio */

  function textoEstado() {
    if (cargando) return '⏳ Buscando negocios reales…';
    if (fallo) return '⚠️ No se pudo conectar con el mapa. Reintenta.';
    if (modo === 'gps') return '📍 Cerca de tu ubicación';
    if (modo === 'manual') return `📍 Cerca de ${esc(etiqueta)}`;
    return '📍 Zona centro de Gijón';
  }
  function tarjetaCerca(b) {
    return `<div class="place-card near-card" role="button" tabindex="0" onclick="abrirNegocio('${b.id}')" onkeydown="if(event.key==='Enter')this.click()">
      ${brandCover(b, 'md')}
      <span class="time-chip">📍 ${esc(b.distance)}</span>
      <div class="place-body"><h4>${esc(b.name)}</h4><div class="place-meta"><span>${esc(b.category)}</span></div></div></div>`;
  }
  function pintarCerca() {
    const fila = $('#nearRow'), estado = $('#nearStatus'); if (!fila) return;
    if (estado) {
      estado.innerHTML = `<span>${textoEstado()}</span>` +
        (modo !== 'gps' ? '<button type="button" class="link-btn" onclick="NEXA_GEO.locate()">Usar mi ubicación</button>' : '<button type="button" class="link-btn" onclick="NEXA_GEO.cambiar()">Cambiar</button>') +
        (fallo ? '<button type="button" class="link-btn" onclick="NEXA_GEO.reload()">Reintentar</button>' : '');
    }
    const lista = BUSINESSES.filter(b => b.lat != null).sort((a, b) => a.distM - b.distM).slice(0, 12);
    if (!lista.length) {
      fila.innerHTML = cargando
        ? '<div class="skel near-skel"></div><div class="skel near-skel"></div><div class="skel near-skel"></div>'
        : '<p class="muted" style="padding:6px 0">Todavía no hay negocios para mostrar.</p>';
      return;
    }
    fila.innerHTML = lista.map(tarjetaCerca).join('');
  }

  /* Mapa grande */

  const TESELAS = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const ATRIB = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
  const iconoNegocio = b => L.divIcon({
    className: 'nexa-biz-marker', iconSize: [36, 36], iconAnchor: [18, 18], popupAnchor: [0, -16],
    html: `<div class="bm-pin" style="border-color:${b.brand.a}">${b.icon}</div>`,
  });
  const iconoUsuario = () => L.divIcon({
    className: 'nexa-user-marker', iconSize: [30, 30], iconAnchor: [15, 15],
    html: '<span class="um-pulse"></span><span class="um-dot"></span>',
  });

  function prepararMapa() {
    if (mapa || !hayLeaflet()) return;
    mapa = L.map('exploreMap', { zoomControl: false }).setView([ref().lat, ref().lng], 15);
    L.tileLayer(TESELAS, { maxZoom: 19, attribution: ATRIB }).addTo(mapa);
    L.control.zoom({ position: 'topright' }).addTo(mapa);
    grupo = L.markerClusterGroup({
      showCoverageOnHover: false, maxClusterRadius: 50,
      iconCreateFunction: c => {
        const n = c.getChildCount(), t = n < 10 ? 'small' : n < 50 ? 'medium' : 'large';
        return L.divIcon({ html: `<div>${n}</div>`, className: `nexa-cluster nexa-cluster-${t}`, iconSize: L.point(40, 40) });
      },
    });
    mapa.addLayer(grupo);
  }
  function pintarMarcadores() {
    if (!mapa) return;
    grupo.clearLayers();
    BUSINESSES.filter(b => b.lat != null && (!filtroMapa || b.type === filtroMapa)).forEach(b => {
      L.marker([b.lat, b.lng], { icon: iconoNegocio(b), title: b.name })
        .bindPopup(`<b>${esc(b.name)}</b><br><small>${esc(b.category)} · ${esc(b.distance)}</small><br><button type="button" class="popup-go" onclick="abrirNegocio('${b.id}')">Ver negocio</button>`)
        .addTo(grupo);
    });
    if (marcaUsuario) { mapa.removeLayer(marcaUsuario); marcaUsuario = null; }
    if (userPos) marcaUsuario = L.marker([userPos.lat, userPos.lng], { icon: iconoUsuario(), interactive: false, zIndexOffset: 1000 }).addTo(mapa);
  }
  function pintarFiltros() {
    const el = $('#mapChips'); if (!el) return;
    el.innerHTML = FILTROS_MAPA.map(([id, l]) => `<button type="button" class="rchip ${id === filtroMapa ? 'on' : ''}" data-t="${id}">${l}</button>`).join('');
    el.querySelectorAll('.rchip').forEach(b => b.addEventListener('click', () => { filtroMapa = b.dataset.t; pintarFiltros(); pintarMarcadores(); }));
  }
  function ajustarMapa() {
    if (!mapa || !grupo) return;
    const b = grupo.getBounds();
    if (b.isValid()) mapa.fitBounds(b.pad(0.1), { maxZoom: 16 });
  }
  function abrirMapa() {
    if (!hayLeaflet()) return mostrarNotificacion('El mapa necesita conexión a internet', { tipo: 'warn' });
    setMain('mapScreen');
    prepararMapa(); pintarFiltros(); pintarMarcadores(); pintarIndicador();
    setTimeout(() => {
      mapa.invalidateSize();
      if (primerAjuste && grupo.getLayers().length) { ajustarMapa(); primerAjuste = false; }
    }, 340);
  }
  function pintarIndicador() {
    const t = $('#geoTxt'), d = $('#geoDot');
    if (t) t.textContent = cargando ? 'Buscando negocios…' : modo === 'gps' ? 'Tu ubicación' : modo === 'manual' ? etiqueta : 'Centro de Gijón';
    if (d) d.classList.toggle('live', modo === 'gps');
  }

  /* Ficha del negocio: mapa propio */

  const detalleMapaOriginal = window.renderDetailMap;
  window.renderDetailMap = function (b) {
    if (!hayLeaflet() || b.lat == null) return detalleMapaOriginal(b);
    const el = $('#detailMap'); if (!el) return;
    if (mapaDetalle) { mapaDetalle.remove(); mapaDetalle = null; }
    el.innerHTML = `
      <div class="section-head"><h3>Ubicación</h3><span class="menu-note">${esc(b.distance)}</span></div>
      <div id="detailLeaflet" class="leaflet-host"></div>
      <div class="map-actions" style="margin-top:8px">
        <button type="button" class="outline-action" onclick="abrirRuta('${b.id}')">🧭 Cómo llegar</button>
        <button type="button" class="outline-action" onclick="NEXA_GEO.locate()">🎯 Usar mi ubicación</button>
      </div>`;
    mapaDetalle = L.map('detailLeaflet', { zoomControl: false, scrollWheelZoom: false }).setView([b.lat, b.lng], 16);
    L.tileLayer(TESELAS, { maxZoom: 19, attribution: ATRIB }).addTo(mapaDetalle);
    L.marker([b.lat, b.lng], { icon: iconoNegocio(b) }).addTo(mapaDetalle);
    if (userPos) L.marker([userPos.lat, userPos.lng], { icon: iconoUsuario(), interactive: false }).addTo(mapaDetalle);
    setTimeout(() => {
      if (!mapaDetalle) return;
      mapaDetalle.invalidateSize();
      if (userPos) mapaDetalle.fitBounds([[b.lat, b.lng], [userPos.lat, userPos.lng]], { padding: [34, 34], maxZoom: 17 });
      else mapaDetalle.setView([b.lat, b.lng], 16);
    }, 360);
  };

  window.abrirRuta = function (id) {
    const b = bizById(id) || currentBusiness;
    const p = new URLSearchParams({ api: '1', travelmode: 'driving', destination: b.lat != null ? `${b.lat},${b.lng}` : `${b.name} ${CONFIG.CITY}` });
    if (userPos) p.set('origin', `${userPos.lat},${userPos.lng}`);
    window.open('https://www.google.com/maps/dir/?' + p, '_blank', 'noopener');
  };
  window.pedirUbicacion = () => buscarUbicacion({ auto: false });

  window.volverDetalle = function () {
    const vale = ['resultsScreen', 'favoritesScreen', 'reservasScreen', 'mapScreen'].includes(detailFrom);
    setMain(vale ? detailFrom : 'homeScreen');
    if (detailFrom === 'mapScreen') setTimeout(() => mapa && mapa.invalidateSize(), 340);
  };

  /* Ficha de un negocio real (con datos de OSM) */

  const abrirNegocioOriginal = window.abrirNegocio;
  window.abrirNegocio = function (id) {
    abrirNegocioOriginal(id);
    const b = bizById(id);
    if (b && b.real) completarFicha(b);
  };
  function completarFicha(b) {
    const poner = (sel, html) => { const e = $(sel); if (e) e.innerHTML = html; };
    const tel = b.phone ? String(b.phone).split(';')[0].replace(/[^\d+]/g, '') : '';
    const web = b.website ? (/^https?:\/\//i.test(b.website) ? b.website : 'https://' + b.website) : '';
    poner('#detailCategory', esc(b.category));
    poner('#detailChips', `<span class="chip">📌 ${esc(b.address)}</span><span class="chip">📍 ${esc(b.distance)}</span>
      <span class="chip">${b.hours ? '🕒 ' + esc(b.hours.slice(0, 40)) : '🕒 Horario no disponible'}</span>`);
    $('#detailReserve')?.classList.add('hidden');
    $('#detailCartBar')?.classList.add('hidden');
    poner('#detailServices', '');
    poner('#detailMenu', `<div class="section-head"><h3>Contacto</h3><span class="menu-note">OpenStreetMap</span></div>
      ${tel || web ? `<div class="action-row">
        ${tel ? `<a class="outline-action as-link" href="tel:${esc(tel)}">📞 Llamar</a>` : ''}
        ${web ? `<a class="outline-action as-link" href="${esc(web)}" target="_blank" rel="noopener">🌐 Web</a>` : ''}</div>`
        : '<p class="muted">Este negocio no tiene teléfono ni web en OpenStreetMap todavía.</p>'}
      ${b.hours ? `<div class="info-tile" style="margin-top:8px"><span>Horario</span><b>${esc(b.hours)}</b></div>` : ''}`);
    poner('#detailReviews', '<h4>Opiniones</h4><p class="muted">Aún no hay opiniones en NEXA. ¡Sé el primero!</p>');
  }

  const seccionOriginal = window.mostrarSeccion;
  window.mostrarSeccion = function (nombre) { return nombre === 'mapa' ? abrirMapa() : seccionOriginal(nombre); };

  /* Piezas de interfaz que se inyectan */

  function inyectar() {
    $('.header-actions')?.insertAdjacentHTML('afterbegin', '<button type="button" class="notification" onclick="NEXA_GEO.openMap()" aria-label="Mapa">🗺</button>');
    $('.ai-card')?.insertAdjacentHTML('afterend', `
      <div id="nearSection">
        <div class="section-title"><h3>Cerca de ti</h3><button type="button" onclick="NEXA_GEO.openMap()">Ver mapa</button></div>
        <div class="near-status" id="nearStatus"></div>
        <div class="near-row" id="nearRow"></div>
      </div>`);
    $('.phone-screen')?.insertAdjacentHTML('beforeend', `
      <section id="mapScreen" class="flow-screen hidden">
        <header class="flow-header"><button type="button" onclick="setMain('homeScreen')" aria-label="Volver">‹</button><h2>Mapa</h2><button type="button" onclick="NEXA_GEO.cambiar()" aria-label="Cambiar ubicación">🎯</button></header>
        <div class="map-chips-wrap"><div class="rchips" id="mapChips"></div></div>
        <div class="explore-map-wrap">
          <div id="exploreMap" class="leaflet-host explore"></div>
          <div class="geo-hud"><span class="geo-dot" id="geoDot"></span><span class="geo-txt" id="geoTxt"></span></div>
          <div class="map-float-actions">
            <button type="button" onclick="NEXA_GEO.locate()" aria-label="Mi ubicación">🎯</button>
            <button type="button" onclick="NEXA_GEO.fit()" aria-label="Ver todos">⤢</button>
          </div>
        </div>
      </section>`);
  }
  function pintarTodo() {
    pintarCerca(); pintarIndicador();
    if (mapa) pintarMarcadores();
    if (currentView === 'resultsScreen') renderResults();
    if (currentView === 'favoritesScreen') renderFavorites();
  }

  window.NEXA_GEO = {
    openMap: abrirMapa,
    // sin argumentos = lo ha pulsado la persona; con argumento = lo llama la app
    locate: (...args) => buscarUbicacion({ auto: args.length > 0 }),
    alEntrar: () => buscarUbicacion({ auto: true }),
    cambiar: () => abrirGate('cambiar'),
    fit: ajustarMapa,
    reload: () => { localStorage.removeItem(CLAVE_CACHE); cargar(ref()); },
  };

  document.addEventListener('DOMContentLoaded', () => {
    BUSINESSES.forEach(b => { if (TIPO_FIJO[b.id]) b.type = TIPO_FIJO[b.id]; });
    inyectar();
    conectarGate();

    const guardada = readJSON(CLAVE_MANUAL, null);
    const cache = leerCache();
    if (cache) { cercanos = cache.near; marcas = cache.brand; aplicar(cercanos, marcas); }
    pintarCerca();

    const arrancar = () => cargar(centro);
    if (!navigator.geolocation) return guardada ? fijarPosicion({ lat: guardada.lat, lng: guardada.lng }, 'manual', guardada.nombre) : arrancar();

    estadoPermiso().then(permiso => {
      if (permiso === 'granted') pedirPosicion(false).then(ok => { if (!ok) arrancar(); });
      else if (guardada) fijarPosicion({ lat: guardada.lat, lng: guardada.lng }, 'manual', guardada.nombre);
      else arrancar();
    });
  });
})();
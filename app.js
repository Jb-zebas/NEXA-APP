/* =========================================================
   NEXA — app.js (v6 — sensación de app real)
   Archivo único listo para VS Code
   ========================================================= */
'use strict';

const CONFIG = {
  GOOGLE_CLIENT_ID: '',
  APPLE_CLIENT_ID: '',
  AUTH_API_URL: '',
  AI_API_URL: '',
  MAPS_API_KEY: '',
  CITY: 'Gijón, Asturias',
  DELIVERY_FEE: 1.99,
  FREE_DELIVERY_FROM: 30,
};


/* ================= IMÁGENES REALES (Unsplash, optimizadas) ================= */
// w=400&q=80&auto=format → tamaño y calidad razonables para móvil
const IMG = {
  covers: {
    mcdonalds: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=75&auto=format&fit=crop',
    burgerking: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=75&auto=format&fit=crop',
    kfc: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=75&auto=format&fit=crop',
    telepizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=75&auto=format&fit=crop',
    dominos: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=75&auto=format&fit=crop',
    fosters: 'https://images.unsplash.com/photo-1558030006-450675292f6c?w=600&q=75&auto=format&fit=crop',
    mercadona: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=75&auto=format&fit=crop',
    corteingles: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=75&auto=format&fit=crop',
    zara: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=75&auto=format&fit=crop',
    hm: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=75&auto=format&fit=crop',
    nike: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=75&auto=format&fit=crop',
    adidas: 'https://images.unsplash.com/photo-1518002171953-a080af90894c?w=600&q=75&auto=format&fit=crop',
    decathlon: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=75&auto=format&fit=crop',
    mediamarkt: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=75&auto=format&fit=crop',
    farmacia: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=75&auto=format&fit=crop',
    barber: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=75&auto=format&fit=crop',
    lua: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=75&auto=format&fit=crop',
    spa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=75&auto=format&fit=crop',
  },
  products: {
    mcdonalds: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573080496689-880f3e87e5e3?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&q=70&auto=format&fit=crop',
    ],
    burgerking: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639024471283-03521158003d?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&q=70&auto=format&fit=crop',
    ],
    kfc: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573080496689-880f3e87e5e3?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&q=70&auto=format&fit=crop',
    ],
    telepizza: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&q=70&auto=format&fit=crop',
    ],
    dominos: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&q=70&auto=format&fit=crop',
    ],
    fosters: [
      'https://images.unsplash.com/photo-1558030006-450675292f6c?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639024471283-03521158003d?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&q=70&auto=format&fit=crop',
    ],
    mercadona: [
      'https://images.unsplash.com/photo-1619566636858-adf3ef4644b9?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&q=70&auto=format&fit=crop',
    ],
    corteingles: [
      'https://images.unsplash.com/photo-1521572163474-6854fcae573c?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6854fcae573c?w=200&q=70&auto=format&fit=crop',
    ],
    zara: [
      'https://images.unsplash.com/photo-1521572163474-6854fcae573c?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=70&auto=format&fit=crop',
    ],
    hm: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=70&auto=format&fit=crop',
    ],
    nike: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6854fcae573c?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&q=70&auto=format&fit=crop',
    ],
    adidas: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506629082955-511b1b453c5f?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=70&auto=format&fit=crop',
    ],
    decathlon: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=70&auto=format&fit=crop',
    ],
    mediamarkt: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&q=70&auto=format&fit=crop',
    ],
    farmacia: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=70&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&q=70&auto=format&fit=crop',
    ],
  },
};

function coverUrl(id) {
  return IMG.covers[id] || null;
}
function productUrl(bizId, idx) {
  const list = IMG.products[bizId];
  return list && list[idx] ? list[idx] : null;
}

/** Imagen optimizada: lazy, async decode, placeholder, error → quitar */
function optImg(src, cls = '', alt = '') {
  if (!src) return '';
  return `<img class="${cls}" alt="${esc(alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"
    src="${src}" onload="this.classList.add('loaded')" onerror="this.classList.add('err');this.remove()">`;
}


const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const eur = n => (Math.round(n * 100) / 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const norm = s => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const flat = s => norm(s).replace(/[^a-z0-9]/g, '');
const hash = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const pad = n => String(n).padStart(2, '0');
const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const hhmm = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function readJSON(k, fb) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch (e) { return fb; } }
function writeJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

function imgNext(el) {
  const n = (el.dataset.next || '').split('|').filter(Boolean);
  if (!n.length) { el.remove(); return; }
  el.dataset.next = n.slice(1).join('|');
  el.src = n[0];
}

/* ================= ESTADO ================= */
const STATE_KEY = 'nexa_state_v4', USERS_KEY = 'nexa_users_v1', ONBOARD_KEY = 'nexa_onboard_v1';
const baseState = () => ({
  cart: [], bookings: [], orders: [], delivery: 'domicilio', wallet: 1250, cards: [],
  addresses: [{ id: 'a1', label: 'Casa', line: 'Calle Mayor 24, 2ºB' }], addrIdx: 0,
  favorites: [], user: null, remember: true, pushOn: true, dark: false, payIdx: 0,
  tip: 0, coupon: null,
});
let state = Object.assign(baseState(), readJSON(STATE_KEY, {}));
function saveState() { writeJSON(STATE_KEY, state); }
const address = () => state.addresses[state.addrIdx] || state.addresses[0] || { label: 'Añadir', line: 'Añadir dirección' };
const isFav = id => state.favorites.includes(id);
const userFirst = () => (state.user?.name || 'Invitado').split(' ')[0];
const userName = () => state.user?.name || 'Invitado';

/* ================= DATOS ================= */
const TYPES = { comida: 'Comida', super: 'Súper', farmacia: 'Farmacia', moda: 'Moda', calzado: 'Calzado', belleza: 'Belleza', spa: 'Spa', tecnologia: 'Tech', mascotas: 'Mascotas' };
const mesa = () => [
  { n: 'Mesa para 2', dur: '90 min', p: 0, dep: 4 },
  { n: 'Mesa para 4', dur: '90 min', p: 0, dep: 6 },
  { n: 'Mesa para 6', dur: '2 h', p: 0, dep: 10 },
];
const gratis = (...names) => names.map(n => ({ n, dur: '30 min', p: 0, dep: 0 }));
const M = (n, p, i) => ({ n, p, i });
const DEFAULT_REVIEWS = [{ user: 'Carlos M.', text: 'Muy buen servicio, repetiré.', stars: '⭐⭐⭐⭐⭐' }];
function reviewsOf(business) {
  return Array.isArray(business?.reviews) && business.reviews.length
    ? business.reviews
    : DEFAULT_REVIEWS;
}
const barber = () => [
  { n: 'Corte clásico', dur: '30 min', p: 18, dep: 4 },
  { n: 'Corte + barba', dur: '45 min', p: 26, dep: 6 },
  { n: 'Arreglo de barba', dur: '20 min', p: 12, dep: 3 },
];
const hair = () => [
  { n: 'Corte de pelo', dur: '45 min', p: 28, dep: 6 },
  { n: 'Corte + lavado', dur: '60 min', p: 38, dep: 8 },
  { n: 'Coloración', dur: '120 min', p: 65, dep: 12 },
];
const spa = () => [
  { n: 'Circuito termal', dur: '90 min', p: 32, dep: 8 },
  { n: 'Masaje relajante', dur: '50 min', p: 55, dep: 12 },
  { n: 'Circuito + masaje', dur: '150 min', p: 78, dep: 15 },
];

const BUSINESSES = [
  { id: 'mcdonalds', name: "McDonald's", category: 'Comida rápida', type: 'comida', kind: 'food', icon: '🍔', rating: '4,2', distance: '0,8 km', price: '€', time: '15-25 min',
    domain: 'mcdonalds.es', logo: 'https://logo.clearbit.com/mcdonalds.com',
    address: 'C. Corrida, 12 · Gijón', brand: { a: '#DA291C', b: '#FFC72C', mono: 'M' },
    tags: ['hamburguesa', 'burger', 'mcdonalds', 'rapida', 'franquicia'],
    description: "Restaurante McDonald's en el centro de Gijón. Big Mac, McNuggets, menús y McCafé.",
    menu: [M('Big Mac Menú', 8.5, '🍔'), M('McPollo Menú', 7.9, '🍗'), M('McNuggets 9 u.', 6.2, '🍗'), M('Patatas grandes', 3.1, '🍟'), M('McFlurry Oreo', 3.5, '🍦'), M('Coca-Cola', 2.5, '🥤')] },
  { id: 'burgerking', name: 'Burger King', category: 'Hamburguesas', type: 'comida', kind: 'food', icon: '🍔', rating: '4,3', distance: '1,1 km', price: '€', time: '15-25 min',
    domain: 'burgerking.es', logo: 'https://logo.clearbit.com/burgerking.com',
    address: 'C. Menéndez Pelayo · Gijón', brand: { a: '#D62300', b: '#F5A623', mono: 'BK' },
    tags: ['hamburguesa', 'whopper', 'burgerking', 'rapida'],
    description: 'Burger King con Whopper a la parrilla, King Jr. y postres. Recogida o domicilio en Gijón.',
    menu: [M('Whopper Menú', 9.2, '🍔'), M('Whopper doble', 8.9, '🍔'), M('Chicken Royale', 6.5, '🍗'), M('Aros de cebolla', 3.2, '🧅'), M('King Fusion', 2.9, '🍨')] },
  { id: 'kfc', name: 'KFC', category: 'Pollo frito', type: 'comida', kind: 'food', icon: '🍗', rating: '4,1', distance: '1,5 km', price: '€€', time: '20-30 min',
    domain: 'kfc.es', logo: 'https://logo.clearbit.com/kfc.com',
    address: 'Los Fresnos · Gijón', brand: { a: '#E4002B', b: '#7a0014', mono: 'KFC' },
    tags: ['pollo', 'kfc', 'bucket', 'rapida'],
    description: 'KFC Gijón: pollo Original Recipe, buckets, Twister y complementos.',
    menu: [M('Bucket 8 piezas', 14.9, '🍗'), M('Twister', 6.5, '🌯'), M('Zinger Burger', 6.9, '🍔'), M('Patatas Regular', 3.0, '🍟'), M('Coleslaw', 2.4, '🥗')] },
  { id: 'telepizza', name: 'Telepizza', category: 'Pizzería', type: 'comida', kind: 'food', icon: '🍕', rating: '4,0', distance: '1,0 km', price: '€', time: '25-40 min',
    domain: 'telepizza.es', logo: 'https://logo.clearbit.com/telepizza.com',
    address: 'C. Uría · Gijón', brand: { a: '#E30613', b: '#ff6b6b', mono: 'TP' },
    tags: ['pizza', 'telepizza', 'italiana', 'domicilio'],
    description: 'Telepizza a domicilio en Gijón. Pizzas, entrantes y menús familiares.',
    menu: [M('Barbacoa Mediana', 12.9, '🍕'), M('Carbonara', 11.5, '🍕'), M('Teleport', 13.5, '🍕'), M('Pan de ajo', 3.5, '🥖'), M('Helado', 2.8, '🍨')] },
  { id: 'dominos', name: "Domino's Pizza", category: 'Pizzería', type: 'comida', kind: 'food', icon: '🍕', rating: '4,2', distance: '1,4 km', price: '€€', time: '20-35 min',
    domain: 'dominos.es', logo: 'https://logo.clearbit.com/dominos.com',
    address: 'Av. de la Constitución · Gijón', brand: { a: '#006491', b: '#E31837', mono: 'DP' },
    tags: ['pizza', 'dominos', 'domicilio'],
    description: "Domino's Pizza Gijón. Entrega en 30 min o gratis. Especialidades y pizza del mes.",
    menu: [M('Margarita Mediana', 9.9, '🍕'), M('Pepperoni', 12.5, '🍕'), M('Carbonara', 13.0, '🍕'), M('Pan Dominos', 4.5, '🥖'), M('Coca-Cola 1L', 2.8, '🥤')] },
  { id: 'fosters', name: "Foster's Hollywood", category: 'Americana', type: 'comida', kind: 'food', icon: '🥩', rating: '4,4', distance: '2,0 km', price: '€€', time: '25-40 min',
    domain: 'fostershollywood.es', logo: 'https://logo.clearbit.com/fostershollywood.es',
    address: 'Centro Comercial · Gijón', brand: { a: '#1a1a1a', b: '#c4a35a', mono: 'FH' },
    tags: ['americana', 'fosters', 'hamburguesa', 'costillas'],
    description: "Foster's Hollywood: costillas, burgers y ambiente americano en Gijón.",
    services: mesa(), slots: 'meal',
    menu: [M('Hollywood Burger', 12.5, '🍔'), M('Costillas BBQ', 16.9, '🥩'), M('Nachos', 8.5, '🧀'), M('Onion Rings', 5.5, '🧅'), M('Brownie', 5.9, '🍫')] },
  { id: 'mercadona', name: 'Mercadona', category: 'Supermercado', type: 'compras', kind: 'shop', icon: '🛒', rating: '4,5', distance: '0,6 km', price: '€', time: '30-50 min',
    domain: 'mercadona.es', logo: 'https://logo.clearbit.com/mercadona.es',
    address: 'C. Magnus Blikstad · Gijón', brand: { a: '#FF6600', b: '#004B93', mono: 'M' },
    tags: ['supermercado', 'mercadona', 'compra', 'hogar'],
    description: 'Mercadona cerca de ti. Productos frescos, Hacendado y recogida o envío (según servicio).',
    menu: [M('Cesta básica', 15.0, '🧺'), M('Fruta de temporada (1 kg)', 2.5, '🍎'), M('Leche Hacendado 6u', 5.4, '🥛'), M('Pan de pueblo', 1.2, '🍞'), M('Agua 6x1,5L', 3.0, '💧')] },
  { id: 'corteingles', name: 'El Corte Inglés', category: 'Grandes almacenes', type: 'compras', kind: 'shop', icon: '🛍️', rating: '4,3', distance: '1,2 km', price: '€€€', time: '40-60 min',
    domain: 'elcorteingles.es', logo: 'https://logo.clearbit.com/elcorteingles.es',
    address: 'C. Uría / Centro · Gijón', brand: { a: '#00A1DF', b: '#003366', mono: 'ECI' },
    tags: ['corteingles', 'moda', 'tecnologia', 'hogar'],
    description: 'El Corte Inglés Gijón: moda, tecnología, hogar y supermercado.',
    menu: [M('Tarjeta regalo 20€', 20.0, '🎁'), M('Perfume muestra', 29.0, '🧴'), M('Auriculares', 39.0, '🎧'), M('Camiseta basic', 15.0, '👕')] },
  { id: 'zara', name: 'Zara', category: 'Moda', type: 'compras', kind: 'shop', icon: '👗', rating: '4,4', distance: '0,9 km', price: '€€', time: '—',
    domain: 'zara.com', logo: 'https://logo.clearbit.com/zara.com',
    address: 'C. Corrida · Gijón', brand: { a: '#000000', b: '#333333', mono: 'ZARA' },
    tags: ['zara', 'moda', 'ropa', 'inditex'],
    description: 'Zara Gijón (Inditex). Últimas colecciones de hombre, mujer y niño.',
    menu: [M('Camiseta basic', 12.95, '👕'), M('Jeans', 29.95, '👖'), M('Chaqueta', 49.95, '🧥'), M('Bolso', 25.95, '👜')] },
  { id: 'hm', name: 'H&M', category: 'Moda', type: 'compras', kind: 'shop', icon: '👕', rating: '4,1', distance: '1,0 km', price: '€', time: '—',
    domain: 'hm.com', logo: 'https://logo.clearbit.com/hm.com',
    address: 'C. Corrida · Gijón', brand: { a: '#E50010', b: '#000000', mono: 'H&M' },
    tags: ['hm', 'moda', 'ropa'],
    description: 'H&M en el centro de Gijón. Moda asequible y colecciones sostenibles.',
    menu: [M('Camiseta', 9.99, '👕'), M('Sudadera', 24.99, '🧥'), M('Vestido', 19.99, '👗'), M('Gorra', 12.99, '🧢')] },
  { id: 'nike', name: 'Nike', category: 'Deporte', type: 'compras', kind: 'shop', icon: '👟', rating: '4,6', distance: '1,8 km', price: '€€€', time: '—',
    domain: 'nike.com', logo: 'https://logo.clearbit.com/nike.com',
    address: 'Centro comercial / Outlet Asturias', brand: { a: '#111111', b: '#f5f5f5', mono: 'NKE' },
    tags: ['nike', 'zapatillas', 'deporte', 'running'],
    description: 'Nike: zapatillas, ropa técnica y accesorios. Disponibilidad según tienda en Asturias.',
    menu: [M('Air Force 1', 119.0, '👟'), M('Camiseta Dri-FIT', 29.0, '👕'), M('Mochila', 45.0, '🎒'), M('Gorra Heritage', 25.0, '🧢')] },
  { id: 'adidas', name: 'adidas', category: 'Deporte', type: 'compras', kind: 'shop', icon: '👟', rating: '4,5', distance: '1,7 km', price: '€€', time: '—',
    domain: 'adidas.es', logo: 'https://logo.clearbit.com/adidas.com',
    address: 'Tiendas adidas Asturias', brand: { a: '#000000', b: '#ffffff', mono: 'adi' },
    tags: ['adidas', 'zapatillas', 'deporte'],
    description: 'adidas: Originals, Running y fútbol. Calzado y textil oficial.',
    menu: [M('Samba OG', 110.0, '👟'), M('Sudadera Essentials', 55.0, '🧥'), M('Pantalón tiro', 40.0, '👖'), M('Gorra', 22.0, '🧢')] },
  { id: 'decathlon', name: 'Decathlon', category: 'Deporte', type: 'compras', kind: 'shop', icon: '🏕️', rating: '4,5', distance: '3,5 km', price: '€', time: '—',
    domain: 'decathlon.es', logo: 'https://logo.clearbit.com/decathlon.com',
    address: 'Polígono / Gijón área', brand: { a: '#0082C3', b: '#FFC72C', mono: 'DEC' },
    tags: ['decathlon', 'deporte', 'outdoor', 'bici'],
    description: 'Decathlon: equipamiento deportivo, outdoor, ciclismo y running a buen precio.',
    menu: [M('Camiseta running', 9.99, '👕'), M('Esterilla yoga', 12.99, '🧘'), M('Balón fútbol', 14.99, '⚽'), M('Mochila 20L', 19.99, '🎒')] },
  { id: 'mediamarkt', name: 'MediaMarkt', category: 'Tecnología', type: 'compras', kind: 'shop', icon: '📱', rating: '4,0', distance: '2,8 km', price: '€€', time: '—',
    domain: 'mediamarkt.es', logo: 'https://logo.clearbit.com/mediamarkt.es',
    address: 'Parque comercial · Gijón', brand: { a: '#DF0000', b: '#1a1a1a', mono: 'MM' },
    tags: ['mediamarkt', 'tecnologia', 'movil', 'tv'],
    description: 'MediaMarkt Gijón: móviles, TV, informático y electrodomésticos.',
    menu: [M('Fundas móvil', 14.99, '📱'), M('Auriculares BT', 29.99, '🎧'), M('Cable USB-C', 9.99, '🔌'), M('Powerbank', 24.99, '🔋')] },
  { id: 'farmacia', name: 'Farmacia Gijón Centro', category: 'Farmacia', type: 'salud', kind: 'shop', icon: '💊', rating: '4,7', distance: '0,4 km', price: '€', time: '15-25 min',
    domain: 'portalfarma.com', logo: 'https://logo.clearbit.com/portalfarma.com',
    address: 'C. Corrida · Gijón', brand: { a: '#00A651', b: '#e8f8ef', mono: '✚' },
    tags: ['farmacia', 'salud', 'medicamento', 'para-farmacia'],
    description: 'Farmacia de guardia y parafarmacia en el centro. Consulta y productos de cuidado personal.',
    menu: [M('Protector solar SPF50', 12.5, '🧴'), M('Ibuprofeno 400mg', 4.5, '💊'), M('Vitamina C', 8.9, '🍊'), M('Mascarilla facial', 3.5, '✨')] },
  { id: 'barber', name: 'The Barber Co. Gijón', category: 'Barbería', type: 'servicios', kind: 'service', icon: '💈', rating: '4,8', distance: '0,7 km', price: '€€', time: '—',
    domain: 'thebarberco.es', logo: 'https://logo.clearbit.com/thebarberco.es',
    address: 'Cimadevilla / Centro · Gijón', brand: { a: '#1c1c1c', b: '#c9a227', mono: 'TB' },
    tags: ['barberia', 'pelo', 'corte', 'barba'],
    description: 'Barbería moderna en Gijón. Cortes clásicos, fade y arreglo de barba. Reserva tu hora.',
    services: barber(), slots: 'service' },
  { id: 'lua', name: 'Lúa Hair Studio', category: 'Peluquería', type: 'servicios', kind: 'service', icon: '💇', rating: '4,9', distance: '1,1 km', price: '€€', time: '—',
    domain: 'instagram.com', logo: 'https://logo.clearbit.com/instagram.com',
    address: 'Centro · Gijón', brand: { a: '#9b59b6', b: '#e8d5f2', mono: 'LÚA' },
    tags: ['peluqueria', 'color', 'corte', 'mujer'],
    description: 'Estudio de peluquería en Gijón. Color, corte y tratamientos. Pide cita online.',
    services: hair(), slots: 'service' },
  { id: 'spa', name: 'Talasoponiente', category: 'Spa & bienestar', type: 'servicios', kind: 'service', icon: '🧖', rating: '4,6', distance: '2,2 km', price: '€€€', time: '—',
    domain: 'talasoponiente.com', logo: 'https://logo.clearbit.com/talasoponiente.com',
    address: 'Poniente · Gijón', brand: { a: '#0e4d6b', b: '#7ec8e3', mono: 'TP' },
    tags: ['spa', 'masaje', 'talaso', 'bienestar'],
    description: 'Talasoponiente Gijón: circuitos de agua, masajes y relax junto a la playa de Poniente.',
    services: spa(), slots: 'service' },
];


const CATS = [
  { id: 'comida', label: 'Comida', icon: '🍔', c: '#ff8a4c' }, { id: 'super', label: 'Súper', icon: '🛒', c: '#22c55e' },
  { id: 'farmacia', label: 'Farmacia', icon: '💊', c: '#06b6d4' }, { id: 'moda', label: 'Moda', icon: '👕', c: '#ec4899' },
  { id: 'calzado', label: 'Calzado', icon: '👟', c: '#6c5ce7' }, { id: 'belleza', label: 'Belleza', icon: '💈', c: '#f59e0b' },
  { id: 'spa', label: 'Spa', icon: '🧖', c: '#14b8a6' }, { id: '', label: 'Más', icon: '⋯', c: '#64748b' },
];
const BRAND_IDS = ['mcdonalds', 'kfc', 'burgerking', 'telepizza', 'dominos', 'nike', 'adidas', 'zara', 'hm', 'mercadona'];
const FEATURED_IDS = ['mcdonalds', 'mercadona', 'nike', 'zara'];
const POPULAR_IDS = ['burgerking', 'adidas', 'telepizza', 'kfc', 'hm', 'farmacia', 'decathlon', 'mediamarkt'];
const SLOTS = {
  day: ['09:00', '09:30', '10:30', '11:00', '12:00', '13:30', '15:00', '15:30', '16:30', '17:00', '18:00', '19:00'],
  meal: ['13:00', '13:30', '14:00', '14:30', '20:00', '20:30', '21:00', '21:30', '22:00'],
};
function bizById(id) { return BUSINESSES.find(b => b.id === id); }
const DOW = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

/* ================= COMPONENTES ================= */
function logoUrl(_business) {
  // Se usa el monograma local para evitar favicons remotos con respuestas 404.
  return '';
}

function logoBadge(b) {
  const src = logoUrl(b);
  const img = src
    ? `<img class="bc-logo-img" alt="${esc(b.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"
        src="${src}"
        onerror="this.onerror=null;this.remove();"
        onload="this.classList.add('loaded')">`
    : '';
  return `<span class="bc-logo" title="${esc(b.name)}" style="--c1:${b.brand.a};--c2:${b.brand.b}">
    ${img}
    <span class="bc-logo-mono">${esc(b.brand.mono)}</span>
  </span>`;
}

function brandCover(b, cls = '') {
  const src = coverUrl(b.id);
  const photo = src
    ? `<img class="bc-photo" alt="${esc(b.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${src}" onload="this.classList.add('loaded')" onerror="this.remove()">`
    : '';
  return `<div class="brand-cover ${cls}" style="--c1:${b.brand.a};--c2:${b.brand.b}">
    <span class="bc-blob b1"></span><span class="bc-blob b2"></span><span class="bc-blob b3"></span>
    <span class="bc-emoji">${b.icon}</span>
    ${photo}
    ${logoBadge(b)}
  </div>`;
}
const FACE_SVG = `<svg class="faceid" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16v-5a5 5 0 0 1 5-5h5M32 6h5a5 5 0 0 1 5 5v5M42 32v5a5 5 0 0 1-5 5h-5M16 42h-5a5 5 0 0 1-5-5v-5"/><path d="M17 19v4M31 19v4M24 19v8h-2.5M17 33c4 3.5 10 3.5 14 0"/></svg>`;
const CHECK_SVG = `<svg class="chk" viewBox="0 0 52 52" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><circle class="chk-circle" cx="26" cy="26" r="23"/><path class="chk-tick" d="M15 27l8 8 15-17"/></svg>`;
const NFC_SVG = `<svg class="pc-nfc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 8a6 6 0 0 1 0 8M12 5a10 10 0 0 1 0 14M16 2.5a14 14 0 0 1 0 19"/></svg>`;

function avatarHTML() {
  const u = state.user;
  if (u?.photo) return `<img src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">`;
  return esc(userFirst()[0].toUpperCase());
}

function updateClock() {
  const el = $('#statusTime');
  if (el) el.textContent = hhmm(new Date());
}

/* ================= SESIÓN ================= */
let authMode = 'login';
async function sha(s) {
  try {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  } catch (e) { return 'h' + hash(s); }
}
function pwScore(p) {
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
function setAuthMode(mode) {
  authMode = mode;
  const signup = mode === 'signup';
  $$('.auth-tab').forEach(t => { const on = t.dataset.mode === mode; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); });
  const btn = $('#authSubmit'); if (btn) btn.textContent = signup ? 'Crear cuenta' : 'Entrar';
  const pw = $('#loginPassword'); if (pw) pw.autocomplete = signup ? 'new-password' : 'current-password';
  $$('.signup-only').forEach(e => e.classList.toggle('hidden', !signup));
  $$('.login-only').forEach(e => e.classList.toggle('hidden', signup));
}
function initAuthUI() {
  $$('.auth-tab').forEach(t => t.addEventListener('click', () => setAuthMode(t.dataset.mode)));
  $('#createAccountBtn')?.addEventListener('click', () => setAuthMode('signup'));
  $('#forgotBtn')?.addEventListener('click', recuperarAcceso);
  const pw = $('#loginPassword'), eye = $('#pwToggle');
  if (eye && pw) eye.addEventListener('click', () => {
    const show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    eye.setAttribute('aria-pressed', show);
    eye.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
    eye.textContent = show ? '◎' : '◉';
  });
  if (pw) pw.addEventListener('input', () => { const m = $('#pwMeter'); if (m) m.dataset.l = pwScore(pw.value); });
  [$('#loginEmail'), pw, $('#signupName')].forEach(i => i?.addEventListener('keydown', e => { if (e.key === 'Enter') entrarApp(); }));
}
async function entrarApp() {
  const email = ($('#loginEmail')?.value || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return mostrarNotificacion('Escribe un correo válido');
  if (!CONFIG.AUTH_API_URL) return mostrarNotificacion('El acceso por correo aún no está conectado. Configura AUTH_API_URL en el backend de NEXA.');
  const name = ($('#signupName')?.value || '').trim();
  const password = $('#loginPassword')?.value || '';
  if (password.length < 8) return mostrarNotificacion('La contraseña debe tener al menos 8 caracteres');
  const response = await fetch(`${CONFIG.AUTH_API_URL.replace(/\/$/, '')}/${authMode === 'signup' ? 'signup' : 'login'}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, ...(authMode === 'signup' ? { name } : {}) })
  }).catch(() => null);
  if (!response?.ok) return mostrarNotificacion('No se pudo iniciar sesión. Comprueba el servicio de autenticación.');
  const result = await response.json().catch(() => ({}));
  if (!result.user) return mostrarNotificacion('El servicio de autenticación respondió sin un usuario válido.');
  iniciarSesion({ ...result.user, provider: 'email' });
}
async function recuperarAcceso() {
  const email = ($('#loginEmail')?.value || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return mostrarNotificacion('Escribe primero el correo de tu cuenta');
  if (!CONFIG.AUTH_API_URL) return mostrarNotificacion('La recuperación de contraseña requiere configurar AUTH_API_URL en el backend.');
  const response = await fetch(`${CONFIG.AUTH_API_URL.replace(/\/$/, '')}/password-reset`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email })
  }).catch(() => null);
  mostrarNotificacion(response?.ok ? 'Si existe una cuenta para ese correo, recibirás instrucciones.' : 'No se pudo contactar con el servicio de recuperación.');
}
function entrarInvitado() { iniciarSesion({ name: 'Invitado', email: '', provider: 'guest' }); }
function iniciarSesion(user) {
  state.user = user;
  state.remember = $('#rememberMe')?.checked ?? true;
  saveState();
  applyUser();
  setMain('homeScreen');
  mostrarNotificacion(`👋 Hola, ${userFirst()}`);
  if (state.pushOn) setTimeout(() => { ensureNotifyPermission().then(ok => { if (ok) pushNotify('NEXA', '🔔 Notificaciones listas. Te avisaremos de tus pedidos.'); }); }, 1200);
  // Solicita ubicación con una acción explícita y contextual al entrar en la app.
  setTimeout(() => window.NEXA_GEO?.locate(true), 500);
}
function loginGoogle() { mostrarNotificacion(CONFIG.GOOGLE_CLIENT_ID ? 'Conecta Google Identity Services con el backend de autenticación.' : 'Google no está configurado. Añade el Client ID y configura OAuth en el backend.'); }
function loginApple() { mostrarNotificacion(CONFIG.APPLE_CLIENT_ID ? 'Conecta Apple Sign in con el backend de autenticación.' : 'Apple no está configurado. Añade el Services ID y configura OAuth en el backend.'); }
function cerrarSesion() {
  cerrarIA(); cerrarSheet(); cerrarPago(true);
  state.user = null; state.cart = [];
  saveState(); updateCartDot();
  if ($('#loginPassword')) $('#loginPassword').value = '';
  setAuthMode('login');
  setMain('welcomeScreen');
  mostrarNotificacion('Has cerrado sesión');
}
function applyUser() {
  const av = $('#avatarBtn'); if (av) av.innerHTML = avatarHTML();
  renderHomeExtras();
}

/* ================= NAVEGACIÓN ================= */
const SCREENS = ['splashScreen', 'welcomeScreen', 'homeScreen', 'resultsScreen', 'detailScreen', 'reservasScreen', 'carritoScreen', 'pedidoScreen', 'profileScreen', 'favoritesScreen', 'dashboardScreen', 'cardsScreen', 'onboardingScreen'];
var currentView = 'splashScreen';
let detailFrom = 'homeScreen';
let currentBusiness = BUSINESSES[0], userPos = null;

function setMain(view) {
  if (view === currentView) return;
  const prev = document.getElementById(currentView);
  const next = document.getElementById(view);
  if (prev && !reduceMotion()) {
    prev.classList.add('leaving');
    setTimeout(() => {
      prev.classList.add('hidden');
      prev.classList.remove('leaving', 'active-screen');
    }, 280);
  } else if (prev) {
    prev.classList.add('hidden');
    prev.classList.remove('active-screen');
  }
  if (next) {
    next.classList.remove('hidden');
    if (!reduceMotion()) {
      next.classList.add('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => next.classList.remove('entering'));
      });
    }
    next.classList.add('active-screen');
  }
  currentView = view;
  $('#iaPanel')?.classList.remove('open');
  document.body.classList.toggle('on-dark', view === 'splashScreen' || view === 'welcomeScreen' || view === 'onboardingScreen');
  $$('.nav-item').forEach(n => {
    const map = { homeScreen: 'inicio', resultsScreen: 'explorar', reservasScreen: 'reservas', profileScreen: 'perfil' };
    n.classList.toggle('active', n.dataset.nav === (map[view] || ''));
  });
  if (view === 'homeScreen') { renderHomeExtras(); renderOrderBanner(); }
  if (view === 'profileScreen') renderProfile();
  if (view === 'cardsScreen') renderCardsScreen();
}
function iniciar() {
  if (!readJSON(ONBOARD_KEY, false)) {
    setMain('onboardingScreen');
    return;
  }
  setMain('welcomeScreen');
}

/* ================= ONBOARDING ================= */
let obIdx = 0;
function initOnboarding() {
  const next = $('#obNext'), skip = $('#obSkip');
  if (!next) return;
  next.addEventListener('click', () => {
    const slides = $$('.ob-slide');
    if (obIdx < slides.length - 1) {
      slides[obIdx].classList.remove('active');
      obIdx++;
      slides[obIdx].classList.add('active');
      $$('#obDots i').forEach((d, i) => d.classList.toggle('on', i === obIdx));
      if (obIdx === slides.length - 1) next.textContent = 'Empezar';
    } else {
      writeJSON(ONBOARD_KEY, true);
      setMain('welcomeScreen');
    }
  });
  skip?.addEventListener('click', () => {
    writeJSON(ONBOARD_KEY, true);
    setMain('welcomeScreen');
  });
}

/* ================= INICIO ================= */
function saludo() { const h = new Date().getHours(); return h < 6 ? 'Buenas noches' : h < 13 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches'; }
function tituloHora() {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return '¿Pedimos el <span>desayuno</span>?';
  if (h >= 12 && h < 16) return '¿Qué <span>comemos</span> hoy?';
  if (h >= 16 && h < 21) return '¿Qué te <span>apetece</span> hoy?';
  return '¿Pedimos la <span>cena</span>?';
}
function renderHeaderAddr() { const el = $('#hdrAddr'); if (el) el.textContent = `📍 ${address().line} ⌄`; }
function renderHomeExtras() {
  const sub = $('#helloSub'), title = $('#helloTitle');
  if (sub) sub.textContent = `${saludo()}, ${userFirst()} 👋`;
  if (title) title.innerHTML = tituloHora();
  const av = $('#avatarBtn'); if (av) av.innerHTML = avatarHTML();
  renderHeaderAddr(); renderReorder(); renderPlaces(); renderBookable();
}
function renderCategories() {
  const row = $('#catRow'); if (!row) return;
  row.innerHTML = CATS.map(c => `<button type="button" class="cat-tile" data-cat="${c.id}"><span class="ct-ico" style="background:${c.c}26;color:${c.c}">${c.icon}</span><span>${c.label}</span></button>`).join('');
  row.querySelectorAll('.cat-tile').forEach(b => b.addEventListener('click', () => mostrarResultados(b.dataset.cat, '')));
}
function chipCircle(b) {
  if (!b) return '';
  const src = logoUrl(b);
  const img = src
    ? `<img alt="" src="${src}" loading="lazy" referrerpolicy="no-referrer"
         onerror="this.remove()" onload="this.classList.add('loaded')">`
    : '';
  return `<button type="button" class="brand-chip" onclick="abrirNegocio('${b.id}')">
    <span class="bch-circle" style="--c1:${b.brand.a};--c2:${b.brand.b}">
      ${img}
      <span>${esc(b.brand.mono)}</span>
    </span>
    <small>${esc(b.name)}</small>
  </button>`;
}

function renderBrands() { const r = $('#brandRow'); if (r) r.innerHTML = BRAND_IDS.map(id => chipCircle(bizById(id))).join(''); }
function renderFeatured() {
  const row = $('#featuredRow'); if (!row) return;
  row.innerHTML = FEATURED_IDS.map(bizById).map(b => `
    <div class="feat-card" role="button" tabindex="0" onclick="abrirNegocio('${b.id}')" onkeydown="if(event.key==='Enter')this.click()">
      ${brandCover(b, 'lg')}
      <div class="feat-info"><b>${esc(b.name)}</b><div class="feat-meta"><span>⭐ ${b.rating}</span><span>🕒 ${b.time || b.distance}</span></div></div>
    </div>`).join('');
}
function renderPlaces() {
  const row = $('#placesRow'); if (!row) return;
  row.innerHTML = POPULAR_IDS.map(bizById).map(b => `
    <div class="place-card" role="button" tabindex="0" onclick="abrirNegocio('${b.id}')" onkeydown="if(event.key==='Enter')this.click()">
      ${brandCover(b, 'md')}
      <span class="time-chip">${b.time ? '🕒 ' + b.time : '📍 ' + b.distance}</span>
      <button type="button" class="place-heart" aria-label="Guardar" onclick="toggleFavCard(event,'${b.id}')">${isFav(b.id) ? '♥' : '♡'}</button>
      <div class="place-body"><h4>${esc(b.name)}</h4>
        <div class="place-meta"><span>⭐ ${b.rating}</span><span>·</span><span>${esc(b.category)}</span></div>
        <div class="place-foot"><span class="place-price">${b.menu ? 'Envío ' + eur(CONFIG.DELIVERY_FEE) : b.price}</span><span class="place-add">›</span></div></div>
    </div>`).join('');
}
function toggleFav(id) {
  const i = state.favorites.indexOf(id);
  if (i >= 0) state.favorites.splice(i, 1); else state.favorites.push(id);
  saveState();
}
function toggleFavCard(ev, id) {
  ev.stopPropagation();
  toggleFav(id);
  ev.currentTarget.textContent = isFav(id) ? '♥' : '♡';
  if (navigator.vibrate) navigator.vibrate(8);
}
function renderBookable() {
  const row = $('#bookableRow'); if (!row) return;
  row.innerHTML = ['barber', 'lua', 'spa'].map(bizById).filter(Boolean).map(b => `
    <div class="list-item" role="button" tabindex="0" onclick="startBooking('${b.id}')" onkeydown="if(event.key==='Enter')this.click()">
      <div class="emoji-tile thumb">${brandCover(b, 'sm')}</div>
      <div class="info"><h4>${esc(b.name)}</h4><p>${esc(b.services[0].n)} · ⭐ ${b.rating} · ${b.distance}</p></div>
      <div class="chevron">›</div>
    </div>`).join('');
}
const PROMOS = [
  { tag: 'FRANQUICIAS', title: "McDonald's, KFC y Burger King a tu puerta", btn: 'Pedir ahora', art: '🍔', grad: 'linear-gradient(135deg,#a3162a,#ff8a4c)', go: () => mostrarSeccion('restaurante') },
  { tag: 'CALZADO', title: 'Nike y Adidas: prueba y reserva tu talla', btn: 'Ver zapatillas', art: '👟', grad: 'linear-gradient(135deg,#111827,#6c5ce7)', go: () => mostrarSeccion('calzado') },
  { tag: 'TURNOS', title: 'Reserva y paga la seña aquí', btn: 'Reservar', art: '💈', grad: 'linear-gradient(135deg,#2a1b5e,#6c5ce7)', go: () => mostrarSeccion('reservas') },
  { tag: 'FARMACIA 24H', title: 'Lo que necesitas, en 10-20 min', btn: 'Ver farmacia', art: '💊', grad: 'linear-gradient(135deg,#075985,#22d3ee)', go: () => abrirNegocio('farmacia') },
];
function renderPromos() {
  const row = $('#promoRow'), dots = $('#promoDots'); if (!row) return;
  row.innerHTML = PROMOS.map((p, i) => `
    <div class="promo-slide" data-i="${i}" style="background:${p.grad}" role="button" tabindex="0">
      <div class="promo-copy"><span class="promo-tag">${p.tag}</span><h3>${p.title}</h3><span class="promo-btn">${p.btn} →</span></div>
      <div class="promo-art" aria-hidden="true">${p.art}</div>
    </div>`).join('');
  if (dots) dots.innerHTML = PROMOS.map(() => '<i></i>').join('');
  const setDot = n => dots?.querySelectorAll('i').forEach((d, i) => d.classList.toggle('on', i === n));
  setDot(0);
  row.addEventListener('scroll', () => {
    const s = row.querySelector('.promo-slide'); if (!s) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 12;
    setDot(Math.round(row.scrollLeft / (s.offsetWidth + gap)));
  }, { passive: true });
  let downX = 0;
  row.addEventListener('pointerdown', e => { downX = e.clientX; }, { passive: true });
  row.querySelectorAll('.promo-slide').forEach(el => {
    el.addEventListener('click', e => { if (Math.abs(e.clientX - downX) <= 8) PROMOS[+el.dataset.i].go(); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); PROMOS[+el.dataset.i].go(); } });
  });
}
function renderReorder() {
  const sec = $('#reorderSection'), row = $('#reorderRow'); if (!sec || !row) return;
  const orders = state.orders.filter(o => o.items?.length).slice(0, 2);
  if (!orders.length) { sec.classList.add('hidden'); row.innerHTML = ''; return; }
  sec.classList.remove('hidden');
  row.innerHTML = orders.map((o, i) => `
    <div class="re-card"><div class="re-ico">${esc(o.items[0].icon || '🛍️')}</div>
    <div class="re-info"><b>${esc(o.from)}</b><small>${o.items.map(x => `${x.qty}× ${esc(x.name)}`).join(', ')}</small></div>
    <button type="button" class="re-btn" data-i="${i}">Repetir</button></div>`).join('');
  row.querySelectorAll('.re-btn').forEach(btn => btn.addEventListener('click', () => {
    const o = orders[+btn.dataset.i];
    o.items.forEach(it => {
      const biz = it.business || o.from;
      const ex = state.cart.find(c => c.type === 'item' && c.name === it.name && c.business === biz);
      if (ex) ex.qty += it.qty;
      else state.cart.push({ type: 'item', bizId: it.bizId, business: biz, name: it.name, detail: biz, price: it.price, qty: it.qty, icon: it.icon, color: 'var(--accent-soft)' });
    });
    state.delivery = 'domicilio'; saveState(); updateCartDot(); mostrarSeccion('carrito');
  }));
}

/* ================= RESULTADOS ================= */
let resFilter = '', resQuery = '';
function mostrarSeccion(name) {
  const alias = { restaurante: 'comida', explorar: '', peluqueria: 'belleza' };
  switch (name) {
    case 'inicio': return setMain('homeScreen');
    case 'perfil': return setMain('profileScreen');
    case 'dashboard': renderDashboard(); return setMain('dashboardScreen');
    case 'reservas': renderBookingFlow(); return setMain('reservasScreen');
    case 'carrito': renderCart(); return setMain('carritoScreen');
    case 'pedido': return abrirSeguimiento();
    case 'tarjetas': return setMain('cardsScreen');
    case 'favoritos': renderFavorites(); return setMain('favoritesScreen');
  }
  mostrarResultados(name in alias ? alias[name] : name);
}
function mostrarResultados(tipo = '', q = null) {
  resFilter = tipo;
  resQuery = q !== null ? q : ($('#searchInput')?.value || '').trim();
  const si = $('#resSearch'); if (si) si.value = resQuery;
  renderResults(); setMain('resultsScreen');
}
function actualizarBusqueda() { mostrarResultados('', ($('#searchInput')?.value || '').trim()); }
function renderResults() {
  const chips = $('#resChips'), list = $('#resultsList'), title = $('#resultsTitle');
  if (!chips || !list) return;
  chips.innerHTML = [['', 'Todo'], ...Object.entries(TYPES)].map(([id, l]) => `<button type="button" class="rchip ${id === resFilter ? 'on' : ''}" data-t="${id}">${l}</button>`).join('');
  chips.querySelectorAll('.rchip').forEach(b => b.addEventListener('click', () => { resFilter = b.dataset.t; renderResults(); }));
  const nq = norm(resQuery);
  const res = BUSINESSES.filter(b => (!resFilter || b.type === resFilter) &&
    (!nq || [b.name, b.category, ...b.tags].some(t => norm(t).includes(nq))));
  if (title) title.textContent = nq ? `Resultados para "${resQuery}"` : resFilter ? TYPES[resFilter] : 'Explorar cerca de ti';
  renderBusinesses(list, res);
}
function renderBusinesses(container, list) {
  if (!container) return;
  container.innerHTML = list.length ? list.map(b => `
    <button type="button" class="result-card" onclick="abrirNegocio('${b.id}')">
      <span class="result-thumb">${brandCover(b, 'sm')}</span>
      <span class="result-copy"><b>${esc(b.name)}</b><small>${esc(b.category)}</small><small>⭐ ${b.rating} · ${b.distance}${b.time ? ' · ' + b.time : ''}</small></span>
      <span class="result-arrow">›</span></button>`).join('') : '<div class="empty-state"><div class="icon">🔍</div><h3>Sin resultados</h3><p>Prueba con otra búsqueda o categoría.</p></div>';
}
function renderFavorites() { renderBusinesses($('#favoritesList'), BUSINESSES.filter(b => isFav(b.id))); }

/* ================= DETALLE ================= */
function abrirNegocio(id) {
  if (currentView !== 'detailScreen') detailFrom = currentView;
  currentBusiness = bizById(id) || BUSINESSES[0];
  const b = currentBusiness;
  const icon = $('#detailIcon'); if (icon) icon.innerHTML = brandCover(b, 'xl');
  const name = $('#detailName'); if (name) name.textContent = b.name;
  const cat = $('#detailCategory'); if (cat) cat.textContent = `${b.category} · ${b.price}`;
  const chips = $('#detailChips'); if (chips) chips.innerHTML = `${b.address ? `<span class="chip">📌 ${esc(b.address)}</span>` : ''}<span class="chip">⭐ ${b.rating}</span><span class="chip">📍 ${b.distance}</span>${b.menu && b.time ? `<span class="chip">🕒 ${b.time}</span><span class="chip">🛵 ${eur(CONFIG.DELIVERY_FEE)}</span>` : ''}<span class="chip ok">Abierto ahora</span>`;
  const desc = $('#detailDescription'); if (desc) desc.textContent = b.description;
  const fav = $('#favoriteToggle'); if (fav) fav.textContent = isFav(id) ? '♥ Guardado' : '♡ Guardar';
  const rb = $('#detailReserve'); if (rb) rb.classList.toggle('hidden', !b.services?.length);
  renderDetailMenu(b); renderDetailServices(b); renderDetailMap(b);
  const rev = $('#detailReviews'); if (rev) rev.innerHTML = `<h4>Opiniones de usuarios</h4>` + reviewsOf(b).map(r => `<div class="review-card"><b>${esc(r.user)} ${r.stars}</b><p>${esc(r.text)}</p></div>`).join('');
  renderDetailCartBar();
  setMain('detailScreen');
  const ds = $('#detailScreen'); if (ds) ds.scrollTop = 0;
}
function volverDetalle() { setMain(['resultsScreen', 'favoritesScreen', 'reservasScreen'].includes(detailFrom) ? detailFrom : 'homeScreen'); }
function renderDetailMenu(b) {
  const el = $('#detailMenu'); if (!el) return;
  if (!b.menu) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="section-head"><h3>${b.kind === 'shop' ? 'Comprar con envío' : 'Pedir a domicilio'}</h3><span class="menu-note">${b.time || ''}</span></div>` +
    b.menu.map((m, i) => `
    <div class="menu-item">
      <div class="menu-ico" style="background:linear-gradient(135deg,${b.brand.a}22,${b.brand.b}44)">${m.i}${productUrl(b.id, i) ? `<img class="menu-photo" alt="${esc(m.n)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${productUrl(b.id, i)}" onload="this.classList.add('loaded')" onerror="this.remove()">` : ''}</div>
      <div class="menu-info"><b>${esc(m.n)}</b><small>${eur(m.p)}</small></div>
      <button type="button" class="menu-add" onclick="addToCart('${b.id}',${i},event)" aria-label="Añadir ${esc(m.n)}">+</button>
    </div>`).join('');
}
function renderDetailServices(b) {
  const el = $('#detailServices'); if (!el) return;
  if (!b.services?.length) { el.innerHTML = ''; return; }
  el.innerHTML = `<div class="section-head"><h3>Reservar</h3><span class="menu-note">${b.slots === 'meal' ? 'Mesas' : 'Turnos'}</span></div>` +
    b.services.map((s, i) => `
    <button type="button" class="svc-card" onclick="startBooking('${b.id}',${i})">
      <span class="info"><b>${esc(s.n)}</b><small>${s.dur}${s.p ? ' · ' + eur(s.p) : ''}${depositOf(s) ? ' · seña ' + eur(depositOf(s)) : ' · sin seña'}</small></span>
      <span class="svc-go">Reservar ›</span></button>`).join('');
}
function alternarFavorito() {
  toggleFav(currentBusiness.id);
  const fav = $('#favoriteToggle'); if (fav) fav.textContent = isFav(currentBusiness.id) ? '♥ Guardado' : '♡ Guardar';
  renderPlaces();
  if (navigator.vibrate) navigator.vibrate(8);
}
function mapaURL(b) {
  const where = userPos ? `${userPos.lat},${userPos.lng}` : CONFIG.CITY;
  const q = encodeURIComponent(`${b.name} cerca de ${where}`);
  if (CONFIG.MAPS_API_KEY) return `https://www.google.com/maps/embed/v1/search?key=${encodeURIComponent(CONFIG.MAPS_API_KEY)}&q=${q}`;
  return `https://www.google.com/maps?q=${q}&z=14&output=embed`;
}
function renderDetailMap(b) {
  const el = $('#detailMap'); if (!el) return;
  el.innerHTML = `
    <div class="section-head"><h3>Ubicación</h3><span class="menu-note">${esc(b.distance)}</span></div>
    <div class="map-card" id="mapBox"><button type="button" class="map-ph" onclick="cargarMapa()"><span class="map-pin">📍</span><b>Ver ${esc(b.name)} en Google Maps</b><small>Toca para cargar el mapa</small></button></div>
    <div class="map-actions"><button type="button" class="outline-action" onclick="abrirRuta('${b.id}')">🧭 Cómo llegar</button><button type="button" class="outline-action" onclick="pedirUbicacion()">🎯 Usar mi ubicación</button></div>`;
}
function cargarMapa() {
  const b = currentBusiness, box = $('#mapBox'); if (!box) return;
  box.innerHTML = `<iframe title="Mapa de ${esc(b.name)}" src="${mapaURL(b)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
}
function abrirRuta(id) {
  const b = bizById(id) || currentBusiness;
  const p = new URLSearchParams({ api: '1', destination: `${b.name} ${CONFIG.CITY}`, travelmode: 'driving' });
  if (userPos) p.set('origin', `${userPos.lat},${userPos.lng}`);
  window.open('https://www.google.com/maps/dir/?' + p, '_blank', 'noopener');
}
function pedirUbicacion() {
  if (!navigator.geolocation) return mostrarNotificacion(permisoMsg('geo', { name: 'unsupported' }));
  mostrarNotificacion('Obteniendo ubicación…');
  navigator.geolocation.getCurrentPosition(p => {
    userPos = { lat: +p.coords.latitude.toFixed(5), lng: +p.coords.longitude.toFixed(5) };
    mostrarNotificacion('📍 Ubicación actualizada');
    if ($('#mapBox iframe')) cargarMapa();
  }, err => {
    const code = err?.code;
    // 1 PERMISSION_DENIED, 2 POSITION_UNAVAILABLE, 3 TIMEOUT
    if (code === 1) mostrarNotificacion(permisoMsg('geo', { name: 'NotAllowedError' }));
    else if (code === 3) mostrarNotificacion('Tiempo de espera agotado al obtener la ubicación.');
    else mostrarNotificacion(permisoMsg('geo', err));
  }, { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false });
}

/* ================= CARRITO ================= */
function updateCartDot() {
  const d = $('#cartDot');
  if (!d) return;
  const n = state.cart.reduce((s, i) => s + (i.qty || 1), 0);
  d.classList.toggle('on', n > 0);
}
function flyToCart(fromEl, icon) {
  if (reduceMotion() || !fromEl) return;
  const fly = $('#flyItem');
  if (!fly) return;
  const rect = fromEl.getBoundingClientRect();
  const cartBtn = document.querySelector('.notification[aria-label="Carrito"]') || $('#cartDot');
  const target = cartBtn ? cartBtn.getBoundingClientRect() : { left: window.innerWidth - 40, top: 40 };
  fly.textContent = icon || '+';
  fly.style.left = rect.left + rect.width / 2 - 18 + 'px';
  fly.style.top = rect.top + rect.height / 2 - 18 + 'px';
  fly.style.opacity = '1';
  fly.style.transition = 'none';
  fly.style.transform = 'scale(1)';
  requestAnimationFrame(() => {
    fly.style.transition = 'left 0.55s cubic-bezier(0.2,0.8,0.2,1), top 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s, transform 0.55s';
    fly.style.left = target.left + 'px';
    fly.style.top = target.top + 'px';
    fly.style.transform = 'scale(0.3)';
    fly.style.opacity = '0';
  });
  setTimeout(() => { fly.style.transition = 'none'; fly.style.transform = ''; }, 600);
}
function addToCart(bizId, idx, ev) {
  const b = bizById(bizId);
  if (!b?.menu?.[idx]) return;
  const m = b.menu[idx];
  const ex = state.cart.find(c => c.type === 'item' && c.bizId === bizId && c.name === m.n);
  if (ex) ex.qty++;
  else state.cart.push({ type: 'item', bizId, business: b.name, name: m.n, detail: b.name, price: m.p, qty: 1, icon: m.i, color: 'var(--accent-soft)' });
  saveState(); updateCartDot();
  const btn = ev?.currentTarget || ev?.target;
  if (btn) {
    btn.classList.add('added');
    btn.textContent = '✓';
    setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 700);
    flyToCart(btn, m.i);
  }
  if (navigator.vibrate) navigator.vibrate(12);
  mostrarNotificacion(`${m.n} añadido`);
  renderDetailCartBar();
}
function renderDetailCartBar() {
  const bar = $('#detailCartBar');
  if (!bar) return;
  const items = state.cart.filter(i => i.type === 'item');
  if (!items.length) { bar.classList.add('hidden'); return; }
  const n = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  bar.classList.remove('hidden');
  bar.innerHTML = `<button type="button" onclick="mostrarSeccion('carrito')"><span class="cb-count">${n}</span> Ver carrito <b>${eur(total)}</b></button>`;
}
function cartTotals() {
  const items = state.cart.filter(i => i.type === 'item');
  const bks = state.cart.filter(i => i.type === 'booking');
  const sub = items.reduce((s, i) => s + i.price * i.qty, 0) + bks.reduce((s, i) => s + (i.price || 0), 0);
  const fee = items.length && state.delivery === 'domicilio' ? (sub >= CONFIG.FREE_DELIVERY_FROM ? 0 : CONFIG.DELIVERY_FEE) : 0;
  const tip = state.tip || 0;
  const disc = state.coupon === 'NEXA10' ? Math.min(sub * 0.1, 5) : 0;
  return { sub, fee, tip, disc, total: Math.max(0, sub + fee + tip - disc), hasItems: items.length > 0 };
}
function renderCart() {
  const el = $('#cartFlow'); if (!el) return;
  if (!state.cart.length) {
    el.innerHTML = `<div class="empty-state"><div class="icon">🛍</div><h3>Tu carrito está vacío</h3><p>Explora restaurantes y tiendas y añade lo que te apetezca.</p>
      <button type="button" class="primary-action" onclick="mostrarSeccion('explorar')">Explorar</button></div>`;
    return;
  }
  const t = cartTotals(), a = address();
  el.innerHTML = `
    <div class="deliv-card">
      <div class="seg">
        <button type="button" class="${state.delivery === 'domicilio' ? 'on' : ''}" onclick="state.delivery='domicilio';saveState();renderCart()">🛵 Domicilio</button>
        <button type="button" class="${state.delivery === 'recogida' ? 'on' : ''}" onclick="state.delivery='recogida';saveState();renderCart()">🏪 Recogida</button>
      </div>
      ${state.delivery === 'domicilio' ? `<div class="deliv-row"><span class="dr-ico">📍</span><div><b>${esc(a.label)}</b><small>${esc(a.line)}</small></div><button type="button" onclick="abrirDirecciones()">Cambiar</button></div>` : ''}
    </div>
    <div id="cartItems"></div>
    <div class="section-head"><h3>Cupón</h3></div>
    <div class="coupon-row">
      <input id="couponInput" placeholder="Código (prueba NEXA10)" value="${state.coupon || ''}">
      <button type="button" onclick="aplicarCupon()">Aplicar</button>
    </div>
    ${t.hasItems && state.delivery === 'domicilio' ? `
    <div class="section-head"><h3>Propina al repartidor</h3></div>
    <div class="tip-row">
      ${[0, 1, 2, 3].map(v => `<button type="button" class="tip-btn ${state.tip === v ? 'on' : ''}" onclick="state.tip=${v};saveState();renderCart()">${v === 0 ? 'Nada' : eur(v)}</button>`).join('')}
    </div>` : ''}
    <div class="summary-card">
      <div class="summary-row"><span>Subtotal</span><strong>${eur(t.sub)}</strong></div>
      ${t.fee ? `<div class="summary-row"><span>Envío</span><strong>${eur(t.fee)}</strong></div>` : t.hasItems && state.delivery === 'domicilio' ? `<div class="summary-row"><span>Envío</span><strong style="color:var(--success)">Gratis</strong></div>` : ''}
      ${t.tip ? `<div class="summary-row"><span>Propina</span><strong>${eur(t.tip)}</strong></div>` : ''}
      ${t.disc ? `<div class="summary-row"><span>Descuento</span><strong style="color:var(--success)">−${eur(t.disc)}</strong></div>` : ''}
      <div class="summary-row total"><span>Total</span><strong>${eur(t.total)}</strong></div>
    </div>
    ${t.sub < CONFIG.FREE_DELIVERY_FROM && t.hasItems && state.delivery === 'domicilio' ? `<p class="disclaimer">Añade ${eur(CONFIG.FREE_DELIVERY_FROM - t.sub)} más para envío gratis.</p>` : ''}
    <button type="button" class="pay-cta" onclick="pagarCarrito()">${FACE_SVG}<span>Pagar ${eur(t.total)}</span></button>
    <p class="disclaimer">Prototipo: no se cobra dinero de verdad.</p>`;
  const itemsEl = $('#cartItems');
  if (itemsEl) itemsEl.innerHTML = state.cart.map((item, i) => `
    <div class="cart-item"><div class="emoji-tile" style="background:${item.color}">${esc(item.icon)}</div>
      <div class="info"><h4>${esc(item.name)}</h4><p>${esc(item.detail)} · ${eur(item.price * (item.qty || 1))}</p></div>
      ${item.type === 'item' ? `<div class="qty"><button type="button" data-dec="${i}" aria-label="Quitar uno">−</button><span>${item.qty}</span><button type="button" data-inc="${i}" aria-label="Añadir uno">+</button></div>`
        : `<button type="button" class="inline-action" data-rm="${i}">Quitar</button>`}
    </div>`).join('');
  el.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => { state.cart[+b.dataset.inc].qty++; saveState(); renderCart(); }));
  el.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.dec; state.cart[i].qty--; if (state.cart[i].qty <= 0) state.cart.splice(i, 1);
    saveState(); updateCartDot(); renderCart();
  }));
  el.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { state.cart.splice(+b.dataset.rm, 1); saveState(); updateCartDot(); renderCart(); }));
}
function aplicarCupon() {
  const code = ($('#couponInput')?.value || '').trim().toUpperCase();
  if (code === 'NEXA10') {
    state.coupon = 'NEXA10';
    saveState();
    mostrarNotificacion('🎉 Cupón aplicado: 10% de descuento');
  } else if (code) {
    mostrarNotificacion('Cupón no válido');
  }
  renderCart();
}
function pagarCarrito() {
  const t = cartTotals(), a = address();
  abrirPago({ total: t.total, concept: t.hasItems ? 'Pedido NEXA' : 'Seña de reserva', address: t.hasItems && state.delivery === 'domicilio' ? `${a.label} · ${a.line}` : null, onSuccess: completarPedido });
}
function completarPedido() {
  const t = cartTotals(), a = address();
  const items = state.cart.filter(i => i.type === 'item'), bks = state.cart.filter(i => i.type === 'booking');
  const code = bks.length ? registrarReservas(bks) : 'NX-' + (1000 + Math.floor(Math.random() * 9000));
  let order = null;
  if (items.length && state.delivery === 'domicilio') {
    order = {
      code, startedAt: Date.now(), delivered: false, total: t.total, fee: t.fee, tip: t.tip, address: `${a.label} · ${a.line}`,
      from: [...new Set(items.map(f => f.business))].join(' · '),
      kind: items.every(f => bizById(f.bizId)?.kind === 'shop') ? 'shop' : 'food',
      items: items.map(f => ({ name: f.name, qty: f.qty, price: f.price, icon: f.icon, business: f.business, bizId: f.bizId })),
    };
    state.orders.unshift(order);
  if (window.NexaBackend) NexaBackend.syncOrder(state.orders[0], state.user).then(r => { if (r.ok) console.info("[NEXA] order synced", r.mode); }).catch(()=>{});;
  }
  state.cart = []; state.tip = 0; state.coupon = null;
  saveState(); updateCartDot();
  if (order) {
    if (state.pushOn) setTimeout(() => pushNotify('Pedido en preparación', '📦 Están preparando tu pedido con cuidado.', { tag: 'order-prep' }), 3000);
    return abrirSeguimiento();
  }
  const el = $('#cartFlow');
  if (bks.length) return bookingSuccess(code, state.bookings.slice(-1), '#cartFlow');
  if (el) el.innerHTML = `<div class="success-view"><div class="success-circle">✓</div><h2>¡Pago confirmado!</h2><p>Tu pedido estará listo para recoger en 15-20 min.</p><span class="track-code">${code}</span>
    <button type="button" class="primary-action" onclick="mostrarSeccion('inicio')">Volver al inicio</button></div>`;
}

/* ================= RESERVAS ================= */
let booking = { biz: null, service: null, day: 0, slot: null }, bookFilter = '';
const BOOK_FILTERS = [['', 'Todo'], ['belleza', 'Belleza'], ['spa', 'Spa'], ['comida', 'Mesas'], ['otros', 'Tiendas y más']];

function startBooking(id, si = null) { booking = { biz: id, service: si, day: 0, slot: null }; mostrarSeccion('reservas'); }
function bookingBack() {
  if (booking.slot) booking.slot = null;
  else if (booking.service !== null) booking.service = null;
  else if (booking.biz) booking.biz = null;
  else return setMain('homeScreen');
  renderBookingFlow();
}
function bookingDays() {
  const n = new Date();
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(n); d.setDate(n.getDate() + i); return d; });
}
function renderBookingFlow() {
  const el = $('#bookingFlow'); if (!el) return;
  if (!booking.biz) {
    const list = BUSINESSES.filter(b => b.services?.length);
    el.innerHTML = `
      <div class="rchips">${BOOK_FILTERS.map(([id, l]) => `<button type="button" class="rchip ${id === bookFilter ? 'on' : ''}" data-t="${id}">${l}</button>`).join('')}</div>
      ${list.filter(b => {
        if (!bookFilter) return true;
        if (bookFilter === 'comida') return b.type === 'comida';
        if (bookFilter === 'otros') return !['belleza', 'spa', 'comida'].includes(b.type);
        return b.type === bookFilter;
      }).map(b => `
        <div class="list-item" role="button" tabindex="0" onclick="startBooking('${b.id}')">
          <div class="emoji-tile thumb">${brandCover(b, 'sm')}</div>
          <div class="info"><h4>${esc(b.name)}</h4><p>${esc(b.category)} · ⭐ ${b.rating}</p></div>
          <div class="chevron">›</div>
        </div>`).join('')}`;
    el.querySelectorAll('.rchip').forEach(b => b.addEventListener('click', () => { bookFilter = b.dataset.t; renderBookingFlow(); }));
    return;
  }
  const b = bizById(booking.biz);
  if (booking.service === null) {
    el.innerHTML = `
      <div class="step-track"><div class="done"></div><div></div><div></div></div>
      <h3>${esc(b.name)}</h3>
      ${b.services.map((s, i) => `
        <button type="button" class="svc-card" onclick="booking.service=${i};renderBookingFlow()">
          <span class="info"><b>${esc(s.n)}</b><small>${s.dur}${s.p ? ' · ' + eur(s.p) : ''}${depositOf(s) ? ' · seña ' + eur(depositOf(s)) : ''}</small></span>
          <span class="svc-go">Elegir ›</span></button>`).join('')}`;
    return;
  }
  const svc = b.services[booking.service];
  const days = bookingDays();
  if (!booking.slot) {
    const slots = SLOTS[b.slots || 'day'];
    el.innerHTML = `
      <div class="step-track"><div class="done"></div><div class="done"></div><div></div></div>
      <h3>${esc(svc.n)}</h3>
      <div class="day-row">${days.map((d, i) => `
        <button type="button" class="day-pill ${booking.day === i ? 'selected' : ''}" onclick="booking.day=${i};renderBookingFlow()">
          <span class="dow">${DOW[d.getDay()]}</span><span class="num">${d.getDate()}</span>
        </button>`).join('')}</div>
      <div class="slot-grid">${slots.map(s => {
        const taken = Math.random() < 0.15;
        return `<button type="button" class="slot ${booking.slot === s ? 'selected' : ''}" ${taken ? 'disabled' : ''} onclick="booking.slot='${s}';renderBookingFlow()">${s}</button>`;
      }).join('')}</div>`;
    return;
  }
  const day = days[booking.day];
  const dep = depositOf(svc);
  el.innerHTML = `
    <div class="step-track"><div class="done"></div><div class="done"></div><div class="done"></div></div>
    <div class="summary-card">
      <div class="summary-row"><span>Negocio</span><strong>${esc(b.name)}</strong></div>
      <div class="summary-row"><span>Servicio</span><strong>${esc(svc.n)}</strong></div>
      <div class="summary-row"><span>Fecha</span><strong>${DOW[day.getDay()]} ${day.getDate()}/${day.getMonth() + 1}</strong></div>
      <div class="summary-row"><span>Hora</span><strong>${booking.slot}</strong></div>
      ${dep ? `<div class="summary-row total"><span>Seña</span><strong>${eur(dep)}</strong></div>` : `<div class="summary-row total"><span>Total</span><strong>Sin seña</strong></div>`}
    </div>
    <button type="button" class="primary-action" onclick="confirmarReserva()">${dep ? 'Pagar seña ' + eur(dep) : 'Confirmar reserva'}</button>`;
}
function confirmarReserva() {
  const b = bizById(booking.biz);
  const svc = b.services[booking.service];
  const day = bookingDays()[booking.day];
  const dep = depositOf(svc);
  if (dep > 0) {
    state.cart.push({ type: 'booking', bizId: b.id, business: b.name, name: svc.n, detail: `${isoDate(day)} ${booking.slot}`, price: dep, qty: 1, icon: b.icon, color: 'var(--accent-soft)', date: isoDate(day), slot: booking.slot, service: svc.n, dateLabel: `${DOW[day.getDay()]} ${day.getDate()}/${day.getMonth() + 1}`, duration: svc.dur });
    saveState(); updateCartDot();
    abrirPago({ total: dep, concept: 'Seña de reserva', address: null, onSuccess: () => {
      const code = registrarReservas(state.cart.filter(i => i.type === 'booking'));
      state.cart = state.cart.filter(i => i.type !== 'booking');
      saveState(); updateCartDot();
      bookingSuccess(code, state.bookings.slice(-1), '#bookingFlow');
    }});
  } else {
    const code = registrarReservas([{ bizId: b.id, business: b.name, name: svc.n, date: isoDate(day), slot: booking.slot, service: svc.n, dateLabel: `${DOW[day.getDay()]} ${day.getDate()}/${day.getMonth() + 1}`, icon: b.icon, price: 0, duration: svc.dur }]);
    bookingSuccess(code, state.bookings.slice(-1), '#bookingFlow');
  }
}
function registrarReservas(items) {
  const code = 'RSV-' + (1000 + Math.floor(Math.random() * 9000));
  items.forEach(it => {
    state.bookings.push({
      id: uid(), code, biz: it.bizId, business: it.business, service: it.service || it.name,
      date: it.date, slot: it.slot, dateLabel: it.dateLabel, icon: it.icon, deposit: it.price || 0, duration: it.duration || '',
    });
  });
  saveState();
  return code;
}
function bookingSuccess(code, booked, sel) {
  const el = $(sel);
  if (!el) return;
  const b = booked[0];
  el.innerHTML = `<div class="success-view"><div class="success-circle">✓</div><h2>¡Reserva confirmada!</h2>
    <p>${esc(b?.business || '')} · ${esc(b?.service || '')}<br>${esc(b?.dateLabel || '')}, ${esc(b?.slot || '')} h</p>
    <span class="track-code">${code}</span>
    <div class="succ-actions">
      <button type="button" class="primary-action" onclick="mostrarSeccion('inicio')">Volver al inicio</button>
      <button type="button" class="outline-action" onclick="abrirRuta('${esc(b?.biz || '')}')">🧭 Cómo llegar</button>
      <button type="button" class="outline-action" onclick="compartirReserva('${esc(b?.id || '')}')">↗ Compartir reserva</button>
    </div></div>`;
  if (state.pushOn) setTimeout(() => pushNotify('Reserva confirmada', '📅 Recordatorio: tienes una reserva próximamente.', { tag: 'booking' }), 2000);
}
function cancelarReserva(id) {
  state.bookings = state.bookings.filter(b => b.id !== id);
  saveState();
  renderProfile();
  mostrarNotificacion('Reserva cancelada');
}
function descargarICS(id) {
  mostrarNotificacion('📅 Evento añadido al calendario (demo)');
}

/* ================= PAGO ================= */
const BASE_CARDS = [
  { brand: 'Visa', last: '4242', grad: 'linear-gradient(135deg,#1e3a8a,#3b82f6)' },
  { brand: 'Mastercard', last: '8810', grad: 'linear-gradient(135deg,#7f1d1d,#f97316)' },
  { brand: 'Visa Gold', last: '7731', grad: 'linear-gradient(135deg,#8a6d2f,#e6cf94 55%,#b9974a)', gold: true },
];
const CARD_GRADS = ['linear-gradient(135deg,#0f172a,#2563eb)', 'linear-gradient(135deg,#111827,#dc2626)', 'linear-gradient(135deg,#064e3b,#34d399)', 'linear-gradient(135deg,#312e81,#a78bfa)'];
const methods = () => [...BASE_CARDS, ...state.cards, { brand: 'Billetera NEXA', last: '', grad: 'linear-gradient(135deg,#4c1d95,#8b5cf6)', wallet: true }];
const payIdx = () => Math.min(Math.max(state.payIdx | 0, 0), methods().length - 1);
function methodLabel(m) { return m.wallet ? `Billetera NEXA · ${eur(state.wallet)}` : `${m.brand} •••• ${m.last}`; }
function cardFace(m, i) {
  const mark = m.wallet ? `<span class="pc-wallet"><svg viewBox="0 0 100 110" aria-hidden="true"><use href="#nexaMark"/></svg>NEXA</span>`
    : /^Mastercard/.test(m.brand) ? `<span class="pc-mc"><i></i><i></i></span>` : `<span class="pc-visa">VISA</span>`;
  const num = m.wallet ? eur(state.wallet) : `•••• ${m.last}`;
  return `<div class="pcard${m.gold ? ' gold' : ''}${m.wallet ? ' wallet' : ''}" data-i="${i}" style="background:${m.grad}" aria-label="${esc(methodLabel(m))}">
    <div class="pc-top"><span class="pc-chip"></span>${NFC_SVG}</div>
    <div class="pc-num">${num}</div>
    <div class="pc-bot"><span class="pc-name">${esc(userName().toUpperCase())}${m.gold ? ' · GOLD' : ''}</span>${mark}</div></div>`;
}
function mountCarousel(car, o) {
  const cards = $$('.pcard', car); if (!cards.length) return;
  let raf = 0, auto = false, timer = 0, tries = 0;
  const centerOf = i => cards[i].offsetLeft - (car.clientWidth - cards[i].offsetWidth) / 2;
  const mark = () => { const cur = o.get(); cards.forEach((c, i) => c.classList.toggle('sel', i === cur)); o.onMark?.(cur); };
  const nearest = () => {
    const mid = car.scrollLeft + car.clientWidth / 2; let best = 0, dist = Infinity;
    cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = i; } });
    return best;
  };
  const layout = () => {
    if (!car.isConnected) return;
    if (car.clientWidth === 0 && tries++ < 30) { requestAnimationFrame(layout); return; }
    const pad = Math.max(20, (car.clientWidth - (cards[0].offsetWidth || 190)) / 2);
    car.style.paddingLeft = car.style.paddingRight = pad + 'px';
    auto = true; car.scrollLeft = centerOf(o.get());
    requestAnimationFrame(() => { auto = false; });
  };
  mark(); requestAnimationFrame(layout);
  car.addEventListener('scroll', () => {
    if (auto) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const best = nearest();
      if (best !== o.get() && !o.locked?.()) { o.set(best); mark(); if (navigator.vibrate) navigator.vibrate(8); }
    });
  }, { passive: true });
  cards.forEach((c, i) => {
    c.tabIndex = 0; c.setAttribute('role', 'button');
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); } });
    c.addEventListener('click', () => {
      if (o.locked?.() || i === o.get()) return;
      o.set(i); mark(); if (navigator.vibrate) navigator.vibrate(8);
      auto = true; clearTimeout(timer); timer = setTimeout(() => { auto = false; }, 600);
      car.scrollTo({ left: centerOf(i), behavior: reduceMotion() ? 'auto' : 'smooth' });
    });
  });
}
let payCtx = null, payBusy = false;
function abrirPago(ctx) { payCtx = ctx; payBusy = false; renderPaySheet('review'); $('#paySheetWrap')?.classList.add('open'); }
function cerrarPago(force) {
  if (payBusy && !force) return;
  payBusy = false; $('#paySheetWrap')?.classList.remove('open'); payCtx = null;
}
function payFooter(stage) {
  if (stage === 'scan') return `<div class="ps-scan"><div class="face-wrap scanning">${FACE_SVG}</div><span>Escaneando…</span></div>`;
  if (stage === 'done') return `<div class="ps-done">${CHECK_SVG}<span>Listo</span></div>`;
  return `<button type="button" class="ps-face" onclick="confirmarConFaceID()"><div class="face-wrap">${FACE_SVG}</div><span>Confirmar con Face ID</span></button>`;
}
function renderPaySheet(stage) {
  const sheet = $('#paySheet'); if (!sheet || !payCtx) return;
  const ms = methods();
  sheet.innerHTML = `
    <div class="ps-grab"></div>
    <div class="ps-head"><div class="ps-brand"><svg class="nexa-mark ps-mark" viewBox="0 0 100 110" aria-hidden="true"><use href="#nexaMark"/></svg><span>Pay</span></div>
      <button type="button" class="ps-close" onclick="cerrarPago()" aria-label="Cerrar">✕</button></div>
    <div class="ps-amount"><small>${esc(payCtx.concept.toUpperCase())}</small><b>${eur(payCtx.total)}</b></div>
    <div class="ps-carousel" id="psCar">${ms.map(cardFace).join('')}</div>
    <div class="ps-dots" id="psDots">${ms.map(() => '<i></i>').join('')}</div>
    <div class="ps-cardname" id="psCardName" aria-live="polite"></div>
    <div class="ps-group">
      <div class="ps-row"><div class="ps-col"><small>CONTACTO</small><b>${esc(state.user?.email || 'Sin correo')}</b></div></div>
      <div class="ps-row"><div class="ps-col"><small>${payCtx.address ? 'ENVIAR A' : 'CONCEPTO'}</small><b>${esc(payCtx.address || payCtx.concept)}</b></div></div>
    </div>
    <div class="ps-footer" id="psFooter">${payFooter(stage)}</div>`;
  const car = $('#psCar');
  mountCarousel(car, {
    get: payIdx, set: i => { state.payIdx = i; saveState(); }, locked: () => payBusy,
    onMark: cur => {
      $$('#psDots i').forEach((d, i) => d.classList.toggle('on', i === cur));
      const nm = $('#psCardName'); if (nm) nm.textContent = methodLabel(ms[cur]);
    },
  });
  if (payBusy) car?.classList.add('locked');
}
function confirmarConFaceID() {
  if (payBusy || !payCtx) return;
  const m = methods()[payIdx()];
  if (m.wallet && state.wallet < payCtx.total) return mostrarNotificacion('Saldo insuficiente. Recarga tu Billetera desde el perfil');
  payBusy = true;
  $('#psCar')?.classList.add('locked');
  const footer = () => $('#psFooter');
  if (footer()) footer().innerHTML = payFooter('scan');
  setTimeout(() => { if (footer()) footer().innerHTML = payFooter('done'); if (navigator.vibrate) navigator.vibrate(30); }, 1500);
  setTimeout(() => {
    const ctx = payCtx;
    if (m.wallet) { state.wallet = Math.round((state.wallet - ctx.total) * 100) / 100; saveState(); }
    cerrarPago(true);
    ctx?.onSuccess?.();
  }, 2900);
}

/* ================= SEGUIMIENTO ================= */
const ORDER_SECONDS = 70, ORDER_MINUTES = 28;
const STAGE_TEXT = [
  { pill: 'Confirmado', msg: 'El comercio ha recibido tu pedido.' },
  { pill: 'Preparando', msg: 'Están preparando tu pedido con mucho cuidado 👨‍🍳' },
  { pill: 'En camino', msg: 'Marco va de camino con tu pedido 🛵' },
  { pill: 'Entregado', msg: '¡Que lo disfrutes! Tu pedido ha llegado 🎉' },
];
const TL = [{ l: 'Pedido confirmado', off: 0 }, { l: 'Preparando tu pedido', off: 8 }, { l: 'En camino', off: 24 }, { l: 'Entregado', off: ORDER_SECONDS }];
let trackTimer = null, routeLen = 0;
const latestOrder = () => state.orders[0] || null;
const activeOrder = () => { const o = latestOrder(); return o && !o.delivered ? o : null; };
function orderState(o) {
  const t = (Date.now() - o.startedAt) / 1000;
  let stage = 0, p = 0;
  if (t >= ORDER_SECONDS) { stage = 3; p = 1; }
  else if (t >= 24) { stage = 2; p = Math.min(1, (t - 24) / (ORDER_SECONDS - 24 - 4)); }
  else if (t >= 8) stage = 1;
  return { stage, p, eta: Math.max(0, Math.ceil((ORDER_SECONDS - t) / ORDER_SECONDS * ORDER_MINUTES)), t };
}
function mapBlocks() {
  const xs = [12, 90, 168, 246], ys = [12, 70, 128, 186]; let s = '';
  ys.forEach((y, r) => xs.forEach((x, c) => {
    let cls = 'm-block';
    if (r === 3) cls = 'm-water'; else if ((r === 1 && c === 2) || (r === 0 && c === 0) || (r === 2 && c === 3)) cls = 'm-park';
    s += `<rect x="${x}" y="${y}" width="66" height="${r === 3 ? 44 : 46}" rx="7" class="${cls}"/>`;
  }));
  return s;
}
function abrirSeguimiento() {
  const o = latestOrder(); if (!o) return mostrarNotificacion('Aún no tienes pedidos');
  setMain('pedidoScreen'); renderTracking(o);
  clearInterval(trackTimer); tickTracking(); trackTimer = setInterval(tickTracking, 400);
}
function renderTracking(o) {
  const body = $('#trackBody'); if (!body) return;
  const shop = o.kind === 'shop';
  const route = 'M84 180 C84 130 170 150 165 100 S240 100 240 64';
  body.innerHTML = `
    <div class="track-map">
      <svg id="mapSvg" viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice" aria-label="Mapa del recorrido">
        <rect width="340" height="230" class="m-bg"/>${mapBlocks()}
        <path id="routeBase" d="${route}" class="m-route-base"/><path id="routeProg" d="${route}" class="m-route-prog"/>
        <g transform="translate(84 180)"><circle r="14" class="m-pin-a"/><text y="5" text-anchor="middle" font-size="13">${shop ? '🛍️' : '🍽️'}</text></g>
        <g transform="translate(240 64)"><circle r="14" class="m-pin-b"/><text y="5" text-anchor="middle" font-size="13">🏠</text></g>
        <g id="courier" transform="translate(84 180)">
          <circle r="14" class="m-pulse"><animate attributeName="r" values="14;30" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;0" dur="1.6s" repeatCount="indefinite"/></circle>
          <circle r="14" class="m-courier"/><text y="5" text-anchor="middle" font-size="14">🛵</text></g>
      </svg>
      <div class="map-from">${shop ? '🛍️' : '🍽️'} ${esc(o.from)}</div>
    </div>
    <div class="track-sheet">
      <div class="ts-top">
        <div><small id="tsSub">Llegada en</small><div class="ts-eta"><span id="tsEta">--</span><em>min</em></div></div>
        <span class="ts-pill" id="tsPill">Confirmado</span>
      </div>
      <div class="ts-bar"><i id="tsFill"></i></div>
      <div class="courier-card">
        <div class="cc-avatar">🧑</div>
        <div class="cc-info"><b>Marco R.</b><small>⭐ 4,9 · Tu repartidor</small></div>
        <button type="button" onclick="mostrarNotificacion('📞 Llamando a Marco…')" aria-label="Llamar">📞</button>
        <button type="button" onclick="mostrarNotificacion('💬 Chat con Marco (demo)')" aria-label="Chat">💬</button>
      </div>
      <ul class="tl" id="tlList">${TL.map((s, i) => `<li class="tl-row"><span class="tl-dot"></span><span class="tl-l">${i === 1 && shop ? 'Empaquetando tu pedido' : s.l}</span><span class="tl-t">${hhmm(new Date(o.startedAt + s.off / ORDER_SECONDS * ORDER_MINUTES * 60000))}</span></li>`).join('')}</ul>
      <p class="ts-msg" id="tsMsg"></p>
      <div class="ts-order">
        <h4>Tu pedido · ${esc(o.code)}</h4>
        ${o.items.map(i => `<div class="ts-item"><span>${i.qty}× ${esc(i.name)}</span><b>${eur(i.price * i.qty)}</b></div>`).join('')}
        ${o.fee ? `<div class="ts-item"><span>Envío</span><b>${eur(o.fee)}</b></div>` : ''}
        ${o.tip ? `<div class="ts-item"><span>Propina</span><b>${eur(o.tip)}</b></div>` : ''}
        <div class="ts-item total"><span>Total pagado</span><b>${eur(o.total)}</b></div>
        <small class="ts-addr">📍 ${esc(o.address)}</small>
      </div>
      <div class="qr-card">
        <div class="qr-left">
          <canvas id="orderQr" width="168" height="168" aria-label="Código QR del pedido"></canvas>
        </div>
        <div class="qr-right">
          <b>QR del pedido</b>
          <p>Validable en backend · Muestra este código al repartidor.</p>
          <code class="qr-code">${esc(o.code)}</code>
          <button type="button" class="outline-action" onclick="shareOrderQR('${esc(o.code)}')">↗ Compartir QR</button>
          <button type="button" class="outline-action" onclick="validarPedidoQR('${esc(o.code)}')">✓ Validar en backend</button>
        </div>
      </div>
      <div class="share-row">
        <button type="button" class="outline-action" onclick="compartirPedido()">↗ Compartir pedido</button>
        <button type="button" class="outline-action" onclick="setMain('homeScreen')">Volver al inicio</button>
      </div>
    </div>`;
  renderOrderQR(o.code);
  const prog = $('#routeProg');
  if (prog) {
    routeLen = prog.getTotalLength();
    prog.style.strokeDasharray = routeLen;
    prog.style.strokeDashoffset = routeLen;
  }
}
function tickTracking() {
  if (currentView !== 'pedidoScreen') { clearInterval(trackTimer); return; }
  const o = latestOrder(); if (!o) return;
  const s = orderState(o), set = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
  set('tsEta', s.stage === 3 ? '0' : String(s.eta));
  set('tsSub', s.stage === 3 ? 'Entregado' : 'Llegada en');
  set('tsPill', STAGE_TEXT[s.stage].pill); set('tsMsg', STAGE_TEXT[s.stage].msg);
  $$('#tlList .tl-row').forEach((el, i) => { el.classList.toggle('done', i < s.stage || s.stage === 3); el.classList.toggle('active', i === s.stage && s.stage < 3); });
  const fill = $('#tsFill'); if (fill) fill.style.width = (((s.stage + (s.stage === 2 ? s.p : 0)) / 3) * 100) + '%';
  const prog = $('#routeProg'), courier = $('#courier');
  if (prog && courier && routeLen) {
    const pt = prog.getPointAtLength(s.p * routeLen);
    courier.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    prog.style.strokeDashoffset = routeLen * (1 - s.p);
  }
  // Notificar cambios de etapa (una sola vez por etapa)
  if (o._lastStage === undefined) o._lastStage = -1;
  if (s.stage !== o._lastStage) {
    o._lastStage = s.stage;
    if (s.stage === 1) pushNotify('Preparando pedido', '👨‍🍳 Están preparando tu pedido ' + o.code, { tag: 'order-' + o.code + '-1' });
    if (s.stage === 2) pushNotify('En camino', '🛵 Marco va de camino con tu pedido. ETA ~' + s.eta + ' min', { tag: 'order-' + o.code + '-2' });
    saveState();
  }
  if (s.stage === 3 && !o.delivered) {
    o.delivered = true; saveState();
    pushNotify('¡Pedido entregado!', '🎉 ¡Que lo disfrutes! Tu pedido ha llegado.', { tag: 'order-done' }); renderOrderBanner();
    if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
  }
}
function renderOrderBanner() {
  const el = $('#orderBanner'); if (!el) return;
  const o = activeOrder(); if (!o) { el.innerHTML = ''; return; }
  const s = orderState(o);
  if (s.stage === 3) { o.delivered = true; saveState(); el.innerHTML = ''; return; }
  const pct = Math.round(((s.stage + (s.stage === 2 ? s.p : 0)) / 3) * 100);
  el.innerHTML = `<div class="order-banner" role="button" tabindex="0" onclick="abrirSeguimiento()" onkeydown="if(event.key==='Enter')this.click()">
    <div class="ob-ico">🛵</div>
    <div class="ob-info"><b>${STAGE_TEXT[s.stage].pill} · ${s.eta} min</b><small>Pedido ${esc(o.code)} · ${esc(o.from)}</small><div class="ob-bar"><i style="width:${pct}%"></i></div></div>
    <span class="ob-go">›</span></div>`;
}

/* ================= PERFIL ================= */
function levelInfo() {
  const pts = 120 + state.orders.length * 40 + state.bookings.length * 25;
  const L = [{ k: 'bronce', n: 'Bronce', min: 0, ico: '🥉' }, { k: 'plata', n: 'Plata', min: 200, ico: '🥈' }, { k: 'oro', n: 'Oro', min: 400, ico: '🥇' }];
  let idx = 0; L.forEach((l, i) => { if (pts >= l.min) idx = i; });
  const cur = L[idx], next = L[idx + 1] || null;
  return { pts, cur, next, pct: next ? Math.round((pts - cur.min) / (next.min - cur.min) * 100) : 100 };
}
function upcomingBookings() {
  const now = isoDate(new Date());
  return state.bookings.filter(b => b.date >= now).sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));
}
function pfRow(ico, bg, label, sub, onclick, extra = '') {
  return `<div class="pf-row" role="button" tabindex="0" onclick="${onclick}" onkeydown="if(event.key==='Enter'){this.click()}">
    <span class="pf-ico" style="background:${bg}">${ico}</span><div class="pf-txt"><b>${label}</b>${sub ? `<small>${sub}</small>` : ''}</div>${extra || '<span class="pf-chev">›</span>'}</div>`;
}
const PROVIDER_LABEL = { google: 'Google', apple: 'Apple', email: 'Correo', guest: 'Invitado' };
function renderProfile() {
  const el = $('#profileScreen'); if (!el) return;
  const u = state.user || { provider: 'guest', email: '' }, L = levelInfo(), ups = upcomingBookings(), ms = methods();
  el.innerHTML = `
    <header class="flow-header"><button type="button" onclick="setMain('homeScreen')" aria-label="Volver">‹</button><h2>Mi perfil</h2><button type="button" onclick="editarPerfil()" aria-label="Editar">✎</button></header>
    <div class="flow-body pf">
      <div class="pf-hero">
        <div class="pf-ring"><div class="pf-avatar">${avatarHTML()}</div></div>
        <h2>${esc(userName())}</h2><p>${esc(u.email || 'Sin correo')}</p>
        <div class="pf-tags"><span class="pf-badge">${L.cur.ico} Nivel ${L.cur.n}</span><span class="pf-badge">${PROVIDER_LABEL[u.provider] || 'Cuenta'}</span></div>
      </div>
      <div class="pf-stats">
        <div class="pf-stat"><b>${state.orders.length}</b><span>Pedidos</span></div>
        <div class="pf-stat"><b>${state.bookings.length}</b><span>Reservas</span></div>
        <div class="pf-stat"><b>${state.favorites.length}</b><span>Favoritos</span></div>
      </div>
      <div class="wallet-card">
        <div><small>BILLETERA NEXA</small><b>${eur(state.wallet)}</b></div>
        <div class="wc-btns"><button type="button" onclick="abrirRecarga()">＋ Recargar</button><button type="button" onclick="mostrarSeccion('tarjetas')">Tarjetas</button></div>
      </div>
      <div class="pf-member lvl-${L.cur.k}">
        <div class="pm-top"><div><small>MEMBRESÍA</small><b>NEXA ${L.cur.n}</b></div><span class="pm-pts">${L.pts} pts</span></div>
        <div class="pm-bar"><i style="width:${L.pct}%"></i></div>
        <small>${L.next ? `Te faltan ${L.next.min - L.pts} pts para ${L.next.n}` : '¡Has llegado al nivel máximo!'}</small>
      </div>
      ${ups[0] ? `<div class="next-bk"><span class="nb-ico">${esc(ups[0].icon)}</span><div><small>PRÓXIMA RESERVA</small><b>${esc(ups[0].business)}</b><span>${esc(ups[0].dateLabel)}, ${esc(ups[0].slot)} h</span></div><button type="button" onclick="abrirRuta('${esc(ups[0].biz)}')">🧭</button></div>` : ''}
      <div class="pf-title">Mis tarjetas <button type="button" class="link-btn" onclick="mostrarSeccion('tarjetas')">Gestionar</button></div>
      <div class="pf-cards" onclick="mostrarSeccion('tarjetas')">${ms.map(cardFace).join('')}</div>
      <div class="pf-title">Mis reservas</div>
      ${ups.length ? ups.map(b => `<div class="bk-item"><div class="emoji-tile" style="background:var(--accent-soft)">${esc(b.icon)}</div><div class="info"><h4>${esc(b.business)}</h4><p>${esc(b.service)} · ${esc(b.dateLabel)}, ${esc(b.slot)} h · ${esc(b.code)}</p>
        <div class="bk-actions"><button type="button" onclick="abrirRuta('${esc(b.biz)}')">🧭 Cómo llegar</button><button type="button" onclick="compartirReserva('${esc(b.id)}')">↗ Compartir</button><button type="button" onclick="descargarICS('${esc(b.id)}')">📅 Calendario</button><button type="button" class="danger" onclick="cancelarReserva('${esc(b.id)}')">Cancelar</button></div></div></div>`).join('')
        : `<p class="pf-empty">Todavía no tienes reservas próximas.</p>`}
      <div class="pf-title">Mis pedidos</div>
      ${state.orders.length ? state.orders.slice(0, 4).map(x => `<div class="list-item" role="button" tabindex="0" onclick="abrirSeguimiento()"><div class="emoji-tile" style="background:var(--accent-soft)">🛍️</div><div class="info"><h4>Pedido ${esc(x.code)}</h4><p>${esc(x.from)} · ${eur(x.total)} · ${x.delivered ? 'Entregado' : 'En curso'}</p></div><div class="chevron">›</div></div>`).join('')
        : `<p class="pf-empty">Aún no has hecho pedidos a domicilio.</p>`}
      <div class="pf-title">Ajustes</div>
      <div class="pf-menu">
        ${pfRow('📍', 'var(--amber-soft)', 'Direcciones', esc(address().line), 'abrirDirecciones()')}
        ${pfRow('♡', 'var(--accent-soft)', 'Favoritos', '', "mostrarSeccion('favoritos')")}
        ${pfRow('🔔', 'var(--amber-soft)', 'Notificaciones', 'Estado del pedido y ofertas', 'togglePush()', '<span class="sw" id="swPush" role="switch" aria-checked="false"></span>')}
        ${pfRow('🌙', 'var(--accent-soft)', 'Modo oscuro', '', 'alternarTema()', '<span class="sw" id="swDark" role="switch" aria-checked="false"></span>')}
        ${pfRow('📊', 'var(--amber-soft)', 'Panel de negocios', '', "mostrarSeccion('dashboard')")}
        ${pfRow('💬', 'var(--accent-soft)', 'Ayuda y soporte', '', 'abrirAyuda()')}
      </div>
      <div class="pf-title">Información legal</div>
      <div class="pf-menu legal-menu">
        ${pfRow('🔐', 'var(--accent-soft)', 'Privacidad y datos', '', "abrirLegal('privacidad')")}
        ${pfRow('✨', 'var(--amber-soft)', 'Uso de NEXA IA', '', "abrirLegal('ia')")}
        ${pfRow('🌐', 'var(--accent-soft)', 'Terceros y proveedores', '', "abrirLegal('terceros')")}
        ${pfRow('©', 'var(--amber-soft)', 'Imágenes y licencias', '', "abrirLegal('imagenes')")}
        ${pfRow('🍪', 'var(--accent-soft)', 'Cookies y almacenamiento', '', "abrirLegal('cookies')")}
      </div>
      <div class="pf-title">Permisos del sistema</div>
      <div class="perm-card" id="permStatus">
        <div class="perm-row"><span>🔔 Notificaciones</span><span class="perm-badge muted">…</span></div>
        <div class="perm-row"><span>📍 Ubicación</span><span class="perm-badge muted">…</span></div>
        <div class="perm-row"><span>📋 Portapapeles</span><span class="perm-badge muted">…</span></div>
      </div>
      <button type="button" class="pf-logout" onclick="cerrarSesion()">Cerrar sesión</button>
    </div>`;
  syncSwitches();
  refreshPermissionState();
}
const LEGAL_TEXT = {
  privacidad: ['Privacidad y datos', 'NEXA es una demo de interfaz. El perfil, carrito, favoritos y preferencias pueden guardarse en el almacenamiento local de este dispositivo. No introduzcas datos sensibles. Para producción, publica la identidad y contacto del responsable, finalidad y base jurídica, plazos de conservación, derechos RGPD y canal de reclamaciones; configura una API autenticada y cifrada. La ubicación solo se solicita tras entrar y aceptar el permiso del navegador; se usa para ordenar negocios cercanos y trazar rutas.'],
  ia: ['Uso de NEXA IA', 'La experiencia actual usa respuestas locales de demostración. Si se configura AI_API_URL, los mensajes se envían a ese backend para generar respuestas; no incluyas claves secretas en la aplicación del navegador. Informa al usuario de los proveedores de modelo, retención, revisión humana y límites. Las respuestas pueden ser inexactas; confirma horarios, precios, disponibilidad y consejos importantes directamente con el negocio.'],
  terceros: ['Terceros y proveedores', 'La búsqueda de negocios consulta OpenStreetMap mediante servicios públicos de Overpass y puede enviar coordenadas aproximadas para encontrar lugares cercanos. Los mapas usan Leaflet y mosaicos de OpenStreetMap con atribución. Google Maps se abre para rutas. Fuentes externas adicionales incluyen Google Fonts, Unsplash y unpkg. Antes de producción, documenta cada proveedor, finalidad, transferencias internacionales, condiciones y acuerdos; configura límites y políticas de uso.'],
  imagenes: ['Imágenes y licencias', 'Las fotografías remotas de Unsplash y logotipos de marcas son contenido de terceros y pueden estar sujetos a sus propias licencias, marcas y condiciones. La atribución cartográfica de OpenStreetMap se conserva en el mapa. Verifica derechos, licencias comerciales y permisos de cada recurso antes de publicar; sustituye recursos sin autorización por imágenes propias o licenciadas.'],
  cookies: ['Cookies y almacenamiento', 'La app usa localStorage para preferencias, carrito, favoritos y datos de demostración; el service worker puede guardar archivos de la interfaz para uso sin conexión. Los servicios externos pueden establecer sus propias cookies cuando se cargan. En producción, implementa un gestor de consentimiento antes de activar almacenamiento no esencial y ofrece retirada del consentimiento y borrado de datos.']
};
function abrirLegal(section = 'privacidad') {
  const [title, body] = LEGAL_TEXT[section] || LEGAL_TEXT.privacidad;
  const links = Object.entries(LEGAL_TEXT).map(([key, item]) => `<button type="button" class="link-btn" onclick="abrirLegal('${key}')">${esc(item[0])}</button>`).join(' · ');
  abrirSheet(title, `<p class="sh-note legal-copy">${esc(body)}</p><div class="legal-links">${links}</div><small class="legal-updated">Información de demo · ${new Date().toLocaleDateString('es-ES')}</small>`);
}
function togglePush() {
  state.pushOn = !state.pushOn; saveState(); syncSwitches();
  if (state.pushOn) initPushFromProfile();
  else mostrarNotificacion('Notificaciones desactivadas');
}
function syncSwitches() {
  const p = $('#swPush'), d = $('#swDark');
  if (p) { p.classList.toggle('on', state.pushOn); p.setAttribute('aria-checked', state.pushOn); }
  if (d) { d.classList.toggle('on', !!state.dark); d.setAttribute('aria-checked', !!state.dark); }
}
function applyTheme() { document.body.classList.toggle('dark-mode', !!state.dark); }
function alternarTema() {
  state.dark = !state.dark; saveState(); applyTheme();
  mostrarNotificacion(state.dark ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado');
  syncSwitches();
}

/* ================= SHEETS ================= */
function abrirSheet(title, html) {
  const body = $('#sheetBody'); if (!body) return;
  body.innerHTML = `<div class="ps-grab"></div><div class="sh-head"><h3>${esc(title)}</h3><button type="button" class="ps-close" onclick="cerrarSheet()" aria-label="Cerrar">✕</button></div>${html}`;
  $('#sheetWrap')?.classList.add('open');
}
function cerrarSheet() { $('#sheetWrap')?.classList.remove('open'); }
function editarPerfil() {
  if (!state.user) return;
  abrirSheet('Editar perfil', `<label class="sh-label" for="shName">Nombre</label><input id="shName" class="sh-input" value="${esc(state.user.name)}" maxlength="40">
    <p class="sh-note">${state.user.email ? 'Correo: ' + esc(state.user.email) : 'Estás como invitado.'}</p>
    <button type="button" class="sh-btn" onclick="guardarPerfil()">Guardar</button>`);
}
function guardarPerfil() {
  const n = ($('#shName')?.value || '').trim();
  if (n.length < 2) return mostrarNotificacion('Escribe un nombre válido');
  state.user.name = n; saveState(); cerrarSheet(); applyUser(); renderProfile();
}
function abrirRecarga() {
  abrirSheet('Recargar billetera', `<p class="sh-note">Prototipo: no se cobra dinero de verdad.</p>
    <div class="sh-grid">${[10, 25, 50, 100].map(n => `<button type="button" class="sh-btn ghost" onclick="recargar(${n})">+ ${eur(n)}</button>`).join('')}</div>`);
}
function recargar(n) { state.wallet = Math.round((state.wallet + n) * 100) / 100; saveState(); cerrarSheet(); mostrarNotificacion(`Saldo: ${eur(state.wallet)}`); if (currentView === 'profileScreen') renderProfile(); if (currentView === 'cardsScreen') renderCardsScreen(); }
function abrirAyuda() {
  abrirSheet('Ayuda y soporte', `<div class="faq"><b>¿Cómo cambio una reserva?</b><p>Cancélala desde Perfil › Mis reservas y crea otra.</p>
    <b>¿Cómo pago?</b><p>Con tarjeta o Billetera NEXA, confirmando con Face ID.</p>
    <b>¿Dónde queda el local?</b><p>En la ficha de cada negocio verás el mapa y «Cómo llegar».</p>
    <b>Cupón de prueba</b><p>Usa el código <b>NEXA10</b> en el carrito para un 10% de descuento.</p></div>
    <button type="button" class="sh-btn" onclick="cerrarSheet();mostrarNotificacion('Soporte: próximamente')">Hablar con soporte</button>`);
}
function abrirDirecciones() {
  abrirSheet('Mis direcciones', `<div class="addr-list">${state.addresses.map((a, i) => `
    <button type="button" class="addr ${i === state.addrIdx ? 'on' : ''}" onclick="elegirDireccion(${i})"><span class="dr-ico">📍</span><span><b>${esc(a.label)}</b><small>${esc(a.line)}</small></span><span class="addr-radio"></span></button>`).join('')}</div>
    <label class="sh-label" for="adLabel">Nueva dirección</label>
    <input id="adLabel" class="sh-input" placeholder="Nombre (Casa, Trabajo…)" maxlength="20">
    <input id="adLine" class="sh-input" placeholder="Calle, número y piso" maxlength="60">
    <button type="button" class="sh-btn" onclick="guardarDireccion()">Añadir y usar</button>`);
}
function elegirDireccion(i) { state.addrIdx = i; saveState(); renderHeaderAddr(); cerrarSheet(); if (currentView === 'carritoScreen') renderCart(); if (currentView === 'profileScreen') renderProfile(); }
function guardarDireccion() {
  const label = ($('#adLabel')?.value || '').trim() || 'Otra', line = ($('#adLine')?.value || '').trim();
  if (line.length < 5) return mostrarNotificacion('Escribe la dirección completa');
  state.addresses.push({ id: uid(), label, line }); state.addrIdx = state.addresses.length - 1;
  saveState(); renderHeaderAddr(); cerrarSheet(); if (currentView === 'carritoScreen') renderCart(); if (currentView === 'profileScreen') renderProfile();
}

/* ================= TARJETAS ================= */
function renderCardsScreen() {
  const body = $('#cardsBody'); if (!body) return;
  const ms = methods();
  body.innerHTML = `
    <div class="cs-top"><small>TARJETA PREDETERMINADA</small><h2 id="csTitle"></h2><p id="csSub"></p></div>
    <div class="cs-carousel ps-carousel" id="csCar">${ms.map(cardFace).join('')}</div>
    <div class="ps-dots" id="csDots">${ms.map(() => '<i></i>').join('')}</div>
    <button type="button" class="black-btn" id="csUse"></button>
    <button type="button" class="outline-action" onclick="abrirNuevaTarjeta()">＋ Añadir tarjeta</button>
    <button type="button" class="outline-action" onclick="abrirRecarga()">💳 Recargar billetera</button>
    <button type="button" class="link-btn cs-del hidden" id="csDel">Eliminar esta tarjeta</button>`;
  mountCarousel($('#csCar'), {
    get: payIdx, set: i => { state.payIdx = i; saveState(); },
    onMark: cur => {
      const m = ms[cur];
      $$('#csDots i').forEach((d, i) => d.classList.toggle('on', i === cur));
      const t = $('#csTitle'); if (t) t.textContent = m.brand;
      const s = $('#csSub'); if (s) s.textContent = m.wallet ? `Saldo ${eur(state.wallet)}` : `Terminada en ${m.last}`;
      const u = $('#csUse'); if (u) u.textContent = m.wallet ? 'Pagar con la billetera' : `Usar ${m.brand}`;
      $('#csDel')?.classList.toggle('hidden', !m.custom);
    },
  });
  $('#csUse')?.addEventListener('click', () => { mostrarNotificacion(`✅ ${methodLabel(ms[payIdx()])} por defecto`); setMain('profileScreen'); });
  $('#csDel')?.addEventListener('click', () => {
    const idx = payIdx() - BASE_CARDS.length;
    if (idx >= 0 && idx < state.cards.length) { state.cards.splice(idx, 1); state.payIdx = 0; saveState(); renderCardsScreen(); mostrarNotificacion('Tarjeta eliminada'); }
  });
}
function luhn(n) { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; }
function abrirNuevaTarjeta() {
  abrirSheet('Añadir tarjeta', `<label class="sh-label" for="ncBrand">Tipo</label>
    <select id="ncBrand" class="sh-input"><option>Visa</option><option>Mastercard</option></select>
    <label class="sh-label" for="ncNum">Número de tarjeta</label>
    <input id="ncNum" class="sh-input" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242" maxlength="23">
    <p class="sh-note">Solo guardamos el tipo y los 4 últimos dígitos.</p>
    <button type="button" class="sh-btn" onclick="guardarTarjeta()">Añadir tarjeta</button>`);
}
function guardarTarjeta() {
  const n = ($('#ncNum')?.value || '').replace(/\D/g, '');
  if (n.length < 13 || n.length > 19 || !luhn(n)) return mostrarNotificacion('Número de tarjeta no válido');
  state.cards.push({ brand: $('#ncBrand')?.value || 'Visa', last: n.slice(-4), grad: CARD_GRADS[state.cards.length % CARD_GRADS.length], custom: true });
  state.payIdx = BASE_CARDS.length + state.cards.length - 1;
  saveState(); cerrarSheet(); renderCardsScreen(); mostrarNotificacion('💳 Tarjeta añadida');
}

/* ================= DASHBOARD ================= */
function renderDashboard() {
  const bs = state.bookings, set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('dashBookings', String(bs.length)); set('dashOrders', String(state.orders.length));
  set('dashIncome', eur(bs.reduce((s, b) => s + (b.deposit || 0), 0) + state.orders.reduce((s, o) => s + o.total, 0)));
  const last = bs[bs.length - 1];
  set('dashLastClient', last ? `${last.business} (${last.slot})` : 'Ninguna aún');
}

/* ================= IA ================= */
const AI_INTENTS = [
  { kw: ['pelo', 'corte', 'peluquer', 'barber', 'barba'], reply: 'Puedo enseñarte peluquerías y barberías. La disponibilidad debe confirmarse con cada negocio.', action: { label: 'Ver peluquerías', go: 'belleza' } },
  { kw: ['hambre', 'comer', 'comida', 'pizza', 'sushi', 'hamburguesa'], reply: 'Puedo ayudarte a explorar restaurantes y comercios disponibles en la app. ¿Qué tipo de comida buscas?', action: { label: 'Ver restaurantes', go: 'restaurante' } },
  { kw: ['zapatilla', 'calzado', 'deporte', 'sneaker'], reply: 'Puedo mostrarte tiendas de calzado y deporte. Comprueba el catálogo y la disponibilidad con cada tienda.', action: { label: 'Ver calzado', go: 'calzado' } },
  { kw: ['ropa', 'moda', 'camiseta', 'vestido'], reply: 'Puedo ayudarte a explorar tiendas de moda y sus artículos de muestra.', action: { label: 'Ver moda', go: 'moda' } },
  { kw: ['pedido', 'donde esta', 'seguimiento'], reply: 'Puedo mostrar el estado guardado en esta demo; el seguimiento en tiempo real requiere conectar el servicio de pedidos.', action: { label: 'Ver seguimiento', go: 'pedido' }, dynamic: 'order' },
  { kw: ['reserva', 'mesa', 'turno', 'cita'], reply: 'Puedes reservar mesa, peluquería, spa, probador y más.', action: { label: 'Reservar', go: 'reservas' } },
  { kw: ['farmacia', 'remedio', 'medicamento'], reply: 'Puedo buscar farmacias cercanas. Confirma disponibilidad y horario directamente con la farmacia.', action: { label: 'Ver farmacias', go: 'farmacia' } },
  { kw: ['pagar', 'pago', 'tarjeta'], reply: 'La pantalla de pagos es una demo; para cobrar de verdad hace falta integrar un proveedor de pagos seguro.', action: { label: 'Ver opciones de pago', go: 'tarjetas' } },
  { kw: ['mapa', 'donde queda', 'como llegar', 'ubicacion'], reply: 'En la ficha de cada negocio verás el mapa y «Cómo llegar».', action: { label: 'Explorar negocios', go: 'explorar' } },
  { kw: ['mascota', 'perro', 'gato'], reply: 'Patas Felices tiene todo para tu mascota.', action: { label: 'Abrir Patas Felices', biz: 'mascotas' } },
  { kw: ['cupon', 'descuento', 'codigo'], reply: 'Los cupones de esta demo no tienen validez comercial. Consulta las promociones confirmadas de cada negocio.', action: { label: 'Ir al carrito', go: 'carrito' } },
];
function aiReply(text) {
  const l = norm(text), f = flat(text);
  const biz = BUSINESSES.find(b => (flat(b.name).length >= 3 && f.includes(flat(b.name))) || f.includes(b.id));
  if (biz) return { reply: `Te abro ${biz.name}: ${biz.category}${biz.time ? ', ' + biz.time : ''}.`, action: { label: `Abrir ${biz.name}`, biz: biz.id } };
  const hit = AI_INTENTS.find(i => i.kw.some(k => l.includes(k)));
  if (!hit) return { reply: 'Puedo ayudarte a pedir comida, comprar, reservar o revisar un pago. ¿Qué necesitas?', action: null };
  if (hit.dynamic === 'order') {
    const o = activeOrder();
    if (o) { const s = orderState(o); return { reply: `Tu pedido ${o.code} está: ${STAGE_TEXT[s.stage].pill.toLowerCase()}. Llega en unos ${s.eta} min.`, action: { label: 'Ver seguimiento', go: 'pedido' } }; }
  }
  return { reply: hit.reply, action: hit.action };
}
function pushMsg(role, text, action) {
  const log = $('#chatLog'); if (!log) return;
  const div = document.createElement('div');
  div.className = 'ia-message' + (role === 'user' ? ' user-message' : '');
  div.innerHTML = `${role === 'user' ? '' : '<div class="ai-avatar">✨</div>'}<div class="message">${text}${action ? `<button type="button" class="inline-action">${esc(action.label)}</button>` : ''}${role === 'bot' && 'speechSynthesis' in window ? '<button type="button" class="link-btn speak-message" aria-label="Escuchar respuesta">🔊 Escuchar</button>' : ''}</div>`;
  log.appendChild(div);
  if (action) div.querySelector('.inline-action')?.addEventListener('click', () => { cerrarIA(); action.biz ? abrirNegocio(action.biz) : mostrarSeccion(action.go); });
  div.querySelector('.speak-message')?.addEventListener('click', () => { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(div.querySelector('.message').innerText)); });
  log.scrollTop = log.scrollHeight;
}
function abrirIA() { $('#iaPanel')?.classList.add('open'); }
function cerrarIA() { $('#iaPanel')?.classList.remove('open'); }
function preguntarIA() { const i = $('#iaInput'); if (i) sendChat(i.value); }
async function sendChat(text) {
  if (!text || !text.trim()) return;
  pushMsg('user', esc(text));
  const input = $('#iaInput'); if (input) input.value = '';
  const log = $('#chatLog'), typing = document.createElement('div');
  typing.className = 'ia-message';
  typing.innerHTML = `<div class="ai-avatar">✨</div><div class="message"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  log.appendChild(typing); log.scrollTop = log.scrollHeight;
  try {
    let answer = null;
    if (CONFIG.AI_API_URL) {
      const response = await fetch(CONFIG.AI_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, locale: 'es', context: { city: CONFIG.CITY, businesses: BUSINESSES.filter(b => b.real).slice(0, 12).map(({ id, name, type, distance }) => ({ id, name, type, distance })) } }) });
      if (response.ok) answer = await response.json();
    }
    await new Promise(resolve => setTimeout(resolve, 450));
    typing.remove();
    const fallback = aiReply(text);
    const reply = typeof answer?.reply === 'string' ? answer.reply.slice(0, 1500) : fallback.reply;
    pushMsg('bot', esc(reply), answer?.action || fallback.action);
  } catch {
    typing.remove(); const { reply, action } = aiReply(text); pushMsg('bot', esc(reply), action);
  }
}




/* ================= WEB SHARE API + PERMISOS ================= */

/** Mensajes amigables según tipo de permiso / error */
function permisoMsg(kind, err) {
  const name = err?.name || '';
  const denied = name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError';
  const map = {
    notify: {
      denied: 'Has bloqueado las notificaciones. Actívalas en ajustes del navegador o del sistema.',
      unsupported: 'Este navegador no admite notificaciones.',
      default: 'No se pudieron activar las notificaciones.',
    },
    geo: {
      denied: 'Ubicación denegada. Actívala en ajustes del navegador para ver rutas cercanas.',
      unsupported: 'Tu navegador no permite geolocalización.',
      default: 'No pudimos obtener tu ubicación. Inténtalo de nuevo.',
    },
    share: {
      denied: 'No se pudo abrir el menú de compartir.',
      unsupported: 'Compartir no está disponible aquí; copiamos el enlace.',
      default: 'No se pudo compartir. Se intentará copiar el enlace.',
    },
    clipboard: {
      denied: 'Sin permiso para copiar. Selecciona el texto manualmente.',
      unsupported: 'No se puede copiar automáticamente en este dispositivo.',
      default: 'No se pudo copiar al portapapeles.',
    },
  };
  const m = map[kind] || map.share;
  if (!('Notification' in window) && kind === 'notify') return m.unsupported;
  if (kind === 'geo' && !navigator.geolocation) return m.unsupported;
  if (denied) return m.denied;
  if (name === 'AbortError') return null; // usuario canceló: silencio
  return m.default;
}

function canShare(data) {
  if (typeof navigator === 'undefined' || !navigator.share) return false;
  if (data && navigator.canShare) {
    try { return navigator.canShare(data); } catch { return false; }
  }
  return true;
}

function canShareFiles(files) {
  if (!navigator.share || !navigator.canShare) return false;
  try { return navigator.canShare({ files }); } catch { return false; }
}

/** Descarga una imagen remota como File (para share nativo) */
async function urlToFile(url, filename = 'nexa.jpg') {
  const res = await fetch(url, { mode: 'cors', referrerPolicy: 'no-referrer' });
  if (!res.ok) throw new Error('img-fetch');
  const blob = await res.blob();
  const type = blob.type || 'image/jpeg';
  const name = filename.replace(/.\w+$/, '') + (type.includes('png') ? '.png' : '.jpg');
  return new File([blob], name, { type });
}

/** Genera una tarjeta PNG del negocio con canvas (siempre disponible, sin CORS) */
async function makeBizShareCard(b) {
  const W = 720, H = 900;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Fondo degradado marca
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, b.brand?.a || '#6c5ce7');
  g.addColorStop(1, b.brand?.b || '#a78bfa');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Intentar portada (puede fallar por CORS → ignorar)
  const cover = coverUrl(b.id);
  if (cover) {
    try {
      const img = await loadImageSafe(cover);
      if (img) {
        ctx.save();
        ctx.globalAlpha = 0.35;
        const scale = Math.max(W / img.width, H * 0.55 / img.height);
        const iw = img.width * scale, ih = img.height * scale;
        ctx.drawImage(img, (W - iw) / 2, 0, iw, ih);
        ctx.restore();
        // viñeta
        const vg = ctx.createLinearGradient(0, H * 0.25, 0, H * 0.65);
        vg.addColorStop(0, 'rgba(0,0,0,0)');
        vg.addColorStop(1, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = vg;
        ctx.fillRect(0, H * 0.25, W, H * 0.4);
      }
    } catch (_) {}
  }

  // Emoji grande
  ctx.font = '120px serif';
  ctx.textAlign = 'center';
  ctx.fillText(b.icon || '🛍️', W / 2, H * 0.38);

  // Nombre
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px Sora, Inter, system-ui, sans-serif';
  ctx.fillText(truncateCanvas(ctx, b.name, W - 80), W / 2, H * 0.52);

  // Meta
  ctx.font = '28px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  const meta = `⭐ ${b.rating}  ·  ${b.category}  ·  ${b.distance}`;
  ctx.fillText(truncateCanvas(ctx, meta, W - 80), W / 2, H * 0.58);

  // Descripción
  ctx.font = '24px Inter, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  wrapText(ctx, b.description || '', W / 2, H * 0.66, W - 100, 32, 3);

  // Badge NEXA
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  roundRect(ctx, W / 2 - 70, H - 100, 140, 44, 22);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px Sora, Inter, sans-serif';
  ctx.fillText('NEXA', W / 2, H - 72);

  const blob = await new Promise(res => canvas.toBlob(res, 'image/png', 0.92));
  if (!blob) throw new Error('canvas-blob');
  return new File([blob], `${flat(b.name) || b.id}-nexa.png`, { type: 'image/png' });
}

function loadImageSafe(src, timeout = 4000) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const t = setTimeout(() => resolve(null), timeout);
    img.onload = () => { clearTimeout(t); resolve(img); };
    img.onerror = () => { clearTimeout(t); resolve(null); };
    img.src = src;
  });
}

function truncateCanvas(ctx, str, maxW) {
  if (ctx.measureText(str).width <= maxW) return str;
  let s = str;
  while (s.length && ctx.measureText(s + '…').width > maxW) s = s.slice(0, -1);
  return s + '…';
}

function wrapText(ctx, text, x, y, maxW, lineH, maxLines) {
  const words = String(text).split(/\s+/);
  let line = '', lines = 0;
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y + lines * lineH);
      lines++;
      line = w;
      if (lines >= maxLines) return;
    } else line = test;
  }
  if (line && lines < maxLines) ctx.fillText(line, x, y + lines * lineH);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
    const msg = permisoMsg('clipboard', e);
    if (msg) mostrarNotificacion(msg);
    // fallthrough to execCommand
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Comparte texto/url y, si es posible, una imagen (File).
 * opts.file | opts.files | opts.getFile (async () => File)
 */
async function compartir({ title, text, url, file, files, getFile } = {}) {
  const payload = {
    title: title || 'NEXA',
    text: text || 'Descubre esto en NEXA',
    url: url || (typeof location !== 'undefined' ? location.href.split('#')[0] : ''),
  };
  const line = `${payload.title}\n${payload.text}\n${payload.url}`.trim();

  // Resolver archivos
  let fileList = files || (file ? [file] : null);
  if (!fileList && typeof getFile === 'function') {
    try {
      const f = await getFile();
      if (f) fileList = Array.isArray(f) ? f : [f];
    } catch (e) {
      console.warn('share image build failed', e);
    }
  }

  // 1) Share con imagen (nivel 2)
  if (fileList?.length && canShareFiles(fileList)) {
    try {
      await navigator.share({
        files: fileList,
        title: payload.title,
        text: payload.text,
      });
      if (navigator.vibrate) navigator.vibrate(10);
      return 'shared-file';
    } catch (e) {
      if (e?.name === 'AbortError') return 'abort';
      // sigue a share texto
      const msg = permisoMsg('share', e);
      if (msg) console.warn(msg, e);
    }
  }

  // 2) Share texto/url
  if (canShare()) {
    try {
      const data = { title: payload.title, text: payload.text, url: payload.url };
      if (navigator.canShare && !navigator.canShare(data)) {
        await navigator.share({ title: payload.title, text: `${payload.text}\n${payload.url}` });
      } else {
        await navigator.share(data);
      }
      if (navigator.vibrate) navigator.vibrate(10);
      return 'shared';
    } catch (e) {
      if (e?.name === 'AbortError') return 'abort';
      const msg = permisoMsg('share', e);
      if (msg) mostrarNotificacion(msg);
    }
  }

  // 3) Fallback portapapeles
  const ok = await copyText(line);
  if (ok) {
    mostrarNotificacion('📋 Enlace copiado al portapapeles');
    return 'copied';
  }
  mostrarNotificacion(permisoMsg('clipboard', { name: 'NotAllowedError' }));
  return 'fail';
}

function compartirNegocio(id) {
  const b = bizById(id) || currentBusiness;
  if (!b) return;
  const base = location.href.split('#')[0];
  // Feedback inmediato mientras se genera la imagen
  mostrarNotificacion('Preparando imagen…');
  compartir({
    title: `${b.name} en NEXA`,
    text: `${b.name} · ${b.category} · ⭐ ${b.rating} · ${b.distance}${b.time ? ' · ' + b.time : ''}\n${b.description}`,
    url: `${base}#negocio=${encodeURIComponent(b.id)}`,
    getFile: () => makeBizShareCard(b),
  }).then(r => {
    if (r === 'shared-file') mostrarNotificacion('✅ Compartido con imagen');
  });
}

function compartirPedido() {
  const o = latestOrder();
  if (!o) return mostrarNotificacion('Aún no tienes pedidos');
  const s = orderState(o);
  const base = location.href.split('#')[0];
  compartir({
    title: `Pedido ${o.code} · NEXA`,
    text: `Mi pedido ${o.code} de ${o.from} está: ${STAGE_TEXT[s.stage].pill}. ${s.stage < 3 ? 'Llegada en ~' + s.eta + ' min.' : '¡Ya entregado!'}`,
    url: `${base}#pedido=${encodeURIComponent(o.code)}`,
    getFile: async () => {
      // Tarjeta simple del pedido
      const W = 720, H = 480;
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#1f1640');
      g.addColorStop(1, '#5b46d6');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 40px Sora, Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Pedido ' + o.code, W / 2, 140);
      ctx.font = '32px Inter, sans-serif';
      ctx.fillText(STAGE_TEXT[s.stage].pill, W / 2, 210);
      ctx.font = '26px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(o.from, W / 2, 280);
      if (s.stage < 3) ctx.fillText('Llegada en ~' + s.eta + ' min', W / 2, 330);
      ctx.font = 'bold 22px Sora, sans-serif';
      ctx.fillText('NEXA', W / 2, 420);
      const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      return new File([blob], `pedido-${o.code}.png`, { type: 'image/png' });
    },
  });
}

function compartirReserva(id) {
  const b = state.bookings.find(x => x.id === id) || upcomingBookings()[0];
  if (!b) return mostrarNotificacion('No hay reserva para compartir');
  const base = location.href.split('#')[0];
  compartir({
    title: `Reserva en ${b.business} · NEXA`,
    text: `Reserva: ${b.service} en ${b.business}\n${b.dateLabel}, ${b.slot} h · Código ${b.code}`,
    url: `${base}#reserva=${encodeURIComponent(b.code)}`,
  });
}

function handleDeepLink() {
  const hash = (location.hash || '').replace(/^#/, '');
  if (!hash) return;
  // Soporta pedido=CODE&t=TOKEN o negocio=id
  const params = {};
  hash.split('&').forEach(part => {
    const [k, v] = part.split('=');
    if (k) params[k] = v ? decodeURIComponent(v) : '';
  });
  // También formato key=val simple
  if (!params.pedido && !params.negocio && !params.reserva) {
    const [key, val] = hash.split('=');
    if (key && val) params[key] = decodeURIComponent(val);
  }
  if (params.negocio && bizById(params.negocio)) {
    setTimeout(() => abrirNegocio(params.negocio), 400);
    return;
  }
  if (params.pedido) {
    const code = params.pedido;
    const token = params.t || '';
    setTimeout(async () => {
      // Validar con backend (Firebase o local)
      if (window.NexaBackend) {
        const res = await NexaBackend.validateOrderQR({ code, token });
        if (!res.valid) {
          mostrarNotificacion('⚠️ QR no válido: ' + (res.message || res.reason));
          return;
        }
        if (res.warning === 'already_delivered') {
          mostrarNotificacion('✅ Pedido verificado (ya entregado)');
        } else {
          mostrarNotificacion('✅ Pedido verificado en backend');
        }
        // Si no está en estado local, inyectar snapshot de solo lectura
        if (!state.orders.some(o => o.code === code) && res.order) {
          state.orders.unshift({
            code: res.order.code,
            from: res.order.from,
            items: res.order.items || [],
            total: res.order.total || 0,
            startedAt: res.order.startedAt || Date.now(),
            delivered: !!res.order.delivered,
            kind: 'food',
          });
          saveState();
        }
      }
      if (state.orders.some(o => o.code === code)) abrirSeguimiento();
      else mostrarSeccion('explorar');
    }, 300);
    return;
  }
  if (params.reserva) {
    setTimeout(() => mostrarSeccion('perfil'), 400);
  }
}


/* ================= PERMISOS (Permissions API) ================= */
const PERM_STATE = { notifications: 'unknown', geolocation: 'unknown', clipboard: 'unknown' };

async function queryPerm(name) {
  // name: 'notifications' | 'geolocation' | 'clipboard-write'
  if (!navigator.permissions?.query) {
    // Fallbacks sin Permissions API
    if (name === 'notifications' && 'Notification' in window) return Notification.permission; // granted|denied|default
    if (name === 'geolocation') return 'prompt';
    return 'unknown';
  }
  try {
    const status = await navigator.permissions.query({ name: name === 'clipboard' ? 'clipboard-write' : name });
    // Escuchar cambios
    status.onchange = () => {
      refreshPermissionState();
    };
    return status.state; // granted | denied | prompt
  } catch {
    if (name === 'notifications' && 'Notification' in window) return Notification.permission === 'default' ? 'prompt' : Notification.permission;
    return 'unknown';
  }
}

async function refreshPermissionState() {
  PERM_STATE.notifications = await queryPerm('notifications');
  PERM_STATE.geolocation = await queryPerm('geolocation');
  try {
    PERM_STATE.clipboard = await queryPerm('clipboard-write');
  } catch {
    PERM_STATE.clipboard = 'unknown';
  }
  // Normalizar Notification.permission "default" → prompt
  if (PERM_STATE.notifications === 'default') PERM_STATE.notifications = 'prompt';
  renderPermBadges();
  return { ...PERM_STATE };
}

function permLabel(state) {
  if (state === 'granted') return { t: 'Permitido', c: 'ok' };
  if (state === 'denied') return { t: 'Bloqueado', c: 'bad' };
  if (state === 'prompt') return { t: 'Preguntar', c: 'warn' };
  return { t: 'N/D', c: 'muted' };
}

function renderPermBadges() {
  const box = $('#permStatus');
  if (!box) return;
  const rows = [
    ['🔔 Notificaciones', PERM_STATE.notifications, 'notify'],
    ['📍 Ubicación', PERM_STATE.geolocation, 'geo'],
    ['📋 Portapapeles', PERM_STATE.clipboard, 'clipboard'],
  ];
  const backend = window.NexaBackend?.getState?.() || {};
  const modeLabel = backend.mode === 'firebase'
    ? '<span class="perm-badge ok">Firebase</span>'
    : '<span class="perm-badge warn">Local</span>';
  const fcm = backend.fcmToken ? 'sí' : 'no';
  box.innerHTML = `
    <div class="perm-row"><span>☁️ Backend</span>${modeLabel}</div>
    <div class="perm-row"><span>📨 Token FCM</span><span class="perm-badge ${backend.fcmToken ? 'ok' : 'muted'}">${backend.fcmToken ? 'Activo' : '—'}</span></div>
    ` + rows.map(([label, st]) => {
    const { t, c } = permLabel(st);
    return `<div class="perm-row"><span>${label}</span><span class="perm-badge ${c}">${t}</span></div>`;
  }).join('') + `
    <button type="button" class="outline-action perm-refresh" onclick="solicitarPermisosPendientes()">Revisar permisos</button>`;
}

async function solicitarPermisosPendientes() {
  // Pide solo los que están en prompt; si denied, muestra guía
  const st = await refreshPermissionState();
  if (st.notifications === 'prompt') {
    await ensureNotifyPermission();
  } else if (st.notifications === 'denied') {
    mostrarNotificacion(permisoMsg('notify', { name: 'NotAllowedError' }));
  }
  if (st.geolocation === 'prompt') {
    pedirUbicacion();
  } else if (st.geolocation === 'denied') {
    mostrarNotificacion(permisoMsg('geo', { name: 'NotAllowedError' }));
  }
  // Clipboard solo se valida al copiar
  await refreshPermissionState();
  mostrarNotificacion('Estado de permisos actualizado');
}

/* ================= QR (librería QRCode por CDN) ================= */
function orderShareUrl(code) {
  if (window.NexaBackend?.buildQrPayload) {
    return NexaBackend.buildQrPayload(code).url;
  }
  const base = location.href.split('#')[0];
  return `${base}#pedido=${encodeURIComponent(code)}`;
}

function loadQRCodeScript(src, timeoutMs = 5000) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    let settled = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const timer = setTimeout(() => { script.remove(); finish(null); }, timeoutMs);
    script.src = src;
    script.async = true;
    script.onload = () => finish(window.QRCode || null);
    script.onerror = () => { script.remove(); finish(null); };
    document.head.appendChild(script);
  });
}

async function waitForQRCode() {
  if (window.QRCode) return window.QRCode;
  const sources = [
    'https://unpkg.com/qrcode@1.5.4/build/qrcode.min.js',
    'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js',
  ];
  for (const src of sources) {
    const lib = await loadQRCodeScript(src);
    if (lib) return lib;
  }
  return null;
}
/** Dibuja QR en un canvas existente o devuelve dataURL */
async function generateQR(text, { size = 180, canvas = null, margin = 2, dark = '#1a1240', light = '#ffffff' } = {}) {
  const lib = await waitForQRCode();
  if (!lib) throw new Error('QRCode library not loaded');
  const opts = { width: size, margin, color: { dark, light }, errorCorrectionLevel: 'M' };
  if (canvas) {
    await lib.toCanvas(canvas, text, opts);
    return canvas;
  }
  return lib.toDataURL(text, opts);
}

async function renderOrderQR(code, canvasId = 'orderQr') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !code) return;
  try {
    // Asegurar token firmado por Cloud Function si hay backend
    if (window.NexaBackend?.refreshOrderQr) {
      await NexaBackend.refreshOrderQr(code);
    }
    const url = orderShareUrl(code);
    await generateQR(url, { size: 168, canvas, margin: 2 });
    canvas.dataset.url = url;
    canvas.classList.add('ready');
  } catch (e) {
    console.warn('QR error', e);
    const parent = canvas.parentElement;
    if (parent) parent.innerHTML = `<p class="qr-fallback">Código: <b>${esc(code)}</b><br><small>No se pudo generar el QR</small></p>`;
  }
}


async function validarPedidoQR(code) {
  if (!window.NexaBackend) return mostrarNotificacion('Backend no disponible');
  const token = NexaBackend.makeOrderToken(code);
  mostrarNotificacion('Validando QR…');
  const res = await NexaBackend.validateOrderQR({ code, token });
  if (res.valid) {
    mostrarNotificacion('✅ ' + (res.message || 'Pedido verificado') + (res.order ? ' · ' + res.order.from : ''));
  } else {
    mostrarNotificacion('❌ ' + (res.message || res.reason || 'No válido'));
  }
}

async function shareOrderQR(code) {
  const o = state.orders.find(x => x.code === code) || latestOrder();
  if (!o) return mostrarNotificacion('No hay pedido');
  const url = orderShareUrl(o.code);
  mostrarNotificacion('Generando QR…');
  try {
    const dataUrl = await generateQR(url, { size: 512, margin: 3 });
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], `nexa-${o.code}.png`, { type: 'image/png' });
    await compartir({
      title: `Pedido ${o.code} · NEXA`,
      text: `Sigue mi pedido ${o.code} de ${o.from} en NEXA`,
      url,
      file,
    });
  } catch (e) {
    console.warn(e);
    await compartir({
      title: `Pedido ${o.code} · NEXA`,
      text: `Sigue mi pedido ${o.code}`,
      url,
    });
  }
}


/* ================= NOTIFICACIONES PUSH (Web Notifications API) ================= */
let pushReady = false;

async function ensureNotifyPermission() {
  if (!('Notification' in window)) {
    mostrarNotificacion(permisoMsg('notify', { name: 'unsupported' }));
    return false;
  }
  // Preferir flujo Firebase FCM (registra token en backend)
  if (window.NexaBackend) {
    try {
      const res = await NexaBackend.requestNotifyWithFirebase();
      pushReady = !!res.ok;
      if (!res.ok) {
        mostrarNotificacion(permisoMsg('notify', { name: res.permission === 'denied' ? 'NotAllowedError' : 'default' }));
      } else if (res.mode === 'firebase-fcm' && res.token) {
        console.info('[NEXA] FCM token registrado');
      }
      refreshPermissionState();
      return pushReady;
    } catch (e) {
      console.warn('FCM path failed, fallback', e);
    }
  }
  if (Notification.permission === 'granted') { pushReady = true; refreshPermissionState(); return true; }
  if (Notification.permission === 'denied') {
    mostrarNotificacion(permisoMsg('notify', { name: 'NotAllowedError' }));
    return false;
  }
  try {
    const p = await Notification.requestPermission();
    pushReady = p === 'granted';
    if (!pushReady) mostrarNotificacion(permisoMsg('notify', { name: p === 'denied' ? 'NotAllowedError' : 'default' }));
    refreshPermissionState();
    return pushReady;
  } catch (e) {
    mostrarNotificacion(permisoMsg('notify', e));
    refreshPermissionState();
    return false;
  }
}

/** Muestra notificación del sistema (y toast interno). Funciona en PWA/standalone. */
async function pushNotify(title, body, opts = {}) {
  mostrarNotificacion(body || title);
  if (!state.pushOn) return;
  const ok = await ensureNotifyPermission();
  if (!ok) return;
  const payload = {
    title: title || 'NEXA',
    body: body || '',
    tag: opts.tag || 'nexa-' + Date.now(),
    url: opts.url || '/',
  };
  // Preferir Service Worker (mejor en Android / PWA)
  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SHOW_NOTIFICATION', ...payload });
    return;
  }
  try {
    const reg = await navigator.serviceWorker?.ready;
    if (reg?.showNotification) {
      await reg.showNotification(payload.title, {
        body: payload.body,
        icon: './icon-192.png',
        badge: './icon-192.png',
        tag: payload.tag,
        data: payload.url,
        vibrate: [80, 40, 80],
      });
      return;
    }
  } catch (_) {}
  // Fallback: Notification directa
  try {
    new Notification(payload.title, { body: payload.body, tag: payload.tag, icon: './icon-192.png' });
  } catch (_) {}
}

function initPushFromProfile() {
  // Llamado al activar el switch de notificaciones
  ensureNotifyPermission().then(ok => {
    if (ok) pushNotify('NEXA', 'Notificaciones activadas. Te avisaremos del estado de tus pedidos.');
    else if (Notification.permission === 'denied')
      mostrarNotificacion('Activa las notificaciones en los ajustes del navegador');
  });
}


/* ================= NOTIFICACIONES ================= */
function mostrarNotificacion(texto) {
  const host = $('.phone-screen'); if (!host) return;
  $$('.toast', host).forEach(t => t.remove());
  const n = document.createElement('div');
  n.className = 'toast'; n.setAttribute('role', 'status'); n.textContent = texto;
  host.append(n);
  requestAnimationFrame(() => n.classList.add('show'));
  setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 300); }, 2600);
}

/* ================= PULL TO REFRESH ================= */
function initPullToRefresh() {
  const scroll = $('#homeScroll');
  const ind = $('#ptrIndicator');
  if (!scroll || !ind) return;
  let startY = 0, pulling = false;
  scroll.addEventListener('touchstart', e => {
    if (scroll.scrollTop <= 0) { startY = e.touches[0].clientY; pulling = true; }
  }, { passive: true });
  scroll.addEventListener('touchmove', e => {
    if (!pulling) return;
    if (e.touches[0].clientY - startY > 60) ind.classList.add('visible');
  }, { passive: true });
  scroll.addEventListener('touchend', () => {
    if (ind.classList.contains('visible')) {
      setTimeout(() => {
        ind.classList.remove('visible');
        renderHomeExtras();
        mostrarNotificacion('Actualizado');
      }, 700);
    }
    pulling = false;
  });
}

/* ================= INYECCIÓN ================= */
function injectScreens() {
  const root = $('.phone-screen'); if (!root || $('#resultsScreen')) return;
  root.insertAdjacentHTML('beforeend', `
    <section id="resultsScreen" class="flow-screen hidden">
      <header class="flow-header"><button type="button" onclick="setMain('homeScreen')" aria-label="Volver">‹</button><h2>Explorar</h2><span></span></header>
      <div class="flow-body">
        <div class="search-box slim"><span aria-hidden="true">⌕</span><input id="resSearch" aria-label="Buscar" placeholder="Buscar marcas, comida, tiendas…"></div>
        <div class="rchips" id="resChips"></div>
        <h3 id="resultsTitle">Explorar cerca de ti</h3><div id="resultsList"></div>
      </div>
    </section>
    <section id="detailScreen" class="flow-screen hidden">
      <header class="flow-header"><button type="button" onclick="volverDetalle()" aria-label="Volver">‹</button><h2>Negocio</h2><button type="button" onclick="setMain('homeScreen')" aria-label="Cerrar">×</button></header>
      <div class="flow-body">
        <div class="detail-cover" id="detailIcon"></div>
        <h2 id="detailName" class="detail-name"></h2>
        <p id="detailCategory" class="muted"></p>
        <div class="chips-row" id="detailChips"></div>
        <p id="detailDescription" class="description"></p>
        <div class="action-row action-row-4">
          <button type="button" id="favoriteToggle" class="outline-action" onclick="alternarFavorito()">♡ Guardar</button>
          <button type="button" id="detailReserve" class="outline-action" onclick="startBooking(currentBusiness.id)">📅 Reservar</button>
          <button type="button" class="outline-action" onclick="abrirRuta(currentBusiness.id)">🧭 Ruta</button>
          <button type="button" class="outline-action" onclick="compartirNegocio(currentBusiness.id)">↗ Compartir</button>
        </div>
        <div id="detailMenu"></div>
        <div id="detailServices"></div>
        <div id="detailMap"></div>
        <div id="detailReviews"></div>
        <div id="detailCartBar" class="cart-bar hidden"></div>
      </div>
    </section>
    <section id="reservasScreen" class="flow-screen hidden">
      <header class="flow-header"><button type="button" onclick="bookingBack()" aria-label="Volver">‹</button><h2>Reservas</h2><span></span></header>
      <div class="flow-body" id="bookingFlow"></div>
    </section>
    <section id="carritoScreen" class="flow-screen hidden">
      <header class="flow-header"><button type="button" onclick="setMain('homeScreen')" aria-label="Volver">‹</button><h2>Carrito</h2><span></span></header>
      <div class="flow-body" id="cartFlow"></div>
    </section>
    <section id="pedidoScreen" class="flow-screen hidden">
      <header class="flow-header floating"><button type="button" onclick="setMain('homeScreen')" aria-label="Volver">‹</button><h2>Seguimiento</h2><span></span></header>
      <div id="trackBody"></div>
    </section>
    <section id="profileScreen" class="flow-screen hidden"></section>
    <section id="cardsScreen" class="flow-screen hidden">
      <header class="flow-header"><button type="button" onclick="setMain('profileScreen')" aria-label="Volver">‹</button><h2>Mis tarjetas</h2><span></span></header>
      <div class="flow-body cards-body" id="cardsBody"></div>
    </section>
    <section id="favoritesScreen" class="flow-screen hidden">
      <header class="flow-header"><button type="button" onclick="setMain('homeScreen')" aria-label="Volver">‹</button><h2>Favoritos</h2><span></span></header>
      <div class="flow-body"><h3>Tus lugares guardados</h3><div id="favoritesList"></div></div>
    </section>
    <section id="dashboardScreen" class="flow-screen hidden">
      <header class="flow-header"><button type="button" onclick="setMain('profileScreen')" aria-label="Volver">‹</button><h2>Panel de negocios</h2><span></span></header>
      <div class="flow-body">
        <h3>Resumen</h3>
        <div class="dashboard-stats">
          <div class="stat-card"><span>Reservas</span><br><b id="dashBookings">0</b></div>
          <div class="stat-card"><span>Pedidos</span><br><b id="dashOrders">0</b></div>
          <div class="stat-card"><span>Ingresos</span><br><b id="dashIncome">0 €</b></div>
        </div>
        <div class="info-tile"><span>Última reserva</span><b id="dashLastClient">Ninguna aún</b></div>
        <button type="button" class="primary-action" onclick="setMain('homeScreen')">Volver al inicio</button>
      </div>
    </section>
    <div id="paySheetWrap" class="pay-wrap"><div class="pay-backdrop" onclick="cerrarPago()"></div><div class="pay-sheet" id="paySheet"></div></div>
    <div id="sheetWrap" class="pay-wrap sheet-wrap"><div class="pay-backdrop" onclick="cerrarSheet()"></div><div class="pay-sheet" id="sheetBody"></div></div>
  `);
}

/* ================= ARRANQUE ================= */
document.addEventListener('DOMContentLoaded', () => {
  if (window.NexaBackend) NexaBackend.init().then(() => refreshPermissionState()).catch(() => {});
  injectScreens();
  if (!state.remember) state.user = null;
  applyTheme();
  updateClock();
  setInterval(updateClock, 30000);

  $('#searchInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') actualizarBusqueda(); });
  $('#resSearch')?.addEventListener('input', e => { resQuery = e.target.value.trim(); renderResults(); });
  $('#iaInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') preguntarIA(); });
  $$('#chatSuggest [data-q]').forEach(b => b.addEventListener('click', () => sendChat(b.dataset.q)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { cerrarSheet(); cerrarPago(); cerrarIA(); } });

  initAuthUI(); setAuthMode('login');
  initOnboarding();
  initPullToRefresh();
  renderCategories(); renderBrands(); renderPromos(); renderFeatured();
  updateCartDot(); applyUser();
  pushMsg('bot', "Hola 👋 Soy NEXA IA. Puedo abrirte McDonald's, Nike o Zara, reservar una mesa o turno, o decirte dónde está tu pedido.");

  setInterval(() => { if (currentView === 'homeScreen') renderOrderBanner(); }, 2000);
  setInterval(() => { if (currentView === 'homeScreen') renderHomeExtras(); }, 60000);

  if ((location.protocol === 'http:' || location.protocol === 'https:') && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  setMain(state.user ? 'homeScreen' : 'splashScreen');
  if (state.user) setTimeout(() => window.NEXA_GEO?.locate(true), 700);
  handleDeepLink();
  refreshPermissionState();
});


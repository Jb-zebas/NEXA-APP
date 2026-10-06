'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Falta OPENAI_API_KEY. Configúrala en el entorno del servidor o en .env para desarrollo local.');
  process.exit(1);
}

const app = express();
const openai = new OpenAI({ apiKey });
const port = Number(process.env.PORT) || 3000;
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5500,http://127.0.0.1:5500')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Permite herramientas locales sin Origin; CORS no sustituye autenticación.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origen no permitido'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '32kb' }));

// Límite básico por IP: hasta 20 solicitudes por minuto.
const solicitudes = new Map();
function limitarPorIP(req, res, next) {
  const ahora = Date.now();
  const ip = req.ip || req.socket.remoteAddress || 'desconocida';
  let registro = solicitudes.get(ip);

  if (!registro || ahora - registro.inicio >= 60_000) {
    registro = { inicio: ahora, total: 0 };
    solicitudes.set(ip, registro);
  }
  if (registro.total >= 20) {
    return res.status(429).json({ error: 'demasiadas-peticiones' });
  }
  registro.total += 1;

  if (solicitudes.size > 10_000) {
    for (const [clave, valor] of solicitudes) {
      if (ahora - valor.inicio >= 60_000) solicitudes.delete(clave);
    }
  }
  return next();
}

const SISTEMA = `Eres NEXA IA, el asistente de una app de pedidos, compras y reservas en Gijón.
Hablas como una persona de la zona: cercano, claro y breve. Máximo dos frases.
Lo que digas se leerá en voz alta, así que nada de emojis, listas, markdown ni abreviaturas.
Solo puedes recomendar negocios de la lista "nearby" del contexto. No inventes sitios, precios ni horarios.
Si preguntan por su pedido, usa "order". Si no lo sabes, dilo sin rodeos y ofrece otra cosa.
Si la petición es vaga ("tengo hambre"), propón uno o dos sitios cercanos o haz una sola pregunta corta.
Responde siempre con JSON válido:
{"reply":"texto","action":null,"chips":[]}
"action" puede ser {"label":"Abrir X","biz":"id_del_negocio"} o {"label":"Ver peluquerías","go":"belleza"}.
Valores válidos de "go": belleza, restaurante, calzado, moda, farmacia, spa, super, tecnologia, reservas, carrito, pedido, tarjetas, favoritos, mapa, explorar, perfil.
"chips" son hasta 3 respuestas rápidas que el usuario podría querer decir después (máximo 4 palabras cada una).`;

app.get('/health', (_req, res) => res.json({ ok: true }));
app.post('/ia', limitarPorIP, async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body || {};
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'mensaje-vacio' });
    }

    const contexto = JSON.stringify(context).slice(0, 6000);
    const historial = Array.isArray(history) ? history : [];
    const mensajes = [
      { role: 'system', content: SISTEMA },
      { role: 'system', content: 'Contexto: ' + contexto },
      ...historial.slice(-8)
        .filter(item => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
        .map(item => ({ role: item.role, content: item.content.slice(0, 500) })),
      { role: 'user', content: message.trim().slice(0, 500) },
    ];

    const salida = await openai.chat.completions.create({
      model,
      messages: mensajes,
      response_format: { type: 'json_object' },
      temperature: 0.6,
      max_tokens: 220,
    });

    const contenido = salida.choices?.[0]?.message?.content || '{}';
    const datos = JSON.parse(contenido);
    return res.json({
      reply: String(datos.reply || ''),
      action: datos.action || null,
      chips: Array.isArray(datos.chips) ? datos.chips.slice(0, 3) : [],
    });
  } catch (error) {
    console.error('Falló la solicitud de NEXA IA:', error.message);
    return res.status(500).json({ error: 'ia-no-disponible' });
  }
});

app.use((error, _req, res, _next) => {
  if (error.message === 'Origen no permitido') {
    return res.status(403).json({ error: 'origen-no-permitido' });
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'solicitud-demasiado-grande' });
  }
  console.error('Error del servidor:', error.message);
  return res.status(500).json({ error: 'error-del-servidor' });
});

app.listen(port, () => {
  console.log(`Servidor NEXA listo en el puerto ${port}`);
});

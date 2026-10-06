// Para pegar en server.js, justo después de `const app = express()`.
// Hace falta: npm i openai cors   (y OPENAI_API_KEY ya puesta)

const OpenAI = require('openai');
const cors = require('cors');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors()); // solo si abres el HTML desde otro origen
app.use(express.json());

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

// límite sencillo por IP para que nadie te gaste la clave
const visitas = new Map();
function limitar(req, res, next) {
  const ahora = Date.now();
  const lista = (visitas.get(req.ip) || []).filter(t => ahora - t < 60000);
  if (lista.length >= 20) return res.status(429).json({ error: 'demasiadas-peticiones' });
  lista.push(ahora);
  visitas.set(req.ip, lista);
  next();
}

app.post('/ia', limitar, async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body || {};
    if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'mensaje-vacio' });

    const mensajes = [
      { role: 'system', content: SISTEMA },
      { role: 'system', content: 'Contexto: ' + JSON.stringify(context).slice(0, 6000) },
      ...history.slice(-8)
        .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
        .map(m => ({ role: m.role, content: m.content.slice(0, 500) })),
      { role: 'user', content: message.slice(0, 500) },
    ];

    const salida = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // pon el modelo que tengas disponible
      messages: mensajes,
      response_format: { type: 'json_object' },
      temperature: 0.6,
      max_tokens: 220,
    });

    const d = JSON.parse(salida.choices[0].message.content);
    res.json({ reply: String(d.reply || ''), action: d.action || null, chips: Array.isArray(d.chips) ? d.chips : [] });
  } catch (e) {
    console.error('/ia:', e.message);
    res.status(500).json({ error: 'ia-no-disponible' }); // el front responde con su cerebro local
  }
});
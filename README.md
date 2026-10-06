# NEXA APP

## Clave de OpenAI para el servidor

El backend de NEXA IA lee la variable `OPENAI_API_KEY` mediante `process.env`. Configura la clave real como secreto en el entorno del servidor donde despliegues la aplicación. No la escribas en `app.js`, `ia.js` ni en ningún archivo que se envíe al navegador.

Para desarrollo local, copia `.env.example` a `.env` y añade la clave real en ese archivo. El servidor debe cargar las variables de `.env` (por ejemplo, mediante `dotenv`). `.env` está excluido por `.gitignore`; no lo subas a GitHub.

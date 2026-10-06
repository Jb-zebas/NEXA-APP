# NEXA APP

## Servidor de NEXA IA

El backend ejecutable está en `server.js`. Expone `GET /health` para comprobar que está activo y `POST /ia` para las respuestas de NEXA. La clave se lee desde `OPENAI_API_KEY` en el entorno del servidor; no la pongas en `app.js`, `ia.js` ni en ningún archivo que se envíe al navegador.

### Ejecutar en desarrollo local

1. Instala Node.js 22 o posterior.
2. En la carpeta del proyecto, ejecuta `npm install`.
3. Copia `.env.example` a `.env` y pega la clave real en `OPENAI_API_KEY` dentro de `.env`.
4. Ejecuta `npm start`.
5. El servidor queda disponible en `http://localhost:3000`; la ruta de IA es `http://localhost:3000/ia`.

`.env` está excluido por `.gitignore`; no lo subas a GitHub. Para alojamiento, configura `OPENAI_API_KEY`, `OPENAI_MODEL`, `PORT` y `CORS_ORIGIN` en el panel de variables o secretos del proveedor. Cuando tengas la URL del servidor, configura `AI_API_URL` en la app con la dirección terminada en `/ia`, sin incluir la clave de OpenAI.

### Antes de hacerlo público

El servidor incluye un límite básico en memoria de 20 solicitudes por IP y una lista de orígenes CORS. CORS no autentica a quienes llaman al servidor; antes de publicar el endpoint en Internet, protégelo con autenticación o controles de acceso y límites de uso del proveedor de alojamiento. El límite en memoria no sustituye esos controles.

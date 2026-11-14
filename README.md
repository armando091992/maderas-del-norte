# Maderas del Norte · Fábrica a tu Casa (tienda online + chatbot)

Sitio estático (HTML/CSS/JS) con 20 productos, carrito, panel del dueño y chatbot. Prototipo con datos ficticios.

## Modos de funcionamiento
- **Demo** (`config.js` vacío): todo funciona en memoria; al recargar se reinicia.
- **Completo**: con Supabase (productos, pedidos, stock) y n8n (chatbot y avisos de pedido).

## Puesta en marcha
1. **Supabase**: SQL Editor → pegar y ejecutar `supabase_schema.sql` (borra y recrea las tablas). Comprobar: `select count(*) from productos;` → 20.
2. **config.js**: completar `SUPABASE_URL` y `SUPABASE_ANON_KEY` (Settings > API). Nunca la clave service_role.
3. **Probar local**: Live Server sobre `index.html`.
4. **Vercel**: subir esta carpeta a un repositorio de GitHub e importarlo en Vercel como proyecto estático (sin comando de build). Cada cambio en `main` se publica solo.
5. **Fotos**: copiar las imágenes a `img/` (ver `img/LEEME.txt`).

## Chatbot con n8n
Crear un flujo con un nodo **Webhook** (POST, respuesta con *Respond to Webhook*) y pegar la URL de producción en `N8N_CHAT_WEBHOOK`. Habilitar en el Webhook el origen permitido (CORS) del dominio de Vercel.

La página envía:
`{ "sesionId": "uuid", "mensaje": "texto", "pedidoId": "MN-1001" | null }`

n8n debe responder JSON:
`{ "respuesta": "texto para el cliente", "derivada": false }`  (`derivada: true` si se pasa a una persona)

Si n8n no responde en 15 segundos o falla, el chat usa respuestas locales de respaldo. El texto de `respuesta` se muestra escapado (sin HTML).
Sugerencia: en n8n, guardar cada mensaje en la tabla `mensajes_chat` (columnas `sesion_id`, `rol`, `contenido`, `derivada`) con la credencial de Supabase de n8n.

`N8N_ORDER_WEBHOOK` (opcional) recibe `{pedidoId, cliente, zona, franja, revendedor, total, items}` cada vez que se confirma un pedido.

## Seguridad (demo)
La vista del dueño no tiene login: la lectura de pedidos y las funciones de reponer stock y marcar entregas están abiertas a quien tenga la clave anon. Para uso real hay que agregar Supabase Auth.

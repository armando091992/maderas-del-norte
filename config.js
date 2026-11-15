// Completar con los datos de tu proyecto. Si queda vacío, la tienda funciona en modo demo (sin base de datos).
// La clave anon es pública por diseño. NUNCA pongas acá la clave service_role.
window.CONFIG = {
  SUPABASE_URL: "https://ulzphpztkgsevyhdadbt.supabase.co",            // ej: https://xxxx.supabase.co
  SUPABASE_ANON_KEY: "sb_publishable_2I-bWw1gFmEUyLU62pyidQ_UjydJFlO",       // Supabase > Settings > API > anon public
  N8N_CHAT_WEBHOOK: "https://n8n-service-xbo6.onrender.com/webhook/chatbot",        // URL de producción del webhook del chatbot en n8n
  N8N_ORDER_WEBHOOK: ""        // (opcional) webhook que avisa a n8n de cada pedido nuevo
};

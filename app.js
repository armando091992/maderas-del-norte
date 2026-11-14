const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P=[{id:1,s:12,i:"img/mesa-ratona.jpg",n:"Mesa ratona de pino",p:38000,m:"90 × 50 × 45 cm",w:"pino",c:"Living",t:0},{id:2,s:30,i:"img/silla-eucalipto.jpg",n:"Silla de eucalipto",p:24000,m:"45 × 50 × 90 cm",w:"eucalipto",c:"Comedor",t:1},{id:3,s:8,i:"img/estante-5-repisas.jpg",n:"Estante de 5 repisas",p:52000,m:"80 × 30 × 180 cm",w:"pino",c:"Living",t:2},{id:4,s:5,i:"img/cama-1-plaza-y-media.jpg",n:"Cama de 1½ plaza",p:98000,m:"190 × 100 × 40 cm",w:"pino",c:"Dormitorio",t:3},{id:5,s:4,i:"img/mesa-comedor.jpg",n:"Mesa de comedor (6 personas)",p:145000,m:"160 × 80 × 75 cm",w:"eucalipto",c:"Comedor",t:4},{id:6,s:15,i:"img/mesa-de-luz.jpg",n:"Mesa de luz",p:29000,m:"40 × 35 × 50 cm",w:"pino",c:"Dormitorio",t:5},{id:7,s:6,i:"img/biblioteca-3-cuerpos.jpg",n:"Biblioteca de 3 cuerpos",p:95000,m:"120 × 30 × 180 cm",w:"pino",c:"Living",t:2},{id:8,s:7,i:"img/rack-tv.jpg",n:"Rack para TV",p:68000,m:"140 × 40 × 55 cm",w:"pino",c:"Living",t:4},{id:9,s:9,i:"img/mesa-ratona-eucalipto.jpg",n:"Mesa ratona de eucalipto",p:46000,m:"100 × 55 × 42 cm",w:"eucalipto",c:"Living",t:0},{id:10,s:14,i:"img/banco-eucalipto.jpg",n:"Banco de eucalipto",p:31000,m:"120 × 35 × 45 cm",w:"eucalipto",c:"Comedor",t:1},{id:11,s:6,i:"img/mesa-comedor-4.jpg",n:"Mesa de comedor (4 personas)",p:98000,m:"120 × 75 × 75 cm",w:"pino",c:"Comedor",t:4},{id:12,s:3,i:"img/aparador.jpg",n:"Aparador",p:132000,m:"150 × 40 × 85 cm",w:"eucalipto",c:"Comedor",t:5},{id:13,s:4,i:"img/cama-2-plazas.jpg",n:"Cama de 2 plazas",p:128000,m:"200 × 150 × 40 cm",w:"pino",c:"Dormitorio",t:3},{id:14,s:3,i:"img/cama-cucheta.jpg",n:"Cama cucheta",p:165000,m:"200 × 90 × 160 cm",w:"pino",c:"Dormitorio",t:3},{id:15,s:6,i:"img/cajonera-4.jpg",n:"Cajonera de 4 cajones",p:74000,m:"70 × 40 × 100 cm",w:"pino",c:"Dormitorio",t:5},{id:16,s:2,i:"img/placard-2-puertas.jpg",n:"Placard de 2 puertas",p:189000,m:"120 × 50 × 180 cm",w:"pino",c:"Dormitorio",t:2},{id:17,s:8,i:"img/escritorio.jpg",n:"Escritorio de pino",p:72000,m:"120 × 60 × 75 cm",w:"pino",c:"Oficina",t:4},{id:18,s:10,i:"img/silla-escritorio.jpg",n:"Silla de escritorio",p:39000,m:"45 × 50 × 85 cm",w:"eucalipto",c:"Oficina",t:1},{id:19,s:5,i:"img/mesa-jardin.jpg",n:"Mesa de jardín de eucalipto",p:118000,m:"150 × 80 × 75 cm",w:"eucalipto",c:"Exterior",t:4},{id:20,s:12,i:"img/reposera.jpg",n:"Reposera de eucalipto",p:47000,m:"60 × 140 × 90 cm",w:"eucalipto",c:"Exterior",t:1}];
const Z=[["Retiro en fábrica",0],["Zona 1 · cerca de la planta",6000],["Zona 2",12000],["Zona 3",20000]];
const R=["Ninguno","Mueblería A","Mueblería B","Mueblería C"];
const money=n=>"$ "+n.toLocaleString("es-AR");
const cot=p=>{const d=p.m.split(" × ");return `<i class="cx">${d[0]} cm</i><i class="cy">${parseInt(d[2])} cm</i>`};
const dueno=()=>document.body.classList.contains("dueno");
const IC=['<rect x="8" y="24" width="48" height="7" rx="2"/><path d="M14 31v18M50 31v18M8 40h48"/>','<path d="M20 10v28h24V10"/><path d="M16 38h32M20 38v16M44 38v16"/>','<rect x="14" y="8" width="36" height="48" rx="2"/><path d="M14 20h36M14 32h36M14 44h36"/>','<path d="M6 48V20M58 48V32M6 38h52"/><rect x="12" y="26" width="14" height="10" rx="3"/><path d="M26 32h32v6"/>','<rect x="6" y="22" width="52" height="6" rx="2"/><path d="M12 28v22M52 28v22M24 28v14M40 28v14"/>','<rect x="16" y="14" width="32" height="38" rx="2"/><path d="M16 30h32M28 22h8M28 40h8"/>'];
const ic=t=>`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${IC[t]}</svg>`;
let cart={},orders=[],bot={q:0,h:0},cf="Todos";
const slots=[];for(let d=2;d<=4;d++){const s=new Date(Date.now()+d*864e5).toLocaleDateString("es-AR",{weekday:"short",day:"2-digit",month:"2-digit"});slots.push(s+" · mañana (8 a 12 h)",s+" · tarde (14 a 18 h)")}
function go(n){$$(".sec").forEach((s,i)=>s.hidden=i!=n);$$(".tab").forEach((t,i)=>t.classList.toggle("on",i==n))}
function shop(){$("#grid").innerHTML=P.filter(p=>cf=="Todos"||p.c==cf).map(p=>{const l=p.s-(cart[p.id]||0);return `<div class="pc ${p.w}"><div class="ph"><img src="${p.i}" alt="${p.n}" loading="lazy" onerror="this.remove()">${ic(p.t)}${cot(p)}<span class="bd ${l<1?"low":l<=3?"mid":"ok"}">${l<1?"Sin stock":l<=3?"Quedan "+l:"Disponible"}</span></div><b>${p.n}</b><small>${p.w} · ${p.m}</small><div class="pr">${money(p.p)}</div><button onclick="add(${p.id})" ${l<1?"disabled":""}>${l<1?"Sin stock":"Agregar"}</button></div>`}).join("")}shop();
const CATS=["Todos",...new Set(P.map(p=>p.c))];function drawCf(){$("#cf").innerHTML=CATS.map(c=>`<button class="chip ${cf==c?"on":""}" onclick="setC('${c}')">${c}</button>`).join("")}function setC(c){cf=c;drawCf();shop()}drawCf();
$("#zn").innerHTML=Z.map((z,i)=>`<option value="${i}">${z[0]}${z[1]?" (+"+money(z[1])+")":""}</option>`).join("");
$("#sl").innerHTML=slots.map(s=>`<option>${s}</option>`).join("");
$("#rf").innerHTML=R.map((r,i)=>`<option value="${i}">${r}</option>`).join("");
$("#qs").innerHTML=R.slice(1).map((r,i)=>`<option value="${i}">${r}</option>`).join("");
function add(id){const p=P.find(x=>x.id==id);if((cart[id]||0)>=p.s)return toast("No hay más stock de "+p.n);cart[id]=(cart[id]||0)+1;shop();drawCart()}
function rm(id){if(--cart[id]<=0)delete cart[id];shop();drawCart()}
const sub=()=>Object.entries(cart).reduce((a,[i,q])=>a+P.find(x=>x.id==i).p*q,0);
function drawCart(){const e=Object.entries(cart);
$("#cl").innerHTML=e.length?e.map(([i,q])=>{const p=P.find(x=>x.id==i);return `<div class="ln"><span>${p.n} × ${q}</span><span>${money(p.p*q)} <button class="mini" onclick="rm(${i})">−</button></span></div>`}).join(""):"<small>Tu carrito está vacío.</small>";
$("#tot").textContent=money(e.length?sub()+Z[$("#zn").value][1]:0);$("#ok").disabled=!e.length||!$("#nm").value.trim()}

async function place(o){
  if(!sb) {
    o.id="MN-"+(1001+orders.length);o.st="Pedido recibido";orders.push(o);
    o.it.forEach(x=>P.find(p=>p.id==x.id).s-=x.q);shop();dueno()?go(1):toast("¡Pedido confirmado! "+o.id+" · te avisamos la entrega por WhatsApp");flow(o);panel();
    return;
  }
  const r=await sb.rpc("crear_pedido",{
    p_cliente: o.nm,
    p_zona: o.zn,
    p_franja: o.sl,
    p_revendedor: o.rf,
    p_origen: "tienda",
    p_items: o.it.map(x=>({producto_id:x.id,cantidad:x.q}))
  });
  if(r.error)return toast("No se pudo crear el pedido: "+r.error.message);
  o.id="MN-"+r.data;await sync();dueno()?go(1):toast("¡Pedido confirmado! "+o.id+" · te avisamos la entrega por WhatsApp");flow(o);
  if(CFG.N8N_ORDER_WEBHOOK)fetch(CFG.N8N_ORDER_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pedidoId:r.data,cliente:o.nm,zona:o.zn,franja:o.sl,revendedor:o.rf,total:o.tot,items:o.it})}).catch(()=>{})
}

$("#ok").onclick=()=>{const it=Object.entries(cart).map(([i,q])=>({p:P.find(x=>x.id==i),q}));
const o={nm:$("#nm").value.trim().replace(/</g,"&lt;"),zn:Z[$("#zn").value][0],sl:$("#sl").value,rf:$("#rf").value=="0"?"":R[$("#rf").value],tot:sub()+Z[$("#zn").value][1],u:it.reduce((a,x)=>a+x.q,0),it:it.map(x=>({id:x.p.id,q:x.q}))};
cart={};$("#nm").value="";drawCart();place(o)};

function demo(){if(P[0].s<1)return toast("Sin stock de la mesa ratona: reponga en Panel y QR > Inventario");place({nm:"Cliente de ejemplo",zn:Z[1][0],sl:slots[0],rf:"Mueblería A",tot:P[0].p+Z[1][1],u:1,it:[{id:1,q:1}]})}
function flow(o){const S=["Webhook: pedido "+o.id+" recibido desde la tienda","Validar y descontar stock: "+o.it.map(x=>{const p=P.find(q=>q.id==x.id);return p.n+" × "+x.q+" (quedan "+p.s+")"}).join(", ")+(o.it.some(x=>P.find(q=>q.id==x.id).s<=3)?" · alerta de stock bajo":""),"Avisar a producción y despacho","Confirmar al cliente por WhatsApp (ManyChat)","Agendar entrega: "+o.zn+" · "+o.sl,"Registrar en el panel de KPIs"+(o.rf?" y comisión para "+o.rf:"")];
$("#fl").innerHTML=S.map((s,i)=>`<div class="nd" id="n${i}"><i>${i+1}</i><span>${s}</span></div>`).join("");$("#wa").hidden=true;
S.forEach((_,i)=>setTimeout(()=>{$("#n"+i).classList.add("on");if(i==3){$("#wa").innerHTML="<small>Mensaje al cliente</small><br>Hola "+o.nm+", recibimos tu pedido "+o.id+" por "+money(o.tot)+". Entrega: "+o.sl+" ("+o.zn+"). Respondé este mensaje si necesitás cambiar la franja.";$("#wa").hidden=false}},600*(i+1)));
setTimeout(()=>{o.st="Despacho programado";panel()},600*7)}
function say(t,me){const d=document.createElement("div");d.className="b "+(me?"me":"bt");d.innerHTML=t;$("#ch").append(d);$("#ch").scrollTop=1e9}
const Q=[["catalogo","Ver catálogo"],["medidas","Medidas"],["envio","Costo de envío"],["pedido","Estado de mi pedido"],["humano","Hablar con una persona"]];
$("#qr").innerHTML=Q.map(([k,l])=>`<button class="chip" onclick="ask('${k}','${l}')">${l}</button>`).join("");
const ans={catalogo:()=>P.map(p=>`• ${p.n}: ${money(p.p)}`).join("<br>"),medidas:()=>P.map(p=>`• ${p.n}: ${p.m}`).join("<br>"),
envio:()=>Z.map(z=>`• ${z[0]}: ${z[1]?money(z[1]):"sin costo"}`).join("<br>")+"<br>Elegís fecha y franja al comprar.",
pedido:()=>{const o=orders[orders.length-1];return o?`Tu pedido ${o.id}: ${o.st}. Entrega: ${o.sl}.`:"Todavía no tenés pedidos. Podés hacerlo en la pestaña Tienda."},
humano:()=>{bot.h++;return "Te derivo con una persona del equipo. Te responden en horario comercial."}};
say("¡Hola! Soy el asistente de Fábrica a tu Casa. ¿En qué te ayudo?");
async function dl(i,v){if(!sb){orders[i].d=v;panel();return;}await sb.rpc("marcar_entrega",{p_id:orders[i]._id,p_estado:v});sync()}
async function rs(id){if(!sb){P.find(p=>p.id==id).s+=10;panel();shop();toast("Stock repuesto: +10 unidades");return;}await sb.rpc("reponer_stock",{p_id:id,p_cant:10});toast("Stock repuesto: +10 unidades");sync()}

function panel(){inv();const u=orders.reduce((a,o)=>a+o.u,0),sh=u/(u+90)*100,dn=orders.filter(o=>o.d=="ok").length,lt=orders.filter(o=>o.d=="late").length,ot=dn+lt?dn/(dn+lt)*100:null,rf=orders.filter(o=>o.rf);
const st=r=>r==null?["no","Sin datos"]:r>=1?["ok","En meta"]:["mid","En camino"];
const K=[["Venta directa",sh.toFixed(1)+"%",u?sh/10:null,"Meta: 10% de las unidades","Qué mide: qué parte de las unidades se vende sin pasar por un revendedor.","Cómo se calcula: unidades de la tienda ÷ (unidades de la tienda + 90 de base de revendedores)."],
["Entregas en fecha",ot==null?"—":ot.toFixed(0)+"%",ot==null?null:ot/90,"Meta: 90% en fecha y franja","Qué mide: si el pedido llega el día y en la franja prometidos.","Cómo se calcula: entregas en fecha ÷ entregas realizadas (marcalas en la tabla de pedidos)."],
["Respuesta rápida","< 1 min",bot.q?1:null,"Meta: menos de 5 minutos","Qué mide: cuánto espera el cliente una respuesta a su consulta.","Cómo se calcula: el asistente responde al instante. Consultas: "+bot.q+" · derivadas a una persona: "+bot.h+"."],
["Canal revendedores",rf.length+" referidos",rf.length?1:null,"Meta: caída máxima de 5% en sus ventas","Qué mide: si la venta directa convive con los revendedores sin quitarles ventas.","Cómo se calcula: pedidos que llegan con el QR de un revendedor (cobra comisión). Falta comparar sus ventas con su base."]];
$("#k").innerHTML=K.map(([a,b,r,m,w,x])=>{const s=st(r);return `<div class="kc ${s[0]}"><div class="kh"><small>${a}</small><span class="bd ${s[0]}">${s[1]}</span></div><div class="ring" style="--p:${r==null?0:Math.min(100,r*100)}"><strong>${b}</strong></div><small><b>${m}</b></small><details><summary>¿Qué mide?</summary><p class="kx">${w}</p><p class="kx">${x}</p></details></div>`}).join("");
$("#ot").innerHTML=orders.length?orders.map((o,i)=>`<tr><td>${o.id}</td><td>${o.nm}</td><td>${money(o.tot)}</td><td>${o.d=="ok"?"Entregado en fecha":o.d=="late"?"Entregado con demora":o.st}</td><td>${o.d?"":`<button class="mini" onclick="dl(${i},'ok')">En fecha</button> <button class="mini" onclick="dl(${i},'late')">Con demora</button>`}</td></tr>`).join(""):`<tr><td colspan="5"><small>Sin pedidos todavía.</small></td></tr>`;
$("#cm").innerHTML=R.slice(1).map(r=>{const f=rf.filter(o=>o.rf==r);return `<tr><td>${r}</td><td>${f.length}</td><td>${money(Math.round(f.reduce((a,o)=>a+o.tot,0)*.05))}</td></tr>`}).join("")}

function qrdraw(i){const n=21;let x=i*7+3,s=`<svg viewBox="0 0 ${n} ${n}" width="140" height="140" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#fff"/>`;
const f=(a,b)=>`<path fill="#2A1C10" d="M${a} ${b}h7v7h-7z"/><path fill="#fff" d="M${a+1} ${b+1}h5v5h-5z"/><path fill="#2A1C10" d="M${a+2} ${b+2}h3v3h-3z"/>`;s+=f(0,0)+f(14,0)+f(0,14);
for(let y=0;y<n;y++)for(let c=0;c<n;c++){if((c<8&&y<8)||(c>12&&y<8)||(c<8&&y>12))continue;x=(Math.imul(x,1103515245)+12345)&0x7fffffff;if(x%3==0)s+=`<rect x="${c}" y="${y}" width="1" height="1" fill="#2A1C10"/>`}return s+"</svg>"}
function qrshow(){const i=+$("#qs").value;$("#qi").innerHTML=qrdraw(i);$("#qu").textContent="tienda.ejemplo/r/"+R[i+1].toLowerCase().replace(/ /g,"-").normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
$("#qs").onchange=qrshow;qrshow();drawCart();panel();
$("#fab").onclick=()=>{$("#cw").hidden=!$("#cw").hidden;if(!$("#cw").hidden)$("#in").focus()};
$("#cx").onclick=()=>{$("#cw").hidden=true};
function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2400)}
function inv(){const lo=P.filter(p=>p.s<=3).length;$("#sa").textContent=lo?" · "+lo+" con stock bajo":"";$("#inv").innerHTML=P.map(p=>{const k=p.s<1?["low","Sin stock"]:p.s<=3?["mid","Stock bajo"]:["ok","Normal"];return `<tr><td>${p.n}</td><td><b>${p.s}</b> u.</td><td><span class="bd ${k[0]}">${k[1]}</span></td><td><button class="mini" onclick="rs(${p.id})">Reponer +10</button></td></tr>`}).join("")}
function mode(d){document.body.classList.toggle("dueno",d);$("#md").textContent=d?"Salir de la vista del dueño":"Ingresar como dueño";$("#cw").hidden=true;go(d?2:0)}
$("#md").onclick=()=>mode(!dueno());

/* ---- Integración: Supabase (datos) y n8n (chatbot y avisos de pedido) ---- */
const CFG=window.CONFIG||{},sb=(CFG.SUPABASE_URL&&CFG.SUPABASE_ANON_KEY&&window.supabase)?window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY):null;
const SID=window.crypto&&crypto.randomUUID?crypto.randomUUID():Date.now()+"-"+Math.random();
const esc=t=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\n/g,"<br>");

async function sync(){if(!sb)return;
try {
  const a=await sb.from("productos").select("*").order("id"),b=await sb.from("pedidos").select("*").order("id");
  if(a.error||b.error)return;
  P.length=0;a.data.forEach(r=>P.push({id:r.id,s:r.stock,i:r.imagen,n:r.nombre,p:Number(r.precio),m:r.medidas,w:r.madera,c:r.categoria,t:r.icono}));
  orders=b.data.map(r=>({_id:r.id,id:"MN-"+r.id,nm:r.cliente,zn:r.zona,sl:r.franja,rf:r.revendedor||"",tot:Number(r.total),u:r.unidades,st:r.estado,d:r.entrega||undefined,it:[]}));
  shop();panel();
} catch(e) {}
}

async function botReply(msg,k){
if(CFG.N8N_CHAT_WEBHOOK){try{const c=new AbortController(),t=setTimeout(()=>c.abort(),15000),o=orders[orders.length-1];
const r=await fetch(CFG.N8N_CHAT_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},signal:c.signal,body:JSON.stringify({sesionId:SID,mensaje:msg,pedidoId:o?o.id:null})});
clearTimeout(t);if(!r.ok)throw 0;const j=await r.json();if(j.derivada)bot.h++;if(j.respuesta)return esc(j.respuesta)}catch(e){}}
return k?ans[k]():"No te entendí del todo. Elegí una de las opciones de abajo."}
async function ask(k,l){bot.q++;say(l,1);say("<i>Escribiendo…</i>");const r=await botReply(l,k);$("#ch").lastChild.remove();say(r);panel()}
async function free(){const v=$("#in").value.trim();if(!v)return;$("#in").value="";
const k=/cat|mueble|precio/i.test(v)?"catalogo":/medida|tama/i.test(v)?"medidas":/env|entrega|flete/i.test(v)?"envio":/pedido|estado|segui/i.test(v)?"pedido":/persona|humano|asesor/i.test(v)?"humano":"";
bot.q++;say(v.replace(/</g,"&lt;"),1);say("<i>Escribiendo…</i>");const r=await botReply(v,k);$("#ch").lastChild.remove();say(r);panel()}
sync();
-- Esquema para Maderas del Norte (tienda online + chatbot n8n). Ejecutar completo en Supabase > SQL Editor.
-- ATENCIÓN: borra y vuelve a crear estas tablas (sirve también si ya corriste una versión anterior).
drop function if exists crear_pedido(text, text, text, text, text, jsonb);
drop function if exists crear_pedido(text, text, text, text, jsonb);
drop table if exists mensajes_chat, pedido_items, pedidos, revendedores, zonas, productos cascade;

-- ========== TABLAS ==========
create table productos (
  id bigint generated always as identity primary key,
  nombre text not null,
  precio numeric(12,2) not null check (precio >= 0),
  stock integer not null default 0 check (stock >= 0),
  imagen text,
  medidas text,
  madera text check (madera in ('pino','eucalipto')),
  categoria text,
  icono integer not null default 0,
  created_at timestamptz default now()
);

create table zonas (
  nombre text primary key,
  costo numeric(12,2) not null default 0
);

create table revendedores (
  nombre text primary key,
  comision numeric(4,3) not null default 0.05
);

create table pedidos (
  id bigint generated always as identity (start with 1001) primary key,
  cliente text not null,
  zona text not null references zonas(nombre),
  franja text not null,
  revendedor text references revendedores(nombre),
  total numeric(12,2) not null default 0,
  unidades integer not null default 0,
  estado text not null default 'Pedido recibido',
  entrega text check (entrega in ('ok','late')),   -- null = aún sin marcar
  created_at timestamptz default now()
);

create table pedido_items (
  id bigint generated always as identity primary key,
  pedido_id bigint not null references pedidos(id) on delete cascade,
  producto_id bigint not null references productos(id),
  cantidad integer not null check (cantidad > 0),
  precio_unitario numeric(12,2) not null
);

create table mensajes_chat (
  id bigint generated always as identity primary key,
  sesion_id text not null,
  rol text not null check (rol in ('usuario','bot')),
  contenido text not null,
  derivada boolean not null default false,
  created_at timestamptz default now()
);

-- ========== DATOS INICIALES (los ids salen 1 a 20 en este orden) ==========
insert into productos (nombre, precio, stock, imagen, medidas, madera, categoria, icono) values
  ('Mesa ratona de pino', 38000, 12, 'img/mesa-ratona.jpg', '90 × 50 × 45 cm', 'pino', 'Living', 0),
  ('Silla de eucalipto', 24000, 30, 'img/silla-eucalipto.jpg', '45 × 50 × 90 cm', 'eucalipto', 'Comedor', 1),
  ('Estante de 5 repisas', 52000, 8, 'img/estante-5-repisas.jpg', '80 × 30 × 180 cm', 'pino', 'Living', 2),
  ('Cama de 1½ plaza', 98000, 5, 'img/cama-1-plaza-y-media.jpg', '190 × 100 × 40 cm', 'pino', 'Dormitorio', 3),
  ('Mesa de comedor (6 personas)', 145000, 4, 'img/mesa-comedor.jpg', '160 × 80 × 75 cm', 'eucalipto', 'Comedor', 4),
  ('Mesa de luz', 29000, 15, 'img/mesa-de-luz.jpg', '40 × 35 × 50 cm', 'pino', 'Dormitorio', 5),
  ('Biblioteca de 3 cuerpos', 95000, 6, 'img/biblioteca-3-cuerpos.jpg', '120 × 30 × 180 cm', 'pino', 'Living', 2),
  ('Rack para TV', 68000, 7, 'img/rack-tv.jpg', '140 × 40 × 55 cm', 'pino', 'Living', 4),
  ('Mesa ratona de eucalipto', 46000, 9, 'img/mesa-ratona-eucalipto.jpg', '100 × 55 × 42 cm', 'eucalipto', 'Living', 0),
  ('Banco de eucalipto', 31000, 14, 'img/banco-eucalipto.jpg', '120 × 35 × 45 cm', 'eucalipto', 'Comedor', 1),
  ('Mesa de comedor (4 personas)', 98000, 6, 'img/mesa-comedor-4.jpg', '120 × 75 × 75 cm', 'pino', 'Comedor', 4),
  ('Aparador', 132000, 3, 'img/aparador.jpg', '150 × 40 × 85 cm', 'eucalipto', 'Comedor', 5),
  ('Cama de 2 plazas', 128000, 4, 'img/cama-2-plazas.jpg', '200 × 150 × 40 cm', 'pino', 'Dormitorio', 3),
  ('Cama cucheta', 165000, 3, 'img/cama-cucheta.jpg', '200 × 90 × 160 cm', 'pino', 'Dormitorio', 3),
  ('Cajonera de 4 cajones', 74000, 6, 'img/cajonera-4.jpg', '70 × 40 × 100 cm', 'pino', 'Dormitorio', 5),
  ('Placard de 2 puertas', 189000, 2, 'img/placard-2-puertas.jpg', '120 × 50 × 180 cm', 'pino', 'Dormitorio', 2),
  ('Escritorio de pino', 72000, 8, 'img/escritorio.jpg', '120 × 60 × 75 cm', 'pino', 'Oficina', 4),
  ('Silla de escritorio', 39000, 10, 'img/silla-escritorio.jpg', '45 × 50 × 85 cm', 'eucalipto', 'Oficina', 1),
  ('Mesa de jardín de eucalipto', 118000, 5, 'img/mesa-jardin.jpg', '150 × 80 × 75 cm', 'eucalipto', 'Exterior', 4),
  ('Reposera de eucalipto', 47000, 12, 'img/reposera.jpg', '60 × 140 × 90 cm', 'eucalipto', 'Exterior', 1);

insert into zonas (nombre, costo) values
  ('Retiro en fábrica', 0),
  ('Zona 1 · cerca de la planta', 6000),
  ('Zona 2', 12000),
  ('Zona 3', 20000);

insert into revendedores (nombre, comision) values
  ('Mueblería A', 0.05),
  ('Mueblería B', 0.05),
  ('Mueblería C', 0.05);

-- ========== FUNCIONES ==========
-- Crear pedido y descontar stock en un solo paso. Si no alcanza el stock, falla todo y no se guarda nada.
-- p_items ejemplo: [{"producto_id":1,"cantidad":2},{"producto_id":3,"cantidad":1}]
create or replace function crear_pedido(
  p_cliente text,
  p_zona text,
  p_franja text,
  p_revendedor text,
  p_items jsonb
) returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pedido bigint;
  v_item jsonb;
  v_cant integer;
  v_precio numeric;
  v_costo_zona numeric;
  v_total numeric := 0;
  v_unidades integer := 0;
begin
  select costo into v_costo_zona from zonas where nombre = p_zona;
  if v_costo_zona is null then
    raise exception 'Zona inválida';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'El pedido no tiene productos';
  end if;

  insert into pedidos (cliente, zona, franja, revendedor)
  values (left(trim(p_cliente), 120), p_zona, p_franja, nullif(p_revendedor, ''))
  returning id into v_pedido;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_cant := (v_item->>'cantidad')::integer;
    if v_cant is null or v_cant < 1 then
      raise exception 'Cantidad inválida';
    end if;

    update productos
       set stock = stock - v_cant
     where id = (v_item->>'producto_id')::bigint
    returning precio into v_precio;

    if v_precio is null then
      raise exception 'Producto inválido';
    end if;

    insert into pedido_items (pedido_id, producto_id, cantidad, precio_unitario)
    values (v_pedido, (v_item->>'producto_id')::bigint, v_cant, v_precio);

    v_total := v_total + v_precio * v_cant;
    v_unidades := v_unidades + v_cant;
  end loop;

  update pedidos
     set total = v_total + v_costo_zona,
         unidades = v_unidades
   where id = v_pedido;

  return v_pedido;
end;
$$;

-- Panel del dueño (demo: sin login)
create or replace function reponer_stock(p_id bigint, p_cant integer default 10)
returns void language sql security definer set search_path = public as $$
  update productos set stock = stock + least(greatest(p_cant, 0), 100) where id = p_id;
$$;

create or replace function marcar_entrega(p_id bigint, p_estado text)
returns void language sql security definer set search_path = public as $$
  update pedidos
     set entrega = p_estado,
         estado = case p_estado when 'ok' then 'Entregado en fecha' else 'Entregado con demora' end
   where id = p_id and p_estado in ('ok','late');
$$;

-- ========== SEGURIDAD (RLS) ==========
alter table productos enable row level security;
alter table zonas enable row level security;
alter table revendedores enable row level security;
alter table pedidos enable row level security;
alter table pedido_items enable row level security;
alter table mensajes_chat enable row level security;

create policy "lectura publica productos" on productos for select to anon, authenticated using (true);
create policy "lectura publica zonas" on zonas for select to anon, authenticated using (true);
create policy "lectura publica revendedores" on revendedores for select to anon, authenticated using (true);

-- SOLO PARA LA DEMO: la vista del dueño lee pedidos con la clave anon (expone nombres de clientes).
-- Para algo real, usar Supabase Auth.
create policy "demo lectura pedidos" on pedidos for select to anon, authenticated using (true);
create policy "demo lectura items" on pedido_items for select to anon, authenticated using (true);

-- mensajes_chat no tiene políticas: el front no puede leerla ni escribirla.
-- n8n la usa con su credencial de Supabase (clave service_role, guardada solo dentro de n8n).

-- El front no escribe directo en las tablas: solo ejecuta estas funciones.
revoke execute on function crear_pedido(text, text, text, text, jsonb) from public;
revoke execute on function reponer_stock(bigint, integer) from public;
revoke execute on function marcar_entrega(bigint, text) from public;
grant execute on function crear_pedido(text, text, text, text, jsonb) to anon, authenticated;
grant execute on function reponer_stock(bigint, integer) to anon, authenticated;
grant execute on function marcar_entrega(bigint, text) to anon, authenticated;

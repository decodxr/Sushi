-- DADOS DEMONSTRATIVOS. Substitua preços, descrições e imagens pelo catálogo oficial.
insert into public.categories(id,name,slug,description,display_order,is_active) values
('10000000-0000-4000-8000-000000000001','Destaques','destaques','Os mais pedidos da casa',1,true),
('10000000-0000-4000-8000-000000000002','Combinados','combinados','Combinações para toda fome',2,true),
('10000000-0000-4000-8000-000000000003','Hot Rolls','hot','Crocantes e feitos na hora',3,true),
('10000000-0000-4000-8000-000000000004','Temakis','temakis','Cones preparados na hora',4,true),
('10000000-0000-4000-8000-000000000005','Pokes','pokes','Bowls frescos e completos',5,true)
on conflict(id) do update set name=excluded.name;
insert into public.products(id,category_id,name,slug,description,price,promotional_price,is_available,is_featured,badge,display_order) values
('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000002','Tokyo 32','tokyo-32','8 uramaki salmão, 8 hot roll, 8 joe e 8 sashimis.',89.90,79.90,true,true,'MAIS PEDIDO',1),
('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000003','Salmão Crunch','salmao-crunch','Hot roll crocante, salmão, cream cheese e tarê.',44.90,null,true,true,'CROCANTE',2),
('20000000-0000-4000-8000-000000000003','10000000-0000-4000-8000-000000000005','Salmon Spicy','salmon-spicy','Salmão fresco, arroz, manga, sunomono, crispy e molho spicy.',49.90,null,true,true,'PICANTE',3)
on conflict(id) do update set price=excluded.price;
insert into public.product_options(id,product_id,name,required,min_selections,max_selections,display_order) values('30000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000002','Escolha o molho',true,1,1,1),('30000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','Extras',false,0,3,2) on conflict(id) do nothing;
insert into public.product_option_items(id,option_id,name,price_modifier,is_available,display_order) values('40000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001','Tarê',0,true,1),('40000000-0000-4000-8000-000000000002','30000000-0000-4000-8000-000000000001','Spicy',0,true,2),('40000000-0000-4000-8000-000000000003','30000000-0000-4000-8000-000000000001','Sem molho',0,true,3),('40000000-0000-4000-8000-000000000004','30000000-0000-4000-8000-000000000002','Cream cheese',3,true,1),('40000000-0000-4000-8000-000000000005','30000000-0000-4000-8000-000000000002','Salmão extra',8,true,2) on conflict(id) do nothing;
insert into public.delivery_zones(id,name,fee,minimum_order,is_active) values('50000000-0000-4000-8000-000000000001','Centro',5,25,true),('50000000-0000-4000-8000-000000000002','Parigot de Souza',4,25,true),('50000000-0000-4000-8000-000000000003','Lar Paraná',7,30,true) on conflict(id) do update set fee=excluded.fee;
insert into public.business_hours(day_of_week,open_time,close_time,is_closed) select day,'18:30','23:00',false from generate_series(0,6) day on conflict(day_of_week) do update set open_time=excluded.open_time,close_time=excluded.close_time;
insert into public.site_settings(key,value) values('accept_orders_when_closed','false'::jsonb),('restaurant','{"name":"Sushi em Casa Express","city":"Campo Mourão","timezone":"America/Sao_Paulo"}'::jsonb) on conflict(key) do update set value=excluded.value;

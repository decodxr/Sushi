# Configuração do Supabase

## 1. Projeto e variáveis

1. Crie um projeto em [Supabase](https://supabase.com/dashboard) na região mais próxima do Paraná.
2. Em **Settings → API**, copie Project URL, anon key e service role.
3. Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

A service role existe somente no servidor e nunca deve usar o prefixo `NEXT_PUBLIC_`, ser commitada ou enviada ao navegador.

## 2. Banco e seed

Com a Supabase CLI autenticada:

```bash
supabase link --project-ref SEU_PROJECT_REF
supabase db push
psql "$DATABASE_URL" -f supabase/seed.sql
```

Ou execute, na ordem, `supabase/migrations/001_initial.sql`, `002_production_ordering.sql` e então `supabase/seed.sql` no SQL Editor. O seed é demonstrativo e está marcado como tal.

A migration cria tabelas, índices, RLS, publicação Realtime, tracking público por UUID opaco e o bucket `product-images`. Confirme em **Database → Replication** que `orders` e `order_tracking` estão na publicação `supabase_realtime`.

## 3. Storage

A migration cria `product-images`, público para leitura e limitado a 5 MB. Upload, substituição e exclusão exigem usuário autenticado presente em `admin_profiles`. Tipos aceitos: JPEG, PNG, WebP e AVIF. Não altere o bucket para permitir escrita anônima.

## 4. Primeiro administrador

1. Em **Authentication → Users**, crie o usuário com e-mail e senha forte.
2. Copie o UUID e execute no SQL Editor:

```sql
insert into public.admin_profiles (id, role)
values ('UUID_DO_AUTH_USER', 'owner');
```

Papéis válidos: `owner`, `manager`, `staff`. O middleware protege `/admin/*` e APIs administrativas repetem a autorização no servidor. A presença no frontend nunca concede privilégios.

## 5. Segurança e pedidos

O endpoint `POST /api/orders` recebe apenas IDs, quantidades e dados do cliente. Produtos, disponibilidade, opções, cupom, entrega e todos os preços são novamente consultados e calculados no servidor com a service role. `idempotency_key` impede pedido duplicado. Clientes não têm políticas para alterar preços ou pedidos existentes.

Antes da produção, revise políticas no Policy Advisor, habilite proteção contra senhas vazadas, configure SMTP e mantenha os secrets exclusivamente no provedor de deploy.

## 6. Desenvolvimento

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

Sem credenciais, a vitrine usa o catálogo demonstrativo local; checkout e admin exigem Supabase. Com credenciais, homepage e cardápio consultam dados reais e revalidam a cada 60 segundos.

## 7. Produção

1. Configure todas as variáveis no projeto Vercel, separadas por ambiente.
2. Defina `NEXT_PUBLIC_SITE_URL` com HTTPS e o número/PIX oficiais.
3. Troque o seed e placeholders por fotos próprias via `/admin/produtos`.
4. Teste entrega, retirada, horários, cupons e os sete status em staging.
5. Faça backup, aplique migrations e somente então publique o frontend.

### Encaminhamento de pedidos

`ORDER_FORWARDING_MODE` aceita `whatsapp`, `external`, `both` ou `none`. O modo padrão é `whatsapp`. O número é lido primeiro de `site_settings.restaurant.whatsapp` e usa a configuração central do restaurante apenas como fallback. O adaptador externo permanece desativado até existirem URL, autenticação e contrato reais do sistema do restaurante; nenhum pagamento é capturado pelo site.

# Sushi em Casa Express

Loja mobile-first e painel operacional para delivery em Campo Mourão. A direção visual **Tokyo After Hours / Editorial Delivery** alterna papel quente, carvão e vermelho, com interface direta de pedido.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind, Zustand persist, Zod, React Hook Form, Framer Motion, Lucide e Supabase (Postgres/Auth/Storage/Realtime).

## Instalação

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`, `/cardapio`, `/checkout`, `/acompanhar` e `/admin`.

## Configuração

- Dados comerciais e horários: `data/restaurant.ts`.
- Catálogo inicial demonstrativo: `data/menu.ts` (substituir por conteúdo e fotos reais antes do lançamento).
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número internacional, apenas dígitos.
- `NEXT_PUBLIC_PIX_KEY`: chave do estabelecimento.
- `NEXT_PUBLIC_SITE_URL`: URL canônica.
- Credenciais Supabase: URL, anon key e service role (esta última **somente no servidor**).

## Supabase

1. Crie um projeto no Supabase.
2. Execute `supabase/migrations/001_initial.sql` pelo CLI ou SQL Editor.
3. Crie um bucket público `product-images`, restrinja uploads a admins e configure as variáveis.
4. Crie o primeiro usuário no Auth e, usando o SQL Editor seguro, insira seu perfil em `public.users` com `role = 'admin'`.

O papel administrativo reside no banco e é consultado por `is_admin()`; nunca deve ser inferido no cliente. A migration inclui UUIDs, constraints, índices e RLS. Para produção, mova pedidos do fallback de WhatsApp para uma Server Action/Route Handler com validação Zod e service role server-only.

## Pedido e operação

Sem gateway, o checkout valida os dados, calcula taxa/desconto, persiste o identificador recente e abre uma mensagem completa no WhatsApp. O cupom demonstrativo é `JAPA10`. Taxas por bairro ficam centralizadas na configuração. O admin é uma interface operacional pronta para conexão às subscriptions Realtime.

## PWA, SEO e analytics

Manifest, service worker/offline, sitemap, robots, metadados sociais e JSON-LD estão incluídos. Configure `NEXT_PUBLIC_ANALYTICS_ID` e injete o provedor desejado em `app/layout.tsx` respeitando consentimento LGPD. O ícone SVG é temporário; troque pelos assets finais 192/512px antes da publicação.

## Qualidade e deploy

```bash
npm run lint
npm run typecheck
npm run build
```

Deploy recomendado: Vercel conectado ao repositório. Cadastre as variáveis de ambiente, defina o domínio em `NEXT_PUBLIC_SITE_URL` e faça o deploy. Revise catálogo, preços, WhatsApp, PIX, horários, zonas de entrega e fotografia proprietária antes de abrir pedidos.

## Backend operacional

As instruções completas de banco, Storage, primeiro administrador, RLS e deploy estão em [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md). O catálogo usa Supabase quando configurado e fallback demonstrativo somente em desenvolvimento. O checkout envia apenas IDs ao endpoint seguro; preços, adicionais, cupom e entrega são recalculados no servidor antes de persistir o pedido.

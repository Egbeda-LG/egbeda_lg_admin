# Egbeda Admin

Next.js admin console for managing Egbeda Local Government website content.

## Local setup

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

The app runs at [http://localhost:6000](http://localhost:6000).

## API setup

`NEXT_PUBLIC_API_BASE_URL` is the backend host. API requests use the documented
`/api/v1` prefix and attach the admin bearer token automatically.

```env
NEXT_PUBLIC_API_BASE_URL=https://egbeda-api-dev.jumpingcrab.com
```

The API integration follows this flow:

```text
component -> feature hook -> feature service -> typed endpoint -> Axios
```

- `providers/` owns the React Query client and `react-hot-toast` renderer.
- `lib/api/` owns Axios, auth headers, error normalization, session storage,
  interceptors, documented types, and endpoint functions.
- `features/` owns each domain end to end - data access, derivations and UI.
- `components/` owns cross-domain UI: `ui/` primitives and `layout/` shells.
- `app/` only maps routes to a feature page component (plus a Suspense
  boundary where the page reads search params).

Every feature module follows the same layout:

```text
features/<domain>/
  <domain>.repository.ts    HTTP calls for the resource
  <domain>.hooks.ts         React Query hooks
  <domain>.form.ts          zod schema, defaults and option lists
  <domain>.transformers.ts  form values <-> API payload
  <domain>.utils.ts         row/view-model mapping, filtering, formatting
  components/               the pages and pieces that render the domain
```

Components stay presentational: no inline mapping, filtering or formatting -
that work belongs in `<domain>.utils.ts` or `<domain>.transformers.ts`.

Endpoint types and payloads are based on the [Egbeda LG Backend API Postman documentation](https://documenter.getpostman.com/view/19618541/2sBYAsxBfV).

## Checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

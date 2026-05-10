# EVA2 DESAWEB II - API de Notas

API REST construida con TypeScript, Hono, Prisma 7, Zod 4, Docker y PostgreSQL.

## Arquitectura

El proyecto sigue N-Layer sin capa de servicios porque el dominio es pequeño:

```text
routes -> controllers -> repositories -> PostgreSQL via Prisma
schemas -> contratos Zod y tipos de entrada
lib -> utilidades compartidas
```

Reglas usadas:

- estilo funcional, sin clases;
- los controllers no importan Prisma;
- cada repository define su interfaz TypeScript en el mismo archivo;
- Prisma 7 usa `prisma-client`, `PrismaPg` adapter y cliente generado en `generated/client`;
- los imports locales usan extensión `.js` por `moduleResolution: NodeNext`.

## Endpoints

```text
GET    /notes
GET    /notes/:id
POST   /notes
PATCH  /notes/:id
DELETE /notes/:id
POST   /notes/:id/tags
DELETE /notes/:id/tags/:tagId

GET    /categories
GET    /categories/:id
POST   /categories
PATCH  /categories/:id
DELETE /categories/:id

GET    /tags
GET    /tags/:id
POST   /tags
PATCH  /tags/:id
DELETE /tags/:id
```

## Puesta en marcha

```bash
yarn install
copy .env.example .env
docker compose up -d
yarn prisma generate
yarn prisma migrate dev --name init
yarn dev
```

La API queda en `http://localhost:3000`.

## Ejemplos

```bash
curl -X POST http://localhost:3000/categories ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Estudio\"}"

curl -X POST http://localhost:3000/tags ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"typescript\"}"

curl -X POST http://localhost:3000/notes ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Mi nota\",\"content\":\"Contenido\",\"categoryId\":1}"

curl -X POST http://localhost:3000/notes/1/tags ^
  -H "Content-Type: application/json" ^
  -d "{\"tagId\":1}"
```

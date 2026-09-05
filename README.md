# UNIT - Site officiel

Depot du site officiel UNIT, avec l'API officielle et le portail de jeu connecte.

## Applications

- `src/` : frontend officiel React.
- `backend/` : API officielle NestJS + Prisma.
- `prototype-master-claude/client/` : client du jeu Next.js.
- `prototype-master-claude/server/` : serveur du jeu NestJS/WebSocket.

## Ports locaux

- `4100` : site officiel.
- `4101` : API officielle.
- `4104` : PostgreSQL local via Docker.
- `4107` : serveur du jeu.
- `4108` : client du jeu.

## Demarrage local

```bash
npm install
npm run dev:web
```

API officielle :

```bash
cd backend
npm install
npm run start:dev
```

Portail jeu :

```bash
cd prototype-master-claude/server
npm install
npm run start:dev
```

```bash
cd prototype-master-claude/client
npm install
npm run dev
```

## Build

```bash
npm run build:web
npm run build:api
npm run build:game:client
npm run build:game:server
```

## Documentation

- [Structure du projet](docs/PROJECT_STRUCTURE.md)
- [Deploiement AWS](docs/deployment/AWS.md)
- [Compose AWS exemple](infra/aws/docker-compose.aws.example.yml)

## Environnements

Copier les exemples avant configuration :

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp prototype-master-claude/client/.env.example prototype-master-claude/client/.env
cp prototype-master-claude/server/.env.example prototype-master-claude/server/.env
```

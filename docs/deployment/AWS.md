# Deploiement AWS

## Services de l'application

Le projet final contient quatre services applicatifs :

```text
Site officiel React       port 4100 en local, servi en prod via Nginx/CloudFront
API officielle NestJS     port 4101
Client jeu Next.js        port 4108
Serveur jeu NestJS        port 4107
PostgreSQL                idealement via RDS en production
```

## Variables a configurer

Site officiel :

```bash
REACT_APP_API_URL=https://api.ton-domaine.com
REACT_APP_GAME_PORTAL_URL=https://game.ton-domaine.com
```

API officielle :

```bash
NODE_ENV=production
PORT=4101
HOST=0.0.0.0
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/unit_game
JWT_SECRET=une_valeur_longue_et_secrete
```

Client jeu :

```bash
NEXT_PUBLIC_API_URL=https://game-api.ton-domaine.com
```

Serveur jeu :

```bash
NODE_ENV=production
PORT=4107
ALLOWED_ORIGIN=https://game.ton-domaine.com
```

## Chemin recommande pour AWS

1. Utiliser RDS PostgreSQL pour la base officielle.
2. Heberger le site officiel React via S3 + CloudFront, ou via l'image Docker Nginx.
3. Heberger l'API officielle sur ECS/Fargate, EC2, ou Elastic Beanstalk.
4. Heberger le client jeu Next.js et le serveur jeu sur deux services separes.
5. Mettre les domaines suivants :

```text
www.ton-domaine.com       site officiel
api.ton-domaine.com       API officielle
game.ton-domaine.com      client jeu
game-api.ton-domaine.com  serveur jeu
```

## Verification avant livraison

```bash
npm run build:web
npm run build:api
npm run build:game:client
npm run build:game:server
```

Puis verifier que les `.env` de production ne pointent plus vers `localhost`.

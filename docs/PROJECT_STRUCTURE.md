# Structure du projet UNIT

Ce depot regroupe le site officiel, son API, et le prototype de jeu connecte depuis le site principal.

```text
.
├── src/                         # Frontend officiel React
│   ├── components/              # Composants UI reutilisables
│   ├── config/                  # URLs API et portail jeu
│   ├── contexts/                # Auth, langue, settings
│   ├── hooks/                   # Hooks React partages
│   ├── i18n/                    # Traductions et langues
│   ├── pages/                   # Pages du site officiel
│   ├── services/                # Clients API/services
│   ├── styles/                  # Themes globaux
│   └── types/                   # Types TypeScript
├── public/                      # Assets publics servis par React
├── backend/                     # API officielle NestJS + Prisma
│   ├── prisma/                  # Schema, migrations, seed
│   └── src/                     # Code API officielle
├── prototype-master-claude/     # Portail jeu connecte
│   ├── client/                  # Client jeu Next.js
│   ├── server/                  # Serveur jeu NestJS/WebSocket
│   └── rl_agent/                # Agent IA / experimentation
├── docs/                        # Documentation projet
│   ├── deployment/              # Guides de mise en production
│   ├── product-design/          # Cahier des charges et references design
│   └── reference-assets/        # Images de reference non servies en prod
├── infra/                       # Exemples et fichiers d'infrastructure
│   └── aws/                     # Notes et compose exemple pour AWS
├── Dockerfile                   # Image frontend officiel
├── docker-compose.yml           # Stack locale officielle
└── nginx.conf                   # Nginx frontend officiel
```

## Ports locaux

```text
4100  Site officiel React
4101  API officielle NestJS
4104  PostgreSQL expose en local
4107  Serveur du jeu prototype
4108  Client du jeu prototype
```

## Regle de rangement

- Le code applicatif reste dans `src/`, `backend/`, et `prototype-master-claude/`.
- Les documents projet vont dans `docs/`.
- Les fichiers AWS, Docker de reference et notes d'infra vont dans `infra/`.
- Les secrets restent uniquement dans les fichiers `.env` locaux et ne doivent pas etre commites.

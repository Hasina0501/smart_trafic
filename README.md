# 🚦 SmartTraffic - Backend API

Un système de gestion complet avec authentification sécurisée, gestion de candidats, offres d'emploi et système de tests interactifs.

---

## 📋 Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Technologies utilisées](#technologies-utilisées)
- [Base de données](#base-de-données)

---

## 🚀 Installation

### Prérequis

- **Node.js** (v14 ou supérieur)
- **npm** (v6 ou supérieur)
- **PostgreSQL** (pour la base de données)

### Étapes

1. **Cloner le projet**
```bash
cd smartTraffic
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
Créer un fichier `.env` à la racine du projet :
```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/smarttraffic"

# JWT
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Serveur
PORT=3000
NODE_ENV=development
```

---

## ⚙️ Configuration

### Base de données

1. **Créer la base de données**
```bash
npm run prisma:migrate:dev
```

2. **Visualiser et gérer la BD**
```bash
npm run prisma:studio
```

3. **Générer le client Prisma**
```bash
npm run prisma:generate
```

4. **Seeding (Données initiales)**
```bash
npm run prisma:seed
```

---

## 🎯 Démarrage

### Mode développement (avec auto-reload)
```bash
npm run dev
```
*L'application démarre sur http://localhost:3000*

### Mode production
```bash
npm start
```

---

## 📂 Structure du projet

```
smartTraffic/
├── src/
│   ├── app.js                    # Configuration Express
│   ├── server.js                 # Point d'entrée du serveur
│   ├── prisma.js                 # Instance Prisma
│   │
│   ├── config/
│   │   ├── prisma.js            # Config Prisma
│   │   ├── mailer.js            # Config email
│   │   └── swagger.js           # Config API docs
│   │
│   ├── controllers/              # Logique métier
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── captcha.controller.js
│   │   └── mail.controller.js
│   │
│   ├── routes/                   # Endpoints API
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── offer.routes.js
│   │   └── test.routes.js
│   │
│   ├── middlewares/              # Middlewares Express
│   │   ├── authenticates.js      # JWT verification
│   │   ├── authorize.js          # Role-based auth
│   │   └── *.middleware.js       # Validations
│   │
│   ├── services/                 # Services métier
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── token.service.js
│   │   └── mail.service.js
│   │
│   └── utils/
│       ├── asyncHandler.js       # Gestion d'erreurs
│       └── response.js           # Format réponses
│
├── prisma/
│   ├── schema.prisma             # Modèle de données
│   ├── seed.js                   # Données initiales
│   └── migrations/               # Historique migrations
│
├── package.json                  # Dépendances
└── .env                          # Variables d'environnement
```

---

## 📡 API Endpoints

### 🔐 Authentification (`/api/auth`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/register` | Créer un compte utilisateur |
| POST | `/login` | Connexion utilisateur |
| POST | `/refresh-token` | Obtenir un nouveau JWT |
| POST | `/verify-email` | Vérifier email |
| POST | `/logout` | Déconnexion |

### 👤 Utilisateurs (`/api/user`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/profile` | Récupérer mon profil |
| PUT | `/profile` | Mettre à jour mon profil |
| DELETE | `/account` | Supprimer mon compte |

### 📋 Candidats (`/api/candidate`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Lister tous les candidats |
| GET | `/:id` | Détails d'un candidat |
| POST | `/` | Créer un candidat |
| PUT | `/:id` | Modifier un candidat |
| DELETE | `/:id` | Supprimer un candidat |

### 💼 Offres d'emploi (`/api/offer`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Lister toutes les offres |
| GET | `/:id` | Détails d'une offre |
| POST | `/` | Créer une offre |
| PUT | `/:id` | Modifier une offre |
| DELETE | `/:id` | Supprimer une offre |

### 📝 Tests (`/api/test`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Lister les tests |
| POST | `/` | Créer un test |
| POST | `/submit` | Soumettre les réponses |

### 🔒 Captcha (`/api/captcha`)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/generate` | Générer un captcha |
| POST | `/verify` | Vérifier un captcha |

---

## 🛠 Technologies utilisées

| Technologie | Utilisation |
|-------------|-----------|
| **Express.js** | Framework web |
| **Prisma** | ORM pour PostgreSQL |
| **PostgreSQL** | Base de données relationnelle |
| **JWT (jsonwebtoken)** | Authentification |
| **Bcrypt** | Hachage de mots de passe |
| **Nodemailer** | Envoi d'emails |
| **SVG Captcha** | Système anti-bot |
| **Swagger/OpenAPI** | Documentation API |
| **CORS** | Gestion des requêtes cross-origin |
| **Dotenv** | Gestion des variables d'environnement |
| **Joi** | Validation des données |
| **Nodemon** | Rechargement automatique (dev) |

---

## 🗄️ Base de données

### Modèles principaux

#### **User**
```
├── id (PK)
├── username (unique)
├── email (unique)
├── password (hashé)
├── role (admin | public)
├── isVerified (Boolean)
├── refreshTokens (Relation)
├── createdAt
└── updatedAt
```

#### **RefreshToken**
```
├── id (PK)
├── token (unique)
├── expiresAt
├── revoked
├── userId (FK)
└── createdAt
```

### Commandes Prisma utiles

```bash
# Créer une migration
npm run prisma:migrate:dev -- --name description

# Déployer les migrations en production
npm run prisma:migrate:deploy

# Générer le client Prisma
npm run prisma:generate

# Ouvrir l'interface visuelle
npm run prisma:studio

# Seeder la base de données
npm run prisma:seed
```

---

## 🔐 Sécurité

✅ **Authentification JWT** - Tokens sécurisés avec expiration
✅ **Refresh Tokens** - Rotation de tokens pour sécurité accrue
✅ **Hachage Bcrypt** - Mots de passe sécurisés
✅ **CORS** - Protection cross-origin
✅ **Rate Limiting** - Protection contre les attaques
✅ **Validation Joi** - Validation des données entrantes
✅ **Email Verification** - Vérification de l'adresse email
✅ **Captcha** - Protection anti-bot

---

## 📚 Documentation API

Une documentation interactive Swagger est disponible à :
```
http://localhost:3000/api-docs
```

---

## 🐛 Dépannage

### Erreur de connexion BD
```bash
# Vérifier DATABASE_URL dans .env
# Assurer que PostgreSQL est en cours d'exécution
# Vérifier les credentials
```

### Migrations en conflit
```bash
# Réinitialiser les migrations
npm run prisma:migrate:dev -- --skip-generate
```

### Port déjà utilisé
```bash
# Changer le port dans .env
PORT=3001
```

---

## 📝 Licence

ISC

---

## 👥 Support

Pour toute question ou problème, veuillez créer une issue ou contacter l'équipe de développement.

**Happy Coding! 🚀**

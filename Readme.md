# 📝 TodoList Frontend

Interface web de la TodoList (React + Vite).
Ce projet communique avec le backend Express (`todolist-backend`) pour gérer les tâches.

---

## 🚀 Fonctionnalités

* Affichage de la liste des tâches
* Ajout d’une nouvelle tâche
* Marquage d’une tâche comme terminée
* Suppression d’une tâche
* Connexion automatique au backend selon l’environnement (local ou production)

---

## ⚙️ Installation

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/wololobzh/todolist-frontend.git
cd todolist-frontend
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

---

## 💻 Mode développement

### 1️⃣ Lancer le backend

Assure-toi que ton backend tourne localement sur le port **4000** :

```bash
cd ../todolist-backend
npm run dev
```

### 2️⃣ Lancer le frontend

Dans un autre terminal :

```bash
cd ../todolist-frontend
npm run dev
```

➡️ L’application sera disponible sur [http://localhost:5173](http://localhost:5173)

Le frontend détecte automatiquement si tu es en local ou en production :

* En **local** → il appelle `http://localhost:4000/api/todos`
* En **production** → il appelle `/api/todos` (via Nginx reverse proxy)

---

## 🧩 Configuration API

Le fichier `src/services/api.js` gère la connexion au backend :

```js
import axios from "axios";

const isLocal = window.location.hostname === "localhost";

export const api = axios.create({
  baseURL: isLocal
    ? "http://localhost:4000/api/todos"  // 💻 Dev local
    : "/api/todos"                      // 🚀 Prod via Nginx
});
```

Possiblité d'utiliser des variables d’environnement :

1. Crée un fichier `.env` à la racine :

   ```
   VITE_API_URL=http://localhost:4000/api/todos
   ```
2. Et dans `api.js` :

   ```js
   export const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || "/api/todos"
   });
   ```

---

## 🧱 Structure du projet

```
todolist-frontend/
├── src/
│   ├── App.jsx              # Composant principal
│   ├── components/
│   │   └── TodoList.jsx     # Gestion de la liste des tâches
│   └── services/
│       └── api.js           # Connexion au backend via Axios
├── package.json
├── vite.config.js
└── Dockerfile               # Build + serveur Nginx pour la prod
```

---

## 🐳 Utilisation avec Docker

### Construire l’image :

```bash
docker build -t todolist-frontend .
```

### Lancer en local :

```bash
docker run -p 8080:80 todolist-frontend
```

➡️ Accès : [http://localhost:8080](http://localhost:8080)

---

## ⚙️ Déploiement automatique (CI/CD)

Ce dépôt est configuré pour :

* **builder** l’image Docker
* **publier** sur le **GitHub Container Registry** :
  `ghcr.io/wololobzh/todolist-frontend:latest`

Workflow : `.github/workflows/build.yml`

Il se déclenche à chaque `push` sur la branche `main`.

---

## 🧹 Scripts utiles

| Commande                                  | Description                                           |
| ----------------------------------------- | ----------------------------------------------------- |
| `npm run dev`                             | Démarre le serveur de dev (Vite)                      |
| `npm run build`                           | Compile l’app pour la prod                            |
| `npm run preview`                         | Lance un serveur local pour tester la version buildée |
| `docker build -t todolist-frontend .`     | Build Docker image                                    |
| `docker run -p 8080:80 todolist-frontend` | Lance l’app via Docker                                |

---

## 🧠 Technologies utilisées

* ⚛️ **React** (Hooks)
* ⚡ **Vite** (pour le build rapide)
* 🔗 **Axios** (requêtes HTTP)
* 🐳 **Docker** (déploiement)
* 🚀 **GitHub Actions** (CI/CD)
* 🔒 **Nginx** (hébergement de la version buildée)

---

## 📜 Licence

Projet libre pour usage pédagogique et personnel.
© 2025 – [wololobzh](https://github.com/wololobzh)
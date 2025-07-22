# Pay-Per-Click Web System

A full-stack web application for managing and interacting with pay-per-click (PPC) ads. Users can register, log in, and click on banner ads. Admin users can manage ads and view click statistics.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Docker or Atlas)
- **Authentication:** JWT
- **Architecture:** Layered (Repository, Service, Controller)
- **Dev Tools:** Docker, .env, ts-node-dev

---

## Features

- User registration and login
- JWT-based authentication and role protection
- Click tracking for each ad
- Admin panel for managing ads
- Image banners with redirect URLs
- Clean code structure (modular and scalable)
- Docker support for MongoDB

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (optional, for local MongoDB)

---

## Backend Setup

1. Clone the repository and enter the backend folder:

```bash
git clone https://github.com/gabrielravelo/PPC-NODE.git
cd PPC-NODE/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file in /backend:

```bash
PORT=5000
MONGO_URL=mongodb://admin:123456@localhost:27017/
MONGO_DB=ppc_system
MONGO_USER=admin
MONGO_PASS=123456
JWT_SECRET="your_super_secret_key_here"
```

4. Run MongoDB with Docker (optional):

```bash
docker-compose up -d
```

5. Seed the admin user:

```bash
npx ts-node src/seed/seedAdmin.ts
```

5. Start the server:

```bash
npm run dev
```

## API Endpoints (Preview)

| Method | Endpoint           | Description                   | Auth Required |
|--------|--------------------|-------------------------------|---------------|
| POST   | `/api/auth/register` | Register new user              | ❌ No         |
| POST   | `/api/auth/login`    | Login and receive JWT          | ❌ No         |
| GET    | `/api/ads`           | List all available ads         | ✅ Yes        |
| POST   | `/api/ads`           | Create new ad (admin only)     | ✅ Yes (admin)|
| POST   | `/api/ads/:id/click` | Register a click on an ad      | ✅ Yes        |

## Frontend Setup

Coming soon — React app under development (with auth flow and ad interaction UI).

## License

This project is for academic and educational purposes.
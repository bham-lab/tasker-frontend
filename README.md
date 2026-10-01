# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# ✓ Taskr — Task Management Platform

> Organize your work. Track your progress. Stay in flow.

🌐 **Live App:** [taskr-frontend-blue.vercel.app](https://taskr-frontend-blue.vercel.app)
🔧 **API:** [taskr-api-production.up.railway.app](https://taskr-api-production.up.railway.app)

---

## ✨ Features

- 🔐 **JWT Authentication** — secure register, login, password reset via email
- ✅ **Task Management** — create, edit, complete, delete with real-time sync
- ⚡ **Real-Time Updates** — changes appear instantly across all devices via WebSockets
- 📊 **Dashboard Stats** — total, completed, pending, and weekly task counts
- 🔍 **Search & Filter** — debounced search, filter by status, infinite scroll
- 🌙 **Dark Mode** — system preference aware, persists across sessions
- 📁 **Avatar Upload** — cloud storage via Cloudinary with auto-optimization
- 📧 **Email System** — welcome emails, password reset flow

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| React Hook Form + Zod | Form validation |
| Axios | HTTP client with interceptors |
| Socket.io-client | Real-time updates |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| PostgreSQL | Database |
| Prisma ORM | Database access |
| JWT | Authentication |
| bcrypt | Password hashing |
| Socket.io | WebSocket server |
| Zod | Request validation |
| Multer + Cloudinary | File uploads |
| Nodemailer | Email delivery |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- A Cloudinary account (free)
- A Gmail account with App Password enabled

### Backend Setup

```bash
git clone https://github.com/yourusername/taskr-api
cd taskr-api
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Run database migrations
npx prisma migrate deploy

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
git clone https://github.com/yourusername/taskr-frontend
cd taskr-frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

---

## 🌍 Deployment

| Service | Platform | Auto-deploy |
|---|---|---|
| Frontend | Vercel | ✅ On push to main |
| Backend | Railway | ✅ On push to main |
| Database | Railway PostgreSQL | — managed |

---

## 📸 Screenshots

[Add screenshots here — DevTools → screenshot or Cmd+Shift+4]

---

## 👨‍💻 Author

**Abrham Melesse**
Built during a 24-week full stack bootcamp.

---

## 📄 License

MIT — use this however you want.
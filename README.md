# AI Banking App

A full-stack banking application built with Spring Boot (backend) and React/Vite (frontend), deployed on Render + Vercel with Aiven MySQL.

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Spring Boot 3.4, Java 21, Maven |
| Frontend | React 19, Vite, React Router |
| Database | Aiven MySQL (cloud) |
| Backend Deploy | Render (Docker) |
| Frontend Deploy | Vercel |

---

## Local Development

### Prerequisites
- Java 21, Maven 3.9+
- Node.js 18+
- Docker (optional, for local container testing)

### Backend
```bash
cd backend
# Create .env from template and fill in your Aiven credentials
cp .env.example .env
# Run
mvn spring-boot:run
```
> Backend runs on http://localhost:8080

### Frontend
```bash
cd frontend
npm install
npm run dev
```
> Frontend runs on http://localhost:5173 (proxies /api → backend)

---

## Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "chore: add deployment config"
git push origin main
```

### 2. Deploy Backend on Render
1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repo, select the `backend/` root directory
3. Set **Environment** → **Docker**
4. Add these environment variables in Render dashboard:

| Variable | Value |
|----------|-------|
| `DB_URL` | `jdbc:mysql://your-aiven-host:port/defaultdb?sslMode=REQUIRED&serverTimezone=UTC` |
| `DB_USERNAME` | your Aiven username |
| `DB_PASSWORD` | your Aiven password |
| `JWT_SECRET` | a strong 32+ char secret |

5. Deploy → you'll get `https://your-backend.onrender.com`

### 3. Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com) → **Import** your GitHub repo
2. Set **Root Directory** → `frontend`
3. Add environment variable in Vercel dashboard:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend.onrender.com` |

4. Deploy → you'll get `https://your-app.vercel.app`

### 4. Update CORS on Backend
After getting your Vercel URL, update your Spring Security config's `allowedOrigins` to include `https://your-app.vercel.app`, then redeploy backend.

---

## Environment Variables Reference

### Backend (`.env` / Render dashboard)
```
PORT=8080
DB_URL=jdbc:mysql://...
DB_USERNAME=...
DB_PASSWORD=...
JWT_SECRET=...
```

### Frontend (Vercel dashboard)
```
VITE_API_URL=https://your-backend.onrender.com
```

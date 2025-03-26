# 🚨 Incident Dashboard

A full-stack Incident Management Dashboard built with **React**, **TypeScript**, **Ant Design**, **GraphQL**, **Apollo**, and **MongoDB**.

This application allows teams to track incidents, update status and severity, and analyze incidents with filters and sorting in a clean UI.

---

## 📁 Project Structure

```
.
├── frontend/                   # React + AntD client (TypeScript)
│   ├── components/             # Table, Drawer, Filter UI, etc.
│   ├── constants/              # Label/color/sort mapping
│   ├── graphql/                # Queries & Mutations
│   ├── types/                  # Shared TS types
│   └── main.tsx                # Entry point (Vite or CRA)
├── backend/                    # Node.js + Apollo Server
│   ├── models/                 # Mongoose schema
│   ├── resolvers/              # GraphQL resolvers
│   ├── graphql/                # typeDefs + schema setup
│   └── index.ts                # Server entry point
└── README.md
```

---

## 🚀 Live Deployment

| Layer     | Tech     | Link                  |
|-----------|----------|-----------------------|
| Frontend  | Vercel   | `https://incident-dashboard-git-main-girish-anadv-07s-projects.vercel.app/` |
| Backend   | Render   | `https://incident-dashboard-m3f7.onrender.com` |
| Database  | MongoDB Atlas | Connected remotely |

---

## 📦 Tech Stack

| Layer         | Tools                        |
|---------------|------------------------------|
| Frontend      | React, TypeScript, Ant Design |
| State         | Apollo Client + GraphQL       |
| Backend       | Node.js, Apollo Server        |
| DB            | MongoDB Atlas + Mongoose      |
| Deployment    | Vercel + Render               |

---

## 🧠 Features

- ✅ Server-side filtering (Status, Severity, Date Range)
- ✅ Server-side pagination & sorting
- ✅ Inline tag editing for Status & Severity with confirmation
- ✅ Click-to-view Incident Drawer
- ✅ Add & Edit Incidents via form Drawer
- ✅ One-filter-group-at-a-time dropdown with "OK" button
- ✅ Local search for incident titles
- ✅ Responsive, polished Ant Design UI

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Girish-Anadv-07/Incident-Dashboard.git
cd Incident-Dashboard
```

---

### 2. 🖥 Frontend Setup

```bash
cd frontend
npm install
```

#### Create `.env` file:

```env
REACT_APP_API_URL=https://your-api.onrender.com/graphql
```

#### Run the frontend:

```bash
npm start
```

---

### 3. 🔧 Backend Setup

```bash
cd ../backend
npm install
```

#### Create `.env` file:

```env
MONGO_URI=mongodb+srv://your-cluster.mongodb.net/incidents
PORT=4000
```

#### Seed Mock Data (Optional)

```bash
npm run seed
```

#### Run the backend:

```bash
npx ts-node-dev src/index.ts
```

Apollo Server will run at:
```
http://localhost:4000/graphql
```

---

## 🌐 Deployment Instructions

### Frontend (Vercel):

- Go to [https://vercel.com](https://vercel.com)
- Connect your GitHub repo
- Select `frontend` as root
- Add your `VITE_GRAPHQL_ENDPOINT` in the Vercel dashboard

---

### Backend (Render):

- Go to [https://render.com](https://render.com)
- Select "New Web Service"
- Root = `backend/`
- Add env variable: `MONGO_URI`
- It auto-assigns a `PORT`

---

## 🤝 Contributing

Pull requests welcome! Please open an issue first to discuss your changes.

---


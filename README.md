# 🔐 Password Manager

A secure, role-based password management system built for agencies, startups, and organizations to effortlessly manage and share credentials across teams.

## 🚀 Live Demo
👉 [View Live Project on Vercel](https://password-manager-a8peryfc5-dixit-rajs-projects.vercel.app/)  

---

## 🧰 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Material Ui
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Frontend)

---

## 🔑 Key Features

- ✅ **Role-based Access Control**
  - Superadmin, Admin, and User roles with separate portals and access rights.

- 💳 **Subscription-Based Access**
  - Tiered pricing model for Admins to unlock features (user limit, media accounts, etc.)

- 🔐 **Secure Credential Sharing**
  - Encrypted password storage and access, designed for collaborative environments.

- 👥 **Multi-Tenant System**
  - Supports multiple organizations with isolated data and access control.

- 📊 **Admin Dashboard**
  - Admins can create Clients, Media Accounts, and Users based on their plan.

---

## 🧪 Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/password-manager.git
cd password-manager
npm install        # for frontend
cd backend
npm install        # for backend
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
# Backend
cd backend
npm run dev

# Frontend (in a separate terminal)
cd ..
npm start
```

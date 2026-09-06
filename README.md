
#  Sistema de Reclutamiento Interno - Liverpool

Plataforma desarrollada para el **Hackathon Liverpool 2025**, diseñada para optimizar el reclutamiento interno dentro de la empresa.  
Permite que **Recursos Humanos** gestione vacantes (crear, editar, eliminar) y que los **empleados** consulten y postulen.

---

## 🧩 Arquitectura
Hackathon_Liverpool/ 
├── backend/    → API REST (FastAPI + Firebase) 
└── frontend/     → Interfaz web (Next.js + React)


- *Backend:* FastAPI (Python) conectado a Firebase Firestore.  
- *Frontend:* Next.js para interfaz dinámica.  
- *Base de datos:* Firebase Firestore (NoSQL).  
- *Auth:* Firebase Authentication.  
- *Despliegue:* Cloud Run (backend) + Vercel/Firebase Hosting (frontend).


## ⚙️ Instalación

### 1️⃣ Clonar repositorio
bash
git clone https://github.com/Demm21/Hackathon_Liverpool.git
cd Hackathon_Liverpool

2️⃣ Backend

cd backend
python -m venv venv
venv\Scripts\activate      # o source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

> Asegúrate de tener credentials/serviceAccount.json desde Firebase.


3️⃣ Frontend

cd ../frontend
npm install
npm run dev

📍 Accede en: http://localhost:3000

Configura src/services/api.js con:

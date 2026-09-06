import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials, firestore
from routes import vacantes, user

script_dir = os.path.dirname(os.path.abspath(__file__))
cred_path = os.path.join(script_dir, "credentials", "serviceAccount.json")

# 🔹 Inicializar Firebase solo si no está inicializado
if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

app = FastAPI(
    title="Liverpool Backend API",
    description="API REST para el sistema de reclutamiento interno",
    version="1.0.0"
)

app.include_router(vacantes.router, prefix="/api")
app.include_router(users.router, prefix="/api")

@app.get("/")
def home():
    return {"status": "✅ API de Liverpool funcionando con Firebase"}

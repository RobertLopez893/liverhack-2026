# core/auth.py

from fastapi import Depends, HTTPException, Header
from firebase_admin import auth, firestore
from typing import Optional, List

# Obtención de datos del usuario
async def get_current_user_data(authorization: Optional[str] = Header(None)):
    """
    Verifica el token de Firebase y devuelve los datos del usuario desde Firestore.
    Esta es la base para toda la seguridad.
    """

    db = firestore.client()

    if not authorization:
        raise HTTPException(status_code=401, detail="Encabezado de autorización no encontrado")
    
    try:
        token = authorization.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        user_doc = db.collection("usuarios").document(uid).get()

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="Usuario no encontrado en Firestore")
        
        user_data = user_doc.to_dict()
        user_data['uid'] = uid
        return user_data

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token inválido o error de autenticación: {e}")

# Verificación de roles
def require_role(allowed_roles: List[str]):
    """
    Esta es una "fábrica" que crea una dependencia.
    Devuelve una función que verifica si el rol del usuario está en la lista de roles permitidos.
    """
    async def role_checker(user_data: dict = Depends(get_current_user_data)):
        user_role = user_data.get("rol")
        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail=f"Acceso denegado. Se requiere uno de los siguientes roles: {', '.join(allowed_roles)}"
            )
        return user_data
    
    return role_checker

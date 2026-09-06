# backend/core/routes/users.py
from fastapi import APIRouter, Depends
from core.auth import get_current_user_data

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", summary="Obtener datos del usuario actual")
async def read_users_me(current_user: dict = Depends(get_current_user_data)):
    """
    Devuelve los datos del usuario que ha iniciado sesión,
    verificados a través del token de Firebase.
    """
    return current_user

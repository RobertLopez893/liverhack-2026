from fastapi import APIRouter, Depends, HTTPException, Header, Query
from firebase_admin import firestore, auth
from schemas.vacante import VacanteCreate, VacanteUpdate
from typing import Optional
from core.auth import require_role
from firebase_admin.firestore import SERVER_TIMESTAMP

router = APIRouter(prefix="/vacantes", tags=["Vacantes"])

# 🔹 función para obtener el cliente Firestore
def get_db():
    return firestore.client()

# 📌 Crear vacante
@router.post("/", dependencies=[Depends(require_role(["Admin RH"]))])
def crear_vacante(vacante: VacanteCreate, user_data: dict = Depends(require_role(["Admin RH"]))):
    db = get_db()
    _, vacante_ref = db.collection("vacantes").add(vacante.dict())

    db.collection("auditoria").add({
        "accion": f"Creación de vacante: '{vacante.titulo}'",
        "usuario": user_data.get("correo"),
        "fecha": SERVER_TIMESTAMP,
        "vacanteId": vacante_ref.id,
        "vacanteTitulo": vacante.titulo
    })

    return {"id": vacante_ref[1].id, "mensaje": "Vacante creada correctamente"}

# 📌 Obtener todas las vacantes
@router.get("/", dependencies=[Depends(require_role(["Admin RH"]))])
def listar_vacantes():
    db = get_db()
    docs = db.collection("vacantes").stream()
    vacantes = [{**d.to_dict(), "id": d.id} for d in docs]
    return vacantes

# 📌 Obtener una vacante por ID
@router.get("/{vacante_id}", dependencies=[Depends(require_role(["Admin RH"]))])
def obtener_vacante(vacante_id: str):
    db = get_db()
    doc = db.collection("vacantes").document(vacante_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Vacante no encontrada")
    return {**doc.to_dict(), "id": doc.id}

# 📌 Actualizar vacante (con auditoría)
@router.put("/{vacante_id}", dependencies=[Depends(require_role(["Admin RH"]))])
def actualizar_vacante(vacante_id: str, data: VacanteUpdate, user_data: dict = Depends(require_role(["Admin RH"]))):
    db = get_db()
    vacante_ref = db.collection("vacantes").document(vacante_id)
    doc_actual = vacante_ref.get()

    if not doc_actual.exists:
        raise HTTPException(status_code=404, detail="Vacante no encontrada")

    datos_actuales = doc_actual.to_dict()
    vacante_titulo = datos_actuales.get("descripcion", vacante_id)
    update_data = {k: v for k, v in data.dict().items() if v is not None}

    if not update_data:
        return {"mensaje": "No se enviaron datos para actualizar"}

    # Registra cada campo que cambió en el historial usando un lote (batch)
    historial_batch = db.batch()
    for campo, valor_nuevo in update_data.items():
        valor_anterior = datos_actuales.get(campo)
        if str(valor_anterior) != str(valor_nuevo):
            historial_ref = db.collection("auditoria").document()
            historial_batch.set(historial_ref, {
                "accion": f"Actualización del campo '{campo}' en: {vacante_titulo}",
                "valorAnterior": str(valor_anterior),
                "valorNuevo": str(valor_nuevo),
                "usuario": user_data.get("correo"),
                "fecha": SERVER_TIMESTAMP,
                "vacanteId": vacante_id,
                "vacanteTitulo": datos_actuales.get("descripcion")
            })
    
    # Ejecuta todas las escrituras del historial a la vez
    historial_batch.commit()
    vacante_ref.update(update_data)
    
    return {"mensaje": "Vacante actualizada y cambios auditados correctamente"}


# 📌 Eliminar vacante
@router.delete("/{vacante_id}", dependencies=[Depends(require_role(["Admin RH"]))])
def eliminar_vacante(vacante_id: str, user_data: dict = Depends(require_role(["Admin RH"]))):
    db = get_db()
    vacante_ref = db.collection("vacantes").document(vacante_id)
    doc_a_eliminar = vacante_ref.get()

    if not vacante_ref.get().exists:
        raise HTTPException(status_code=404, detail="Vacante no encontrada")

    vacante_titulo = doc_a_eliminar.to_dict().get("descripcion", vacante_id) 

    # Registra la acción de eliminación antes de borrar el documento
    db.collection("auditoria").add({
        "accion": f"Eliminación de vacante: '{vacante_titulo}'",
        "usuario": user_data.get("correo"),
        "fecha": SERVER_TIMESTAMP,
        "vacanteId": vacante_id,
        "vacanteTitulo": vacante_titulo
    })

    vacante_ref.delete()
    
    return {"mensaje": "Vacante eliminada. El registro de auditoría se ha conservado."}

# 📌 Obtener el historial de una vacante específica
@router.get("/{vacante_id}/historial", summary="Obtener el historial de cambios de una vacante")
def obtener_historial_vacante(vacante_id: str, user_data: dict = Depends(require_role(["Admin RH", "Gerente"]))):
    db = get_db()
    # Primero, verifica que la vacante exista para dar un error claro
    if not db.collection("vacantes").document(vacante_id).get().exists:
        raise HTTPException(status_code=404, detail="Vacante no encontrada")

    # Consulta la colección global de auditoría, filtrando por el ID de la vacante
    historial_query = db.collection("auditoria").where("vacanteId", "==", vacante_id).order_by("fecha", direction=Query.DESCENDING).stream()
    
    historial = [doc.to_dict() for doc in historial_query]
    
    return historial

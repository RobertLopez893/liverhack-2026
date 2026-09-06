from enum import Enum
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class EstadoVacante(str, Enum):
    alineacion = "Alineación"
    atraccion = "Atracción"
    reclutamiento = "Reclutamiento"
    seleccion = "Selección"
    oferta = "Oferta"
    onboarding = "Onboarding"
    publicada = "Publicada"

class VacanteBase(BaseModel):
    titulo: str
    descripcion: str
    ubicacion: str
    tipo: str
    nivel: str
    salario: Optional[float] = None
    estado: EstadoVacante = EstadoVacante.publicada
    habilidadesTecnicas: List[str]
    habilidadesBlandas: List[str]
    fechaPublicacion: datetime = datetime.now()
    fechaCierre: Optional[datetime] = None
    creadoPor: str
    gerenteAsignado: Optional[str] = None
    aplicaciones: Optional[int] = 0

class VacanteCreate(VacanteBase):
    pass  # Igual a la base por ahora

class VacanteUpdate(BaseModel):
    titulo: Optional[str]
    descripcion: Optional[str]
    ubicacion: Optional[str]
    tipo: Optional[str]
    nivel: Optional[str]
    salario: Optional[float]
    estado: Optional[EstadoVacante] = None
    gerenteAsignado: Optional[str] = None
    habilidadesTecnicas: Optional[List[str]]
    habilidadesBlandas: Optional[List[str]]
    fechaCierre: Optional[datetime]

    class Config:
        # Esto asegura que Pydantic maneje el Enum correctamente en el JSON de respuesta.
        use_enum_values = True

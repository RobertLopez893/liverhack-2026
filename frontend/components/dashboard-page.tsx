"use client"
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  User,
  Briefcase,
  CheckCircle,
  Filter,
  Search,
  Users,
  FileText,
  BriefcaseIcon,
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  Plus,
  ArrowLeft,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Footer } from "./footer"
import Image from "next/image"
import { EditVacancyPage } from "./edit-vacancy-page"
import { TrackingViewPage } from "./tracking-view-page"
import { CreateVacancyPage } from "./create-vacancy-page"

interface UserData {
  uid: string;
  nombre: string;
  correo: string;
  rol: "Admin RH" | "Gerente";
}

type Vacancy = {
  id: string; 
  titulo: string;
  gerente: string;
  ubicacion: string;
  area: string;
  estado: string;
  prioridad: "alta" | "media" | "baja";
  descripcion?: string;
  tipo_empleo?: string;
  salario?: string;
  habilidades_duras?: string[];
  habilidades_blandas?: string[];
}

// Define un tipo para la creación, que no necesita el `id`
type NewVacancyPayload = Omit<Vacancy, 'id'>;

export function DashboardPage() {
  const { token, isLoading: isAuthLoading, logout } = useAuth();
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [userRole, setUserRole] = useState<"AdminRH" | "gerente">("AdminRH") // Change to "gerente" to test manager view

  const [searchQuery, setSearchQuery] = useState("")
  const [estadoFilter, setEstadoFilter] = useState<string>("all")
  const [areaFilter, setAreaFilter] = useState<string>("all")
  const [prioridadFilter, setPrioridadFilter] = useState<string>("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [vacancyToDelete, setVacancyToDelete] = useState<Vacancy | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [vacancyToEdit, setVacancyToEdit] = useState<Vacancy | null>(null)
  const [isTrackingMode, setIsTrackingMode] = useState(false)
  const [vacancyToView, setVacancyToView] = useState<Vacancy | null>(null)
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [isUserManagementMode, setIsUserManagementMode] = useState(false)
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [isAuditMode, setIsAuditMode] = useState(false)
  const [auditUserFilter, setAuditUserFilter] = useState<string>("all")
  const [auditStageFilter, setAuditStageFilter] = useState<string>("all")
  const [auditSearchQuery, setAuditSearchQuery] = useState("")

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // NUEVO: Función reutilizable para obtener las vacantes
  const fetchVacancies = useCallback(async () => {
    if (!token) return;
    try {
      const vacanciesRes = await fetch(`${API_BASE_URL}/vacantes/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!vacanciesRes.ok) throw new Error('No se pudieron cargar las vacantes.');
      const fetchedVacancies: Vacancy[] = await vacanciesRes.json();
      setVacancies(fetchedVacancies);
    } catch (error: any) {
      setApiError(error.message);
    }
  }, [token]);

  // Efecto para cargar datos iniciales (usuario y vacantes)
  useEffect(() => {
    if (!isAuthLoading && !token) {
      router.push('/login-page');
      return;
    }

    if (token) {
      const fetchInitialData = async () => {
        setIsDataLoading(true);
        setApiError(null);
        try {
          const userRes = await fetch(`${API_BASE_URL}/users/me`, { headers: { 'Authorization': `Bearer ${token}` } });
          if (!userRes.ok) throw new Error('No se pudo obtener la información del usuario.');
          const fetchedUserData: UserData = await userRes.json();
          setUserData(fetchedUserData);
          await fetchVacancies();
        } catch (error: any) {
          setApiError(error.message);
          if (error.response?.status === 401) logout();
        } finally {
          setIsDataLoading(false);
        }
      };
      fetchInitialData();
    }
  }, [token, isAuthLoading, router, logout, fetchVacancies]);
  // PROTEGER LA RUTA: Si no hay token, redirige al login
  useEffect(() => {
    if (!isAuthLoading && !token) {
      router.push('/login-page'); // O la ruta de tu login
    }
  }, [isAuthLoading, token, router]);

  // EFECTO PARA CARGAR LOS DATOS DESDE EL BACKEND
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        setIsDataLoading(true);
        setApiError(null);
        try {
          // Llamada para obtener los datos del usuario
          const userRes = await fetch('http://127.0.0.1:8000/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!userRes.ok) throw new Error('No se pudo obtener la información del usuario.');
          const fetchedUserData: UserData = await userRes.json();
          setUserData(fetchedUserData);

          // Llamada para obtener las vacantes
          const vacanciesRes = await fetch('http://127.0.0.1:8000/api/vacantes/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!vacanciesRes.ok) throw new Error('No se pudieron cargar las vacantes.');
          const fetchedVacancies: Vacancy[] = await vacanciesRes.json();
          setVacancies(fetchedVacancies);

        } catch (error: any) {
          setApiError(error.message);
          if (error.response && error.response.status === 401) {
            logout(); // Si el token es inválido, cerramos sesión
          }
        } finally {
          setIsDataLoading(false);
        }
      };

      fetchData();
    }
  }, [token, logout]); // Se ejecuta cada vez que el token cambia

  

  const handleDeleteClick = (vacancy: Vacancy) => {
    setVacancyToDelete(vacancy)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!token || !vacancyToDelete) return;
    try {
      const response = await fetch(`${API_BASE_URL}/vacantes/${vacancyToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Error al eliminar la vacante.');

      // Actualiza el estado local solo si la API tuvo éxito
      setVacancies(vacancies.filter((v) => v.id !== vacancyToDelete.id));
      setDeleteModalOpen(false);
      setVacancyToDelete(null);

    } catch (error: any) {
      setApiError(error.message);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false)
    setVacancyToDelete(null)
  }

  const handleEditClick = (vacancy: Vacancy) => {
    setVacancyToEdit(vacancy)
    setIsEditMode(true)
  }

  const handleSaveEdit = async (updatedVacancyData: Vacancy) => {
    if (!token || !vacancyToEdit) return;
    try {
      const response = await fetch(`${API_BASE_URL}/vacantes/${vacancyToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVacancyData),
      });
      if (!response.ok) throw new Error('Error al actualizar la vacante.');

      await fetchVacancies(); // Recarga la lista para reflejar los cambios
      setIsEditMode(false);
      setVacancyToEdit(null);

    } catch (error: any) {
      setApiError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false)
    setVacancyToEdit(null)
  }

  const handleViewClick = (vacancy: Vacancy) => {
    setVacancyToView(vacancy)
    setIsTrackingMode(true)
  }

  const handleBackFromTracking = () => {
    setIsTrackingMode(false)
    setVacancyToView(null)
  }

  const handleCreateVacancy = () => {
    setIsCreateMode(true)
  }

  const handleSaveNewVacancy = async (newVacancyData: NewVacancyPayload) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/vacantes/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVacancyData),
      });
      if (!response.ok) throw new Error('Error al crear la vacante.');
      
      await fetchVacancies(); // Recarga la lista para obtener la nueva vacante con su ID
      setIsCreateMode(false);

    } catch (error: any) {
      setApiError(error.message);
    }
  };

  const handleCancelCreate = () => {
    setIsCreateMode(false)
  }

  const handleUserManagementClick = () => {
    setIsUserManagementMode(true)
  }

  const handleBackFromUserManagement = () => {
    setIsUserManagementMode(false)
  }

  const handleAuditClick = () => {
    setIsAuditMode(true)
  }

  const handleBackFromAudit = () => {
    setIsAuditMode(false)
  }

  const users = [
    {
      name: "Ana López",
      email: "ana.lopez@liverpool.com",
      userType: "RH",
      area: "Recursos Humanos",
      vacancies: ["Gerente de Tienda - Centro Histórico"],
    },
    {
      name: "Carlos Martínez",
      email: "carlos.martinez@liverpool.com",
      userType: "Gerente",
      area: "Logística",
      vacancies: ["Coordinador de Logística - Santa Fe"],
    },
    {
      name: "Laura Fernández",
      email: "laura.fernandez@liverpool.com",
      userType: "Gerente",
      area: "Ventas",
      vacancies: ["Subgerente de Ventas - GDL"],
    },
    {
      name: "José García",
      email: "jose.gancia@liverpool.com",
      userType: "Gerente",
      area: "Tecnología",
      vacancies: ["Especialista en TI - E commerce", "Visual Merchandiser - Polanco"],
    },
    {
      name: "María Sánchez",
      email: "maria.sanchez@liverpool.com",
      userType: "RH",
      area: "Recursos Humanos",
      vacancies: [],
    },
    {
      name: "Pedro Jiménez",
      email: "pedro.jimenez@liverpool.com",
      userType: "Gerente",
      area: "Pendiente",
      vacancies: ["Analista de Datos - Corporativo"],
    },
    {
      name: "Sofía Pérez",
      email: "sofia.perez@liverpool.com",
      userType: "RH",
      area: "Operaciones",
      vacancies: [],
    },
    {
      name: "Juan Rodríguez",
      email: "juan.rodriguez@liverpool.com",
      userType: "Gerente",
      area: "Ventas",
      vacancies: [],
    },
  ]

  const auditLogs = [
    {
      user: "Ana Torres",
      registeredAction: "Gerente de Tienda - Centro Histórico",
      date: "14/10/2025 10:42",
      stage: "alineacion",
      actionType: "visualizacion de vacante",
    },
    {
      user: "María López",
      registeredAction: "Especialista en TI - E commerce",
      date: "13/10/2025",
      stage: "atraccion",
      actionType: "nueva vacante",
    },
    {
      user: "María López",
      registeredAction: "Candidato: Sofía Pérez",
      date: "13/10/2025 09:30",
      stage: "oferta",
      actionType: "modificacion",
    },
    {
      user: "SQL",
      registeredAction: "Sistema de base de datos",
      date: "13/10/2025 09:30",
      stage: "oferta",
      actionType: "cambios de fecha",
    },
    {
      user: "RH Admin",
      registeredAction: "Analista de Datos - Corporativo",
      date: "12/10/2025 08:15",
      stage: "adaptabilidad",
      actionType: "edicion de vacante",
    },
    {
      user: "Carlos Martínez",
      registeredAction: "Coordinador de Logística - Santa Fe",
      date: "11/10/2025 14:20",
      stage: "reclutamiento",
      actionType: "eliminacion de vacante",
    },
  ]

  const getAuditStageBadge = (stage: string) => {
    const stageConfig: Record<string, { bg: string; text: string; label: string }> = {
      alineacion: { bg: "bg-green-500", text: "text-white", label: "Alineación" },
      atraccion: { bg: "bg-blue-500", text: "text-white", label: "Atracción" },
      oferta: { bg: "bg-red-500", text: "text-white", label: "Oferta" },
      reclutamiento: { bg: "bg-orange-500", text: "text-white", label: "Reclutamiento" },
      adaptabilidad: { bg: "bg-purple-500", text: "text-white", label: "Adaptabilidad" },
    }
    return stageConfig[stage] || { bg: "bg-gray-300", text: "text-gray-700", label: stage }
  }

  if (isCreateMode) {
    return <CreateVacancyPage onCreate={handleSaveNewVacancy} onCancel={handleCancelCreate} />
  }

  if (isEditMode && vacancyToEdit) {
    return <EditVacancyPage vacancy={vacancyToEdit} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
  }

  if (isTrackingMode && vacancyToView) {
    return <TrackingViewPage vacancy={vacancyToView} onBack={handleBackFromTracking} />
  }

  if (isAuditMode) {
    const filteredAuditLogs = auditLogs.filter((log) => {
      const matchesSearch = log.user.toLowerCase().includes(auditSearchQuery.toLowerCase())
      const matchesUser = auditUserFilter === "all" || log.user === auditUserFilter
      const matchesStage = auditStageFilter === "all" || log.stage === auditStageFilter
      return matchesSearch && matchesUser && matchesStage
    })

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="text-white shadow-md" style={{ backgroundColor: "#EC008C" }}>
          <div ="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="flex items-center gap-4">
              <div className="relative h-8 w-32 md:h-10 md:w-40">
                <Image src="/liverpool-logo.png" alt="Liverpool" fill className="object-contain" priority />
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-xs md:text-sm font-medium">Hola, RH Liverpool</span>
            </div>
          </div>
        </header>

        <div className="flex-1">
          <div className="text-white px-4 md:px-8 py-4 md:py-6" style={{ backgroundColor: "#EC008C" }}>
            <div className="flex items-center gap-4">
              <button onClick={handleBackFromAudit} className="hover:bg-[#C40074]/50 p-2 rounded transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl md:text-3xl font-bold font-heading">Auditoría</h1>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <Card className="p-4 md:p-6 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 font-heading">Registro de aciónes</h2>
                <Button size="sm" className="text-white font-semibold gap-2" style={{ backgroundColor: "#EC008C" }}>
                  Exportar
                </Button>
              </div>

              <div className="mb-4 md:mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre de usuario..."
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Usuario
                        </th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 min-w-[200px]">
                          Acción registrada
                        </th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Fecha de última modificación
                        </th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600"></th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Acción realizada
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAuditLogs.map((log, index) => {
                        const stageBadge = getAuditStageBadge(log.stage)
                        return (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 font-medium">
                              {log.user}
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-700">
                              {log.registeredAction}
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">{log.date}</td>

                            <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">
                              {log.actionType}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 md:mt-6 gap-3 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>Retur de fechas</span>
                  <div className="flex gap-2">
                    <button className="hover:bg-gray-100 p-1 rounded">
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button className="hover:bg-gray-100 p-1 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span>Veinplo de fecha</span>
                  <div className="flex gap-2">
                    <button className="hover:bg-gray-100 p-1 rounded">
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button className="hover:bg-gray-100 p-1 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  if (isUserManagementMode) {
    const filteredUsers = users.filter((user) => {
      const searchLower = userSearchQuery.toLowerCase()
      const matchesName = user.name.toLowerCase().includes(searchLower)
      const matchesEmail = user.email.toLowerCase().includes(searchLower)
      const matchesArea = user.area.toLowerCase().includes(searchLower)
      const matchesVacancies = user.vacancies.some((vacancy) => vacancy.toLowerCase().includes(searchLower))

      return matchesName || matchesEmail || matchesArea || matchesVacancies
    })

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="text-white shadow-md" style={{ backgroundColor: "#EC008C" }}>
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="flex items-center gap-4">
              <div className="relative h-8 w-32 md:h-10 md:w-40">
                <Image src="/liverpool-logo.png" alt="Liverpool" fill className="object-contain" priority />
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-xs md:text-sm font-medium">Hola, RH Liverpool</span>
            </div>
          </div>
        </header>

        <div className="flex-1">
          <div className="text-white px-4 md:px-8 py-4 md:py-6" style={{ backgroundColor: "#EC008C" }}>
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackFromUserManagement}
                className="hover:bg-[#C40074]/50 p-2 rounded transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl md:text-3xl font-bold font-heading">Gestión de Usuarios</h1>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <Card className="p-4 md:p-6 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 font-heading">Lista de Usuarios</h2>
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Nombre
                        </th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 min-w-[180px]">
                          Email
                        </th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Tipo de Usuario
                        </th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Área
                        </th>
                        <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 min-w-[200px]">
                          Vacantes Asignadas
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 font-medium">
                            {user.name}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">{user.email}</td>
                          <td className="py-3 md:py-4 px-2 md:px-4">
                            <span
                              className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                                user.userType === "Gerente"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-[#fce7f3] text-[#EC008C]"
                              }`}
                            >
                              {user.userType}
                            </span>
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-700">{user.area}</td>
                          <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">
                            {user.vacancies.length > 0 ? (
                              <div className="flex flex-col gap-1">
                                {user.vacancies.map((vacancy, vIndex) => (
                                  <span key={vIndex} className="text-xs">
                                    • {vacancy}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400 italic">Sin vacantes asignadas</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 md:mt-6 gap-3 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span>
                    Mostrando 1-{filteredUsers.length} de {filteredUsers.length} usuarios
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  const filteredVacancies = vacancies.filter((vacancy) => {
    const matchesSearch =
      vacancy.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.gerente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.ubicacion.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEstado = estadoFilter === "all" || vacancy.estado === estadoFilter
    const matchesArea = areaFilter === "all" || vacancy.area === areaFilter
    const matchesPrioridad = prioridadFilter === "all" || vacancy.prioridad === prioridadFilter

    return matchesSearch && matchesEstado && matchesArea && matchesPrioridad
  });

  const urgentVacanciesCount = vacancies.filter((v) => v.priority === "high").length

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      alineacion: { bg: "bg-gray-300", text: "text-gray-700", label: "Alineación" },
      atraccion: { bg: "bg-blue-500", text: "text-white", label: "Atracción" },
      reclutamiento: { bg: "bg-purple-500", text: "text-white", label: "Reclutamiento" },
      seleccion: { bg: "bg-yellow-500", text: "text-white", label: "Selección" },
      oferta: { bg: "bg-green-500", text: "text-white", label: "Oferta" },
      onboarding: { bg: "bg-orange-500", text: "text-white", label: "Onboarding" },
    }
    return statusConfig[status] || { bg: "bg-gray-300", text: "text-gray-700", label: status }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="text-white shadow-md" style={{ backgroundColor: "#EC008C" }}>
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="lg:hidden p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <div className="relative h-10 w-32 sm:h-12 sm:w-40 md:h-16 md:w-52">
              <Image src="/liverpool-logo.png" alt="Liverpool" fill className="object-contain leading-6" priority />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-[#C40074]/50 gap-1 sm:gap-2 border border-white/30 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline font-medium">
                    {userRole === "adminRH" ? "Admin RH" : "Gerente"}
                  </span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem
                  onClick={() => setUserRole("adminRH")}
                  className={`text-gray-700 text-xs sm:text-sm ${userRole === "adminRH" ? "bg-[#fce7f3] font-semibold" : ""}`}
                >
                  Admin RH (Acceso Completo)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setUserRole("gerente")}
                  className={`text-gray-700 text-xs sm:text-sm ${userRole === "gerente" ? "bg-[#fce7f3] font-semibold" : ""}`}
                >
                  Gerente (Acceso Restringido)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">
              Hola, {userRole === "adminRH" ? "RH Liverpool" : "Gerente"}
            </span>
          </div>
        </div>
      </header>

      <div className="flex relative flex-1">
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 sm:w-72 min-h-screen text-white transition-transform duration-300
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          style={{ backgroundColor: "#EC008C", top: "48px" }}
        >
          <div className="p-4 sm:p-6">
            <div className="flex justify-center mb-6 sm:mb-8 pt-2 sm:pt-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <nav className="space-y-1">
              {userRole === "Admin RH" && (
                <button
                  onClick={() => {
                    handleUserManagementClick()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-[#C40074]/50 transition-colors rounded"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Gestión de Usuarios</span>
                </button>
              )}
              {userRole === "adminRH" && (
                <button
                  onClick={() => {
                    handleAuditClick()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-sm hover:bg-[#C40074]/50 transition-colors rounded"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Auditoría</span>
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 text-sm transition-colors rounded"
                style={{ backgroundColor: "#C40074" }}
              >
                <BriefcaseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Vacantes</span>
              </button>
            </nav>
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            style={{ top: "48px" }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="flex-1 w-full lg:w-auto overflow-x-hidden">
          <div className="text-white px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6" style={{ backgroundColor: "#EC008C" }}>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-heading text-background">
              Panel de Control de RH
            </h1>
          </div>

          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              <Card className="p-4 sm:p-6 md:p-8 text-center bg-white shadow-sm">
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 sm:mb-2 md:mb-3 font-heading">
                  Vacantes Activas
                </h3>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 md:mb-2">150</p>
                <p className="text-xs md:text-sm text-gray-500">Total Activas</p>
              </Card>

              <Card className="p-4 sm:p-6 md:p-8 text-center bg-white shadow-sm">
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 sm:mb-2 md:mb-3 font-heading">
                  Vacantes Cubiertas
                </h3>
                <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-1 md:mb-2">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">86</p>
                  <span
                    className="text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded"
                    style={{ backgroundColor: "#C8E6C9", color: "#2E7D32" }}
                  >
                    Listo
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-500">Estado "Onboarding"</p>
              </Card>

              <Card className="p-4 sm:p-6 md:p-8 text-center bg-white shadow-sm">
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-orange-400 rounded-lg flex items-center justify-center">
                    <Filter className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 sm:mb-2 md:mb-3 font-heading">
                  En Reclutamiento
                </h3>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 md:mb-2">60</p>
                <p className="text-xs md:text-sm text-gray-500">Etapa Actual</p>
              </Card>

              <Card className="p-4 sm:p-6 md:p-8 text-center bg-white shadow-sm">
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#EC008C" }}
                  >
                    <AlertCircle className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 sm:mb-2 md:mb-3 font-heading">
                  Vacantes Urgentes
                </h3>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 md:mb-2">
                  {urgentVacanciesCount}
                </p>
                <p className="text-xs md:text-sm text-gray-500">Prioridad Alta</p>
              </Card>
            </div>

            <Card className="p-3 sm:p-4 md:p-6 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar Vacante..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 sm:pl-10 border-gray-300 text-xs sm:text-sm h-9 sm:h-10"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-300 bg-transparent gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm h-9 px-2 sm:px-3"
                      >
                        <span className="hidden sm:inline">Prioridad</span>
                        <span className="sm:hidden">Prior.</span>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem
                        onClick={() => setPrioridadFilter("all")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Todas
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setPrioridadFilter("high")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Alta
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setPrioridadFilter("medium")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Media
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setPrioridadFilter("low")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Baja
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-300 bg-transparent gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm h-9 px-2 sm:px-3"
                      >
                        Estado
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem
                        onClick={() => setEstadoFilter("all")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Todos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEstadoFilter("alineacion")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Alineación
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEstadoFilter("atraccion")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Atracción
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEstadoFilter("reclutamiento")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Reclutamiento
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEstadoFilter("seleccion")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Selección
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEstadoFilter("oferta")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Oferta
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEstadoFilter("onboarding")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Onboarding
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-300 bg-transparent gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm h-9 px-2 sm:px-3"
                      >
                        Área
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem
                        onClick={() => setAreaFilter("all")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Todas
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAreaFilter("Centro Histórico")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Centro Histórico
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAreaFilter("E commerce")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        E commerce
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAreaFilter("Polanco")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Polanco
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAreaFilter("GDL")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        GDL
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAreaFilter("Santa Fe")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Santa Fe
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAreaFilter("Corporativo")}
                        className="text-gray-700 text-xs sm:text-sm"
                      >
                        Corporativo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    onClick={handleCreateVacancy}
                    size="sm"
                    className="text-white font-semibold gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm h-9 px-2 sm:px-3"
                    style={{ backgroundColor: "#EC008C" }}
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Crear Vacante</span>
                    <span className="sm:hidden">Crear</span>
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 sm:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Prioridad
                        </th>
                        <th className="text-left py-2 sm:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 min-w-[180px] sm:min-w-[200px]">
                          Título de la Vacante
                        </th>
                        <th className="text-left py-2 sm:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 min-w-[150px] sm:min-w-[180px]">
                          Gerente Asignado
                        </th>
                        <th className="text-left py-2 sm:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Estado Actual
                        </th>
                        <th className="text-left py-2 sm:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVacancies.map((vacancy, index) => {
                        const statusBadge = getStatusBadge(vacancy.status)
                        return (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 sm:py-3 md:py-4 px-2 md:px-4">
                              <div className="flex items-center">
                                {vacancy.priority === "high" && (
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-red-500 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">!</span>
                                  </div>
                                )}
                                {vacancy.priority === "medium" && (
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-orange-400 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">!</span>
                                  </div>
                                )}
                                {vacancy.priority === "low" && (
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gray-300" />
                                )}
                              </div>
                            </td>
                            <td className="py-2 sm:py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 font-medium">
                              {vacancy.title}
                            </td>
                            <td className="py-2 sm:py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-600">
                              {vacancy.manager}
                            </td>
                            <td className="py-2 sm:py-3 md:py-4 px-2 md:px-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="text-xs md:text-sm text-gray-700 font-medium">{vacancy.location}</span>
                                <span
                                  className={`px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusBadge.bg} ${statusBadge.text}`}
                                >
                                  {statusBadge.label}
                                </span>
                              </div>
                            </td>
                            <td className="py-2 sm:py-3 md:py-4 px-2 md:px-4">
                              <div className="flex flex-col gap-0.5 sm:gap-1">
                                <button
                                  className="text-xs text-left hover:underline"
                                  style={{ color: "#1976D2" }}
                                  onClick={() => handleViewClick(vacancy)}
                                >
                                  Ver
                                </button>
                                {userRole === "adminRH" && (
                                  <>
                                    <button
                                      className="text-xs text-left hover:underline"
                                      style={{ color: "#1976D2" }}
                                      onClick={() => handleEditClick(vacancy)}
                                    >
                                      Editar
                                    </button>
                                    <button
                                      className="text-xs text-left hover:underline"
                                      style={{ color: "#1976D2" }}
                                      onClick={() => handleDeleteClick(vacancy)}
                                    >
                                      Eliminar
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mt-3 sm:mt-4 md:mt-6 gap-2 sm:gap-3 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>Mostrando 1-10 de {filteredVacancies.length} resultados</span>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6 mx-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center font-heading">
              Confirmar Eliminación
            </h2>

            <div className="flex justify-center mb-3 sm:mb-4">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#EC008C" }}
              >
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>

            <p className="text-center text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              ¿Estás seguro de que quieres eliminar la vacante{" "}
              <span className="font-semibold" style={{ color: "#EC008C" }}>
                {vacancyToDelete?.title}
              </span>
              ?
            </p>

            <div className="flex gap-2 sm:gap-3 justify-center">
              <Button
                onClick={confirmDelete}
                className="text-white font-semibold px-4 sm:px-6 text-xs sm:text-sm h-9 sm:h-10"
                style={{ backgroundColor: "#EC008C" }}
              >
                Eliminar
              </Button>
              <Button
                onClick={cancelDelete}
                variant="outline"
                className="px-4 sm:px-6 border-gray-300 text-gray-700 bg-transparent text-xs sm:text-sm h-9 sm:h-10"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

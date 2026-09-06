"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Check,
  ChevronLeft,
  Search,
  AlertCircle,
  X,
  Shield,
  Linkedin,
  Clock,
  AlertTriangle,
  Download,
  Trash2,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { Footer } from "./footer"
import Image from "next/image"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Vacancy = {
  priority: string
  title: string
  manager: string
  location: string
  area: string
  status: string
  salary?: string
  employmentType?: string
  description?: string
  hardSkills?: string[]
  softSkills?: string[]
}

type TrackingViewPageProps = {
  vacancy: Vacancy
  onBack: () => void
}

export function TrackingViewPage({ vacancy, onBack }: TrackingViewPageProps) {
  const [currentView, setCurrentView] = useState<
    "candidate" | "alineacion" | "atraccion" | "reclutamiento" | "seleccion" | "oferta" | "onboarding"
  >("alineacion")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const [newNote, setNewNote] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("")
  const [candidatesData, setCandidatesData] = useState([
    {
      id: 1,
      name: "Sofía Pérez",
      candidateId: "ID",
      applicationDate: "2024-10-25",
      status: "Revisada",
      responsible: "Ana Torres",
      compatibility: 95,
      documents: [
        { name: "CV_Sofia_Perez.pdf", type: "pdf" },
        { name: "Carta_Recomendacion_EmpresaX.pdf", type: "pdf" },
        { name: "Certificado Habilidades_JS.png", type: "image" },
      ],
      notes: [
        {
          author: "Ana Torres",
          date: "2024-09-26",
          content: "Entrevista inicial muy positiva. Sólidos conocimientos técnicos en JavaScript y Actitud proactiva.",
        },
        {
          author: "Ana Torres",
          date: "2024-09-27",
          content: "Cumplió prueba técnica con un 95% Liderando demostrado necesario a resolución a problemas.",
        },
      ],
      technicalSkills: ["Javascript", "Node.js", "MongoDB", "AWS"],
      softSkills: ["Liderazgo", "Trabajo en equipo", "Resolución de problemas", "Adaptabilidad"],
    },
    {
      id: 2,
      name: "Sofía Pérez",
      candidateId: "C-0101",
      applicationDate: "2024-10-24",
      status: "Preseleccionado",
      responsible: "Ana Torres",
      compatibility: 88,
      documents: [{ name: "CV_Sofia_Perez_v2.pdf", type: "pdf" }],
      notes: [
        {
          author: "Luis Pérez",
          date: "2024-09-25",
          content: "Candidato con buen perfil técnico.",
        },
      ],
      technicalSkills: ["Javascript", "React", "Node.js"],
      softSkills: ["Comunicación", "Trabajo en equipo"],
    },
    {
      id: 3,
      name: "Juan Garez",
      candidateId: "C-0102",
      applicationDate: "2024-10-23",
      status: "Revisada",
      responsible: "Comisión",
      compatibility: 75,
      documents: [],
      notes: [],
      technicalSkills: ["Python", "Django"],
      softSkills: ["Adaptabilidad"],
    },
    {
      id: 4,
      name: "Juan Rodriguez",
      candidateId: "C-0102",
      applicationDate: "2024-10-22",
      status: "Revisada",
      responsible: "Fabián prog.",
      compatibility: 40,
      documents: [],
      notes: [],
      technicalSkills: ["Java"],
      softSkills: ["Liderazgo"],
    },
    {
      id: 5,
      name: "Laura Fernández",
      candidateId: "C-0105",
      applicationDate: "2024-10-21",
      status: "Preseleccionado",
      responsible: "Luis Pérez",
      compatibility: 40,
      documents: [],
      notes: [],
      technicalSkills: ["PHP", "MySQL"],
      softSkills: ["Trabajo en equipo"],
    },
    {
      id: 6,
      name: "Carlos López",
      candidateId: "C-0104",
      applicationDate: "2024-10-20",
      status: "Remuneración",
      responsible: "Entrevista prag.",
      compatibility: 0,
      documents: [],
      notes: [],
      technicalSkills: [],
      softSkills: [],
    },
  ])

  const stages = [
    { id: 1, name: "Alineación", status: "alineacion" },
    { id: 2, name: "Atracción", status: "atraccion" },
    { id: 3, name: "Reclutamiento", status: "reclutamiento" },
    { id: 4, name: "Selección", status: "seleccion" },
    { id: 5, name: "Oferta", status: "oferta" },
    { id: 6, name: "Onboarding", status: "onboarding" },
  ]

  const currentStageIndex = stages.findIndex((stage) => stage.status === vacancy.status)

  const getStageStatus = (index: number) => {
    if (index < currentStageIndex) return "completed"
    if (index === currentStageIndex) return "current"
    return "pending"
  }

  const handleStageClick = (stageName: string) => {
    const stageMap: Record<string, typeof currentView> = {
      Alineación: "alineacion",
      Atracción: "atraccion",
      Reclutamiento: "reclutamiento",
      Selección: "seleccion",
      Oferta: "oferta",
      Onboarding: "onboarding",
    }

    const view = stageMap[stageName]
    if (view) {
      setCurrentView(view)
    }
  }

  const applications = [
    {
      approvalStatus: "Aprobado",
      candidate: "Juan García",
      platform: "LinkedIn",
      status: "Vea López",
      dateEntered: "2024-05-10",
      assigned: "Sofía P.",
    },
    {
      approvalStatus: "Pendiente",
      candidate: "María López",
      platform: "Indeed",
      status: "Pendiente",
      dateEntered: "2024-05-10",
      assigned: "Sofía R.",
    },
    {
      approvalStatus: "Rechazado",
      candidate: "Carlos Ruiz",
      platform: "LinkedIn",
      status: "En Progreso",
      dateEntered: "2024-05-08",
      assigned: "Fabián prog.",
    },
    {
      approvalStatus: "Aprobado",
      candidate: "María Fernández",
      platform: "Computrabajo",
      status: "Luis Pérez",
      dateEntered: "2024-05-07",
      assigned: "Entrevista prag.",
    },
  ]

  const filteredApplications = applications.filter((app) => {
    return (
      app.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.approvalStatus.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Mock candidate data
  const candidate = {
    name: "Sofía Pérez Rodríguez",
    position: "Desarrolladora de Software Senior",
    daysInStage: 5,
    compatibility: 85,
    hardSkills: ["Javascript", "React", "Node.js", "SQL", "MongoDB", "Python", "AWS"],
    softSkills: ["Liderazgo", "Trabajo en equipo", "Comunicación", "Resolución de problemas", "Adaptabilidad"],
  }

  // Modified candidatesData to be mutable via setCandidatesData
  const sortedCandidates = [...candidatesData].sort((a, b) => b.compatibility - a.compatibility)

  const handleCandidateClick = (candidateId: number) => {
    setSelectedCandidate(candidateId)
  }

  const handleBackToCandidates = () => {
    setSelectedCandidate(null)
  }

  const handleSaveNote = () => {
    if (newNote.trim() && selectedCandidate) {
      const today = new Date().toISOString().split("T")[0]
      setCandidatesData((prevData) =>
        prevData.map((candidate) =>
          candidate.id === selectedCandidate
            ? {
                ...candidate,
                notes: [
                  ...candidate.notes,
                  {
                    author: "RH Liverpool",
                    date: today,
                    content: newNote.trim(),
                  },
                ],
              }
            : candidate,
        ),
      )
      setNewNote("")
    }
  }

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim() && selectedCandidate) {
      setCandidatesData((prevData) =>
        prevData.map((candidate) =>
          candidate.id === selectedCandidate
            ? {
                ...candidate,
                softSkills: [...candidate.softSkills, newSoftSkill.trim()],
              }
            : candidate,
        ),
      )
      setNewSoftSkill("")
    }
  }

  const handleRemoveSoftSkill = (skillToRemove: string) => {
    if (selectedCandidate) {
      setCandidatesData((prevData) =>
        prevData.map((candidate) =>
          candidate.id === selectedCandidate
            ? {
                ...candidate,
                softSkills: candidate.softSkills.filter((skill) => skill !== skillToRemove),
              }
            : candidate,
        ),
      )
    }
  }

  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim() && selectedCandidate) {
      setCandidatesData((prevData) =>
        prevData.map((candidate) =>
          candidate.id === selectedCandidate
            ? {
                ...candidate,
                technicalSkills: [...candidate.technicalSkills, newTechnicalSkill.trim()],
              }
            : candidate,
        ),
      )
      setNewTechnicalSkill("")
    }
  }

  const handleRemoveTechnicalSkill = (skillToRemove: string) => {
    if (selectedCandidate) {
      setCandidatesData((prevData) =>
        prevData.map((candidate) =>
          candidate.id === selectedCandidate
            ? {
                ...candidate,
                technicalSkills: candidate.technicalSkills.filter((skill) => skill !== skillToRemove),
              }
            : candidate,
        ),
      )
    }
  }

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 80) return "#4CAF50" // Green
    if (compatibility >= 60) return "#FFC107" // Yellow
    return "#F44336" // Red
  }

  const selectedCandidateData = candidatesData.find((c) => c.id === selectedCandidate)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="text-white shadow-md" style={{ backgroundColor: "#EC008C" }}>
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
          <div className="relative h-10 w-32 sm:h-12 sm:w-40 md:h-16 md:w-52">
            <Image src="/liverpool-logo.png" alt="Liverpool" fill className="object-contain" priority />
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
            <span className="text-xs sm:text-sm font-medium">Hola, RH Liverpool</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="hidden lg:block w-64 xl:w-72 bg-white shadow-md p-4 xl:p-6">
          <div className="mb-4 xl:mb-6">
            <h2 className="text-base xl:text-lg font-bold mb-2" style={{ color: "#C2185B" }}>
              Panel de Control de RH
            </h2>
          </div>

          <div className="mb-3 xl:mb-4">
            <h3 className="text-sm font-semibold mb-3 xl:mb-4" style={{ color: "#C2185B" }}>
              Seguimiento del Proceso
            </h3>
          </div>

          <div className="space-y-0">
            <style jsx>{`
              @keyframes fillCircle {
                from {
                  transform: scale(0.8);
                  opacity: 0.5;
                }
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
              .stage-circle {
                transition: all 0.3s ease-in-out;
              }
              .stage-circle.active {
                animation: fillCircle 0.4s ease-out;
              }
              .stage-circle:hover {
                transform: scale(1.1);
              }
            `}</style>
            {stages.map((stage, index) => {
              const status = getStageStatus(index)
              const isActive = currentView === stage.status
              return (
                <div key={stage.id} className="flex items-start">
                  <div className="flex flex-col items-center mr-3 xl:mr-4">
                    {/* Circle/Checkmark */}
                    <div
                      className={`stage-circle w-8 h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center font-bold text-xs xl:text-sm ${
                        status === "completed"
                          ? "text-white"
                          : status === "current"
                            ? "text-white"
                            : "bg-gray-200 text-gray-500"
                      } ${isActive ? "active" : ""}`}
                      style={{
                        backgroundColor: status === "completed" || status === "current" ? "#C2185B" : undefined,
                      }}
                    >
                      {status === "completed" ? <Check className="w-4 h-4 xl:w-5 xl:h-5" /> : stage.id}
                    </div>
                    {/* Vertical line */}
                    {index < stages.length - 1 && (
                      <div
                        className="w-0.5 h-10 xl:h-12 transition-all duration-300"
                        style={{ backgroundColor: status === "completed" ? "#C2185B" : "#E0E0E0" }}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => handleStageClick(stage.name)}
                    className={`py-1.5 xl:py-2 px-3 xl:px-4 rounded flex-1 text-left hover:bg-pink-50 transition-colors ${isActive ? "bg-pink-50" : ""}`}
                    style={{ marginTop: "4px" }}
                  >
                    <span
                      className={`text-xs xl:text-sm font-medium ${isActive ? "font-semibold" : ""}`}
                      style={{ color: isActive ? "#C2185B" : "#424242" }}
                    >
                      {stage.name}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </aside>

        <div className="lg:hidden bg-white border-b border-gray-200 p-3 sm:p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-xs sm:text-sm h-9 sm:h-10 bg-transparent"
                style={{ borderColor: "#C2185B", color: "#C2185B" }}
              >
                <span className="font-semibold">
                  {stages.find((s) => s.status === currentView)?.name || "Seleccionar Etapa"}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-white">
              {stages.map((stage) => (
                <DropdownMenuItem
                  key={stage.id}
                  onClick={() => handleStageClick(stage.name)}
                  className={`text-xs sm:text-sm ${currentView === stage.status ? "bg-pink-50 font-semibold" : ""}`}
                  style={{ color: currentView === stage.status ? "#C2185B" : "#424242" }}
                >
                  {stage.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="mb-4 sm:mb-6">
            <Button
              onClick={onBack}
              variant="ghost"
              className="mb-3 sm:mb-4 text-gray-600 hover:text-gray-900 -ml-2 text-xs sm:text-sm h-8 sm:h-10"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              Volver
            </Button>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              Panel de Control de RH
            </h1>
          </div>

          {currentView === "candidate" && (
            <>
              {/* Candidate Card */}
              <Card className="p-4 sm:p-6 bg-white shadow-sm mb-4 sm:mb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{candidate.name}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-1">{candidate.position}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      <span className="font-medium">Vacante:</span> {vacancy.title}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="px-3 sm:px-4 py-2 rounded text-center" style={{ backgroundColor: "#C2185B" }}>
                      <div className="text-xl sm:text-2xl font-bold text-white">{candidate.daysInStage}</div>
                      <div className="text-xs text-white">días en Reclutamiento</div>
                    </div>

                    <div className="px-3 sm:px-4 py-2 rounded text-center" style={{ backgroundColor: "#FCE4EC" }}>
                      <div className="text-xs sm:text-sm font-semibold mb-1" style={{ color: "#C2185B" }}>
                        Compatibilidad
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold" style={{ color: "#C2185B" }}>
                        {candidate.compatibility}%
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Skills Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Hard Skills */}
                <Card className="p-4 sm:p-6 bg-white shadow-sm">
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: "#C2185B" }}>
                    Hard Skills
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {candidate.hardSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="border-l-4 pl-3 sm:pl-4 py-1.5 sm:py-2"
                        style={{ borderColor: "#C2185B", backgroundColor: "#FCE4EC" }}
                      >
                        <span className="text-xs sm:text-sm font-medium" style={{ color: "#C2185B" }}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Soft Skills */}
                <Card className="p-4 sm:p-6 bg-white shadow-sm">
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: "#C2185B" }}>
                    Soft Skills
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {candidate.softSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="border-l-4 pl-3 sm:pl-4 py-1.5 sm:py-2"
                        style={{ borderColor: "#C2185B", backgroundColor: "#FCE4EC" }}
                      >
                        <span className="text-xs sm:text-sm font-medium" style={{ color: "#C2185B" }}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}

          {currentView === "alineacion" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column - Vacancy Details and Applications */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <Card className="p-4 sm:p-6 bg-white shadow-sm">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                    Gerente de Tienda - Centro Histórico /
                  </h2>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">ID:</span> VT-1234
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Departamento:</span> Ventas
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-gray-600">Estado general:</span>
                      <span className="text-gray-900">En Alineación (50%)</span>
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Responsable:</span> Sofía Pérez
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-gray-600">Prioridad:</span>
                      <span className="text-gray-900">Alta</span>
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Total solicitudes (Fase actual):</span> 45
                    </p>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6 bg-white shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">4ª Solicitudes / Revisones</h2>
                    <Button size="sm" className="text-white mt-2 sm:mt-0" style={{ backgroundColor: "#C2185B" }}>
                      Actualizar perfil
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Estado</th>
                          <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Candidato</th>
                          <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Plataforma</th>
                          <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Fecha Ingreso</th>
                          <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Asignado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  app.approvalStatus === "Aprobado"
                                    ? "bg-green-100 text-green-800"
                                    : app.approvalStatus === "Rechazado"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {app.approvalStatus}
                              </span>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-900">{app.candidate}</td>
                            <td className="py-2 px-2">
                              <div className="flex items-center gap-1 sm:gap-2">
                                {app.platform === "LinkedIn" && (
                                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#0A66C2" }} />
                                )}
                                <span className="text-xs sm:text-sm text-gray-700">{app.platform}</span>
                              </div>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">{app.dateEntered}</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">{app.assigned}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between">
                    <div className="flex gap-1 sm:gap-2">
                      <button className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600">
                        ‹
                      </button>
                      <button className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600">
                        ›
                      </button>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Filtrar por candidato..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-7 sm:pl-10 border-gray-300 text-xs sm:text-sm w-48 sm:w-64"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6 bg-white shadow-sm">
                  <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: "#C2185B" }}>
                    2º Perfil del Puesto
                  </h2>

                  <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-gray-900">
                    Competencias de la «pientos
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 p-2 sm:p-3 bg-pink-50 rounded border border-pink-200">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <span className="text-xs sm:text-sm text-gray-900">Competencias Técnicas</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-3 bg-pink-50 rounded border border-pink-200">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <span className="text-xs sm:text-sm text-gray-900">Competencias Técnicas</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-3 bg-pink-50 rounded border border-pink-200">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#C2185B" }} />
                      <span className="text-xs sm:text-sm text-gray-900">Escolarido</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-3 bg-pink-50 rounded border border-pink-200">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <span className="text-xs sm:text-sm text-gray-900">Escolaridad</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-3 bg-pink-50 rounded border border-pink-200">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <span className="text-xs sm:text-sm text-gray-900">Soft Skills</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-3 bg-pink-50 rounded border border-pink-200">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      <span className="text-xs sm:text-sm text-gray-900">Experiencia</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column - Mini Dashboard */}
              <div className="lg:col-span-1">
                <Card className="p-4 sm:p-6 bg-white shadow-sm sticky top-4">
                  <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: "#C2185B" }}>
                    7º Mini-dashboard
                  </h2>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="pb-3 sm:pb-4 border-b border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Alineación Completada:</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">50%</p>
                    </div>

                    <div className="pb-3 sm:pb-4 border-b border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Solicitudes Revisadas:</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">1/4</p>
                    </div>

                    <div className="pb-3 sm:pb-4 border-b border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Riesgos:</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">1</p>
                      <p className="text-xs text-gray-500 mt-1">(Faltan referencias)</p>
                    </div>

                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Vacantes Críticas:</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentView === "atraccion" && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: "#C2185B" }}>
                Información de Publicación
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                  {/* Publication Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* LinkedIn Card */}
                    <Card className="p-4 sm:p-5 bg-white shadow-sm">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#0A66C2" }} />
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">LinkedIn</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        <span className="text-xs sm:text-sm font-medium text-green-600">Publicada</span>
                      </div>
                      <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-600 mb-2 sm:mb-3">
                        <p>Lanzamiento: 01/11/2023</p>
                        <p>Responsable: Ana Gómez</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1 sm:mb-2">
                        <div
                          className="h-1.5 sm:h-2 rounded-full"
                          style={{ width: "60%", backgroundColor: "#C2185B" }}
                        ></div>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">9 días restantes</p>
                    </Card>

                    {/* Indeed Card */}
                    <Card className="p-4 sm:p-5 bg-white shadow-sm">
                      <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                          <span className="font-bold text-base sm:text-lg" style={{ color: "#2196F3" }}>
                            indeed
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        <span className="text-xs sm:text-sm font-medium text-orange-500">Pendiente</span>
                      </div>
                      <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-600 mb-2 sm:mb-3">
                        <p>Lanzamiento: 08/11/2023</p>
                        <p>Expiración: Ana Gómez</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1 sm:mb-2">
                        <div
                          className="h-1.5 sm:h-2 rounded-full"
                          style={{ width: "40%", backgroundColor: "#C2185B" }}
                        ></div>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">9 días restantes</p>
                    </Card>

                    {/* Third Platform Card */}
                    <Card className="p-4 sm:p-5 bg-white shadow-sm">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded"></div>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">Otra Plataforma</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        <span className="text-xs sm:text-sm font-medium text-orange-500">Pendiente</span>
                      </div>
                      <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-600 mb-2 sm:mb-3">
                        <p>Lanzamiento: 08/11/2023</p>
                        <p>Responsable: Ana Gómez</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1 sm:mb-2">
                        <div
                          className="h-1.5 sm:h-2 rounded-full"
                          style={{ width: "20%", backgroundColor: "#C2185B" }}
                        ></div>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">3 días</p>
                    </Card>
                  </div>

                  {/* Charts Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Bar Chart - Solicitudes por Canal */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                        Solicitudes por Canal
                      </h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                          data={[
                            { name: "LinkedIn", value: 70 },
                            { name: "Indeed", value: 35 },
                            { name: "Bolsa Interna", value: 15 },
                            { name: "Universidades", value: 5 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#4CAF50" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>

                    {/* Donut Chart - Distribución de Candidatos */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                        Distribución de Candidatos
                      </h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Rechazada", value: 40 },
                              { name: "En proceso", value: 30 },
                              { name: "Revisada", value: 25 },
                              { name: "Asignadas", value: 5 },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, value }) => `${name} (${value}%)`}
                          >
                            <Cell fill="#E91E63" />
                            <Cell fill="#2196F3" />
                            <Cell fill="#4CAF50" />
                            <Cell fill="#FFC107" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>

                  {/* Charts Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Line Chart - Evolución Semanal */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                        Evolución Semanal de Solisitudes
                      </h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart
                          data={[
                            { semana: 1, solicitudes: 10 },
                            { semana: 2, solicitudes: 12 },
                            { semana: 3, solicitudes: 40 },
                            { semana: 4, solicitudes: 40 },
                            { semana: 5, solicitudes: 40 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="semana" label={{ value: "Semana", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Nº Solicitudes", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="solicitudes" stroke="#2196F3" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>

                    {/* Line Chart - Tasa de Conversión */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Tasa de Conversión</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart
                          data={[
                            { semana: 1, tasa: 2 },
                            { semana: 2, tasa: 5 },
                            { semana: 3, tasa: 3 },
                            { semana: 4, tasa: 4 },
                            { semana: 5, tasa: 5 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="semana" label={{ value: "Semana", position: "insideBottom", offset: -5 }} />
                          <YAxis label={{ value: "Nº Solicitudes", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="tasa" stroke="#2196F3" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                </div>

                {/* Right Column - Summary Cards */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Estado general */}
                  <Card className="p-4 sm:p-6 text-white shadow-sm" style={{ backgroundColor: "#C2185B" }}>
                    <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Estado general del proceso</h3>
                    <p className="text-xl sm:text-2xl font-bold">Publicada</p>
                  </Card>

                  {/* Número total de solicitudes */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">
                      Número total de solicitudes
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">125</p>
                  </Card>

                  {/* Tasa de Conversión */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">Tasa de Conversión</h3>
                    <p className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2" style={{ color: "#C2185B" }}>
                      85%
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                      <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                      <span>3 Vacantes</span>
                    </div>
                    <p className="text-xs text-gray-500">125 recibidas / 150 esperadas</p>
                  </Card>

                  {/* Tiempo Promedio */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2">
                      Tiempo Promedio de Aplicación
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">5 días</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentView === "reclutamiento" && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">Gerente de Tienda Senior</h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                  {/* Vacancy Header */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                          Gerente a Tienda Senior - Área
                        </h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                          <span
                            className="px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs font-semibold text-white"
                            style={{ backgroundColor: "#C2185B" }}
                          >
                            ESTADO: LANZAMIENTO
                          </span>
                          <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs font-semibold bg-gray-200 text-gray-700">
                            Ventas / Retail
                          </span>
                          <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs font-semibold bg-red-600 text-white">
                            ALTA
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Perfil de Reclutamiento para Comercial</p>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="flex items-center gap-0.5 sm:gap-1 text-orange-600">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-semibold">5</span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600">Responsable: Publicaciones</span>
                        </div>
                      </div>
                      <div
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded text-center text-white font-semibold text-xs sm:text-sm"
                        style={{ backgroundColor: "#4CAF50" }}
                      >
                        ACTIVO
                      </div>
                    </div>
                  </Card>

                  {/* Summary Cards Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Interesados / En Proceso Card */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                        Interesados / En Proceso
                      </h3>
                      <div className="flex flex-col items-center mb-3 sm:mb-4">
                        <div className="relative w-24 sm:w-32 h-24 sm:h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[{ value: 75 }]}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                startAngle={90}
                                endAngle={450}
                                dataKey="value"
                                strokeWidth={0}
                              >
                                <Cell fill="#6B7280" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-3xl sm:text-4xl font-bold text-gray-900">75</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>10/100</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div className="h-1.5 sm:h-2 rounded-full bg-green-500" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </Card>

                    {/* Eliminamos Rechazados Card */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                        Eliminamos Rechazados
                      </h3>
                      <div className="flex flex-col items-center mb-3 sm:mb-4">
                        <div className="relative w-24 sm:w-32 h-24 sm:h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[{ value: 40 }]}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                startAngle={90}
                                endAngle={450}
                                dataKey="value"
                                strokeWidth={0}
                              >
                                <Cell fill="#6B7280" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-3xl sm:text-4xl font-bold text-gray-900">40</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>10/100</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div className="h-1.5 sm:h-2 rounded-full bg-red-500" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Fechas Clave */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Fechas Clave</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5 sm:mb-1">Inicio</p>
                        <p className="text-xs text-gray-600">Fecha Publicación</p>
                        <p className="text-xs text-gray-600">15 Nov</p>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-300 mx-1 sm:mx-2"></div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5 sm:mb-1">Entrega</p>
                        <p className="text-xs text-gray-600">Postulación</p>
                        <p className="text-xs text-gray-600">10 Dic</p>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-300 mx-1 sm:mx-2"></div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5 sm:mb-1">Entrevista</p>
                        <p className="text-xs text-gray-600">Técnica</p>
                        <p className="text-xs text-gray-600">15 Dic</p>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-300 mx-1 sm:mx-2"></div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5 sm:mb-1">Entrevista</p>
                        <p className="text-xs text-gray-600">Gerencial</p>
                        <p className="text-xs text-gray-600">20 Dic</p>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-300 mx-1 sm:mx-2"></div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5 sm:mb-1">Cierre</p>
                        <p className="text-xs text-gray-600">25 Dic</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Próximas Entrevistas */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Próximas Entrevistas</h3>
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart
                        data={[
                          { date: "15/Dic", value: 2 },
                          { date: "16/Dic", value: 3 },
                          { date: "17/Dic", value: 2 },
                          { date: "18/Dic", value: 1 },
                        ]}
                        layout="vertical"
                      >
                        <XAxis type="number" />
                        <YAxis dataKey="date" type="category" tick={{ fontSize: 10 }} />
                        <Bar dataKey="value" fill="#C2185B" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">15/Dic: Juan Pérez (Más 1)</span>
                        <span className="text-gray-600">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alicia Sánchez (Más 1)</span>
                        <span className="text-gray-600">25%</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentView === "seleccion" && (
            <div>
              {!selectedCandidate ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* Left Column - Vacancy Details and Candidates Table */}
                  <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                    {/* Vacancy Header */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3 sm:mb-4">
                        <div className="flex-1">
                          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            Gerente de Tienda - Centro Histórico
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3">VAC-00589</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
                            <p className="text-gray-600">
                              <span className="font-semibold">Departamento:</span> Retail Operaciones
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Responsable:</span> Sofía Pérez Rodríguez
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Área:</span> Ventas
                            </p>
                            <p className="text-gray-600">
                              <span className="font-semibold">Prioridad:</span> Alta
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div
                            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded text-center text-white font-semibold text-xs sm:text-sm"
                            style={{ backgroundColor: "#4CAF50" }}
                          >
                            Estado: En Selección
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded bg-red-50 border border-red-200">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                            <span className="text-xs sm:text-sm font-semibold text-red-600">
                              5 Pendientes de Revisión
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Candidates Table */}
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b-2 border-gray-200">
                              <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">#</th>
                              <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">
                                Candidato (ID)
                              </th>
                              <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">
                                Fecha de Aplicación
                              </th>
                              <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Estado</th>
                              <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Responsable</th>
                              <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">
                                Compatibilidad
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedCandidates.map((candidate, index) => (
                              <tr
                                key={candidate.id}
                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleCandidateClick(candidate.id)}
                              >
                                <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">{index + 1}</td>
                                <td className="py-2 px-2 text-xs sm:text-sm text-gray-900 font-medium hover:text-pink-600">
                                  {candidate.name} ({candidate.candidateId})
                                </td>
                                <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">
                                  {candidate.applicationDate}
                                </td>
                                <td className="py-2 px-2">
                                  <span
                                    className={`inline-block px-1.5 py-0.5 rounded text-xs ${
                                      candidate.status === "Revisada"
                                        ? "bg-blue-100 text-blue-800"
                                        : candidate.status === "Preseleccionado"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {candidate.status}
                                  </span>
                                </td>
                                <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">{candidate.responsible}</td>
                                <td className="py-2 px-2">
                                  <span
                                    className="text-base sm:text-lg font-bold"
                                    style={{
                                      color:
                                        candidate.compatibility >= 80
                                          ? "#4CAF50"
                                          : candidate.compatibility >= 50
                                            ? "#FFC107"
                                            : "#F44336",
                                    }}
                                  >
                                    {candidate.compatibility}%
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-3 sm:mt-4 flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600">1-5 de 125</span>
                      </div>
                    </Card>
                  </div>

                  {/* Right Column - Circular Progress Indicator */}
                  <div className="lg:col-span-1">
                    <Card className="p-4 sm:p-6 bg-white shadow-sm">
                      <div className="flex flex-col items-center">
                        <div className="relative w-full" style={{ height: "280px" }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Pendientes", value: 20 },
                                  { name: "Seleccionados", value: 15 },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                startAngle={180}
                                endAngle={-180}
                                dataKey="value"
                                strokeWidth={0}
                              >
                                <Cell fill="#C2185B" />
                                <Cell fill="#4CAF50" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-5xl font-bold text-gray-900">125</p>
                          </div>
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">Candidatos en Selección</p>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={handleBackToCandidates}
                    variant="ghost"
                    className="mb-3 sm:mb-4 text-gray-600 hover:text-gray-900 -ml-2 text-xs sm:text-sm h-8 sm:h-10"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                    Volver a candidatos
                  </Button>

                  <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: "#C2185B" }}>
                    Evaluación Final y Oferta ({selectedCandidateData?.candidateId})
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                      {/* Timeline - Fechas Clave y Avance del Proceso */}
                      <Card className="p-4 sm:p-6 bg-white shadow-sm">
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                          Fechas Clave y Avance del Proceso
                        </h3>
                        <style jsx>{`
                          @keyframes slideUp {
                            from {
                              opacity: 0;
                              transform: translateY(20px);
                            }
                            to {
                              opacity: 1;
                              transform: translateY(0);
                            }
                          }
                          @keyframes growHeight {
                            from {
                              height: 0;
                            }
                            to {
                              height: 4rem;
                            }
                          }
                          .timeline-milestone {
                            animation: slideUp 0.6s ease-out forwards;
                          }
                          .timeline-milestone:nth-child(1) {
                            animation-delay: 0.1s;
                          }
                          .timeline-milestone:nth-child(3) {
                            animation-delay: 0.2s;
                          }
                          .timeline-milestone:nth-child(5) {
                            animation-delay: 0.3s;
                          }
                          .timeline-milestone:nth-child(7) {
                            animation-delay: 0.4s;
                          }
                          .timeline-bar {
                            animation: growHeight 0.8s ease-out forwards;
                          }
                        `}</style>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col items-center timeline-milestone">
                            <div className="w-1 h-16 bg-green-500 mb-2 timeline-bar"></div>
                            <p className="text-xs font-semibold text-gray-900">Inicio Selección: 15 Nov</p>
                            <p className="text-xs text-gray-600">Hoy: 20 Nov</p>
                          </div>
                          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                          <div className="flex flex-col items-center timeline-milestone">
                            <div className="w-1 h-16 bg-orange-500 mb-2 timeline-bar"></div>
                            <p className="text-xs font-semibold text-gray-900">Oferta Emitida: 30 Nov</p>
                          </div>
                          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                          <div className="flex flex-col items-center timeline-milestone">
                            <div className="w-1 h-16 bg-blue-500 mb-2 timeline-bar"></div>
                            <p className="text-xs font-semibold text-gray-900">Contratación</p>
                          </div>
                          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                          <div className="flex flex-col items-center timeline-milestone">
                            <div className="w-1 h-16 bg-purple-500 mb-2 timeline-bar"></div>
                            <p className="text-xs font-semibold text-gray-900">Onboarding</p>
                          </div>
                        </div>
                      </Card>

                      {/* Documents and Notes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Documentos Adjuntos */}
                        <Card className="p-4 sm:p-6 bg-white shadow-sm">
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">Documentos Adjuntos</h3>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-2 sm:space-3">
                            {selectedCandidateData?.documents.map((doc, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded hover:bg-gray-50"
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-semibold text-gray-600">
                                      {doc.type === "pdf" ? "PDF" : "IMG"}
                                    </span>
                                  </div>
                                  <span className="text-xs sm:text-sm text-gray-900">{doc.name}</span>
                                </div>
                                <div className="flex gap-1 sm:gap-2">
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <Download className="w-4 h-4 text-gray-600" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <Trash2 className="w-4 h-4 text-gray-600" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button
                            variant="link"
                            className="mt-3 sm:mt-4 text-xs sm:text-sm"
                            style={{ color: "#C2185B" }}
                          >
                            Subir Nuevo Documento
                          </Button>
                        </Card>

                        {/* Notas de Evaluación */}
                        <Card className="p-4 sm:p-6 bg-white shadow-sm">
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">Notas de Evaluación</h3>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-h-64 overflow-y-auto">
                            {selectedCandidateData?.notes.map((note, index) => (
                              <div key={index} className="flex gap-2 sm:gap-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-semibold" style={{ color: "#C2185B" }}>
                                    {note.author.charAt(0)}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                      {note.author}
                                    </span>
                                    <span className="text-xs text-gray-500">{note.date}</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-700">{note.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Agregar una nota..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && handleSaveNote()}
                              className="flex-1 text-xs sm:text-sm"
                            />
                            <Button
                              onClick={handleSaveNote}
                              className="text-white text-xs sm:text-sm"
                              style={{ backgroundColor: "#2196F3" }}
                            >
                              Guardar
                            </Button>
                          </div>
                        </Card>
                      </div>

                      <Card className="p-4 sm:p-6 bg-white shadow-sm">
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: "#C2185B" }}>
                          Competencias Técnicas
                        </h3>
                        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                          {selectedCandidateData?.technicalSkills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between gap-2 p-2 bg-pink-50 rounded">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Check className="w-3 h-3 sm:w-4 h-4 text-green-600" />
                                <span className="text-xs sm:text-sm text-gray-900">{skill}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-red-100"
                                onClick={() => handleRemoveTechnicalSkill(skill)}
                              >
                                <X className="w-3 h-3 sm:w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Agregar competencia técnica..."
                            value={newTechnicalSkill}
                            onChange={(e) => setNewTechnicalSkill(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAddTechnicalSkill()}
                            className="flex-1 text-xs sm:text-sm"
                          />
                          <Button
                            onClick={handleAddTechnicalSkill}
                            className="text-white text-xs sm:text-sm"
                            style={{ backgroundColor: "#C2185B" }}
                          >
                            Agregar
                          </Button>
                        </div>
                      </Card>

                      {/* Soft Skills - Now Functional */}
                      <Card className="p-4 sm:p-6 bg-white shadow-sm">
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: "#C2185B" }}>
                          Soft Skills
                        </h3>
                        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                          {selectedCandidateData?.softSkills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between gap-2 p-2 bg-pink-50 rounded">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Check className="w-3 h-3 sm:w-4 h-4 text-green-600" />
                                <span className="text-xs sm:text-sm text-gray-900">{skill}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-red-100"
                                onClick={() => handleRemoveSoftSkill(skill)}
                              >
                                <X className="w-3 h-3 sm:w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Agregar soft skill..."
                            value={newSoftSkill}
                            onChange={(e) => setNewSoftSkill(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAddSoftSkill()}
                            className="flex-1 text-xs sm:text-sm"
                          />
                          <Button
                            onClick={handleAddSoftSkill}
                            className="text-white text-xs sm:text-sm"
                            style={{ backgroundColor: "#C2185B" }}
                          >
                            Agregar
                          </Button>
                        </div>
                      </Card>
                    </div>

                    {/* Right Column - Circular Progress Indicator */}
                    <div className="lg:col-span-1">
                      <Card className="p-4 sm:p-6 bg-white shadow-sm sticky top-4">
                        <div className="flex flex-col items-center">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
                            Indicadores de Avance
                          </h3>
                          <div className="relative w-full" style={{ height: "150px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: "Pendiente", value: 100 - (selectedCandidateData?.compatibility || 0) },
                                    { name: "Completado", value: selectedCandidateData?.compatibility || 0 },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={60}
                                  startAngle={180}
                                  endAngle={-180}
                                  dataKey="value"
                                  strokeWidth={0}
                                >
                                  <Cell fill="#E0E0E0" />
                                  <Cell fill={getCompatibilityColor(selectedCandidateData?.compatibility || 0)} />
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p
                                className="text-2xl sm:text-3xl font-bold"
                                style={{ color: getCompatibilityColor(selectedCandidateData?.compatibility || 0) }}
                              >
                                {selectedCandidateData?.compatibility}%
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mt-2">Compatibilidad</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentView === "oferta" && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                  {/* Top Info Section */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">
                          <span className="font-semibold">Puesto / Área:</span>
                        </p>
                        <p className="text-gray-900">Desarrollador/a Software Senior</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">
                          <span className="font-semibold">Responsable del Proceso</span>
                        </p>
                        <p className="text-gray-900">Sofía Pérez</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">
                          <span className="font-semibold">Finalistas / Ofertas Enviadas</span>
                        </p>
                        <p className="text-red-600 font-semibold">Estado General: En Ofertas</p>
                        <p className="text-gray-900">3/3</p>
                      </div>
                    </div>
                  </Card>

                  {/* Candidatos Finalistas Table */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Candidatos Finalistas</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">#</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Candidato</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Estado Oferta</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">
                              Tipo do Propietato Entero
                            </th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Fecha de Envío</th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">
                              Rotalo Respuesta
                            </th>
                            <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600">Respuesta</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">1</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-900 font-medium">Juan Pérez</td>
                            <td className="py-2 px-2">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                                Enviada
                              </span>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">15/10/25</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">9-6</td>
                            <td className="py-2 px-2">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <AlertCircle className="w-4 h-4 text-gray-400" />
                              </Button>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">RH 01</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">2</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-900 font-medium">Ana López</td>
                            <td className="py-2 px-2">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-800">
                                Aceptada
                              </span>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">Tiempo completo</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">9-6</td>
                            <td className="py-2 px-2"></td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800">
                                Pendiente
                              </span>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">3</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-900 font-medium">Ana López</td>
                            <td className="py-2 px-2">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-800">
                                Aceptada
                              </span>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">10/10/25</td>
                            <td className="py-2 px-2">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-800">
                                Aceptada
                              </span>
                            </td>
                            <td className="py-2 px-2"></td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">RH 02</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">4</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-900 font-medium">Pedro Jimínez</td>
                            <td className="py-2 px-2">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-orange-100 text-orange-800">
                                Resolución o oferta (llamada)
                              </span>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">11/10/25</td>
                            <td className="py-2 px-2">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-800">
                                Aceptada
                              </span>
                            </td>
                            <td className="py-2 px-2"></td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">RH 02</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">5</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-900 font-medium">Python</td>
                            <td className="py-2 px-2">
                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                                Reagibilidad
                              </span>
                            </td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">Otro Motivo</td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">Otro Motivo</td>
                            <td className="py-2 px-2"></td>
                            <td className="py-2 px-2 text-xs sm:text-sm text-gray-700">RH 01</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  {/* Comunicación y Seguimiento */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                      Comunicación y Seguimiento
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Historial de comunicación y la entipe Intercambios
                    </p>
                  </Card>

                  {/* Documentos */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Documentos</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Documentos relacionados con las ofertas</p>
                  </Card>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Indicadores Visuales - Donut Chart */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Indicadores Visuales</h3>
                    <div className="flex flex-col items-center mb-3 sm:mb-4">
                      <div className="relative w-full" style={{ height: "200px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Ofertas Enviadas", value: 3 },
                                { name: "Aceptadas", value: 1 },
                                { name: "Vacantes Cubiertas", value: 2 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              <Cell fill="#E91E63" />
                              <Cell fill="#9E9E9E" />
                              <Cell fill="#C2185B" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-3xl sm:text-4xl font-bold" style={{ color: "#C2185B" }}>
                            33%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E91E63" }}></div>
                        <span className="text-gray-700">Ofertas Enviadas (3)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-gray-700">Aceptadas (1)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C2185B" }}></div>
                        <span className="text-gray-700">Vacantes Cubiertas</span>
                      </div>
                    </div>
                  </Card>

                  {/* Notas Internas */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Notas Internas</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-xs sm:text-sm bg-transparent"
                        style={{ color: "#C2185B" }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Adjuntar Documento
                      </Button>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="p-2 sm:p-3 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600 mb-0.5 sm:mb-1">
                            12/10/25: Oferta enviada a Plan Pérez (email)
                          </p>
                          <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                            <input type="checkbox" className="rounded w-3 h-3" />
                            En Negritada Respuest (1)
                          </label>
                          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                            <input type="checkbox" className="rounded w-3 h-3" />
                            En Nuestro Recordatio (1)
                          </label>
                          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                            <input type="checkbox" className="rounded w-3 h-3" checked readOnly />
                            Firma Digital: Completada
                          </label>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentView === "onboarding" && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: "#C2185B" }}>
                Detalle de Vacante - Proceso 'Onboarding'
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                  {/* Candidate Profile Section */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                      {/* Profile Photo */}
                      <div className="flex-shrink-0">
                        <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-gray-200 overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                            alt="Ana López"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                          Gerente de Tiona - Centro Histórico
                        </h3>
                        <p className="text-base sm:text-lg font-semibold mb-1" style={{ color: "#C2185B" }}>
                          Ana López
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">Candidato Seleccionado</p>
                      </div>

                      {/* Right Info */}
                      <div className="flex flex-col gap-2">
                        <div className="text-xs sm:text-sm">
                          <p className="text-gray-600 mb-1">Fecha Inici Programada: 18/Oct/2024</p>
                          <p className="text-gray-600">Responsable Onboarding: María Sánchez (RH)</p>
                        </div>
                        <div
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded text-center text-white font-semibold text-xs sm:text-sm"
                          style={{ backgroundColor: "#E91E63" }}
                        >
                          Estado: En Curso
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Enchabado Section */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Enchabado</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Información de encabezado del proceso</p>
                  </Card>

                  {/* Información del Candidato */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                      Información del Candidato
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Left Column - Checklist */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          <span className="text-xs sm:text-sm text-gray-900">Formal:</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          <span className="text-xs sm:text-sm text-gray-900">
                            Documentación Entregada (INE, RFC, CURP)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          <span className="text-xs sm:text-sm text-gray-900">Firma de Contrato</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-400"></div>
                          <span className="text-xs sm:text-sm text-gray-900">Capacitación Inicial / Inducción</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-gray-400"></div>
                          <span className="text-xs sm:text-sm text-gray-900">
                            Alta en Sistemas Internos (Correo, Nómula)
                          </span>
                        </div>
                      </div>

                      {/* Right Column - Candidate Details */}
                      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Nombre Completo:</p>
                          <p className="text-gray-700">Ana López</p>
                        </div>
                        <div>
                          <p className="text-gray-700">ana_lopez@email.com / 55-1244-5678</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Fecha Aceptación Oferta:</p>
                          <p className="text-gray-700">01/Oct/2024</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Tipo & contato:</p>
                          <p className="text-gray-700">L-V, 9am-6pm</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Horario Sistemas Internos (Correo, Nómina)</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Sueldo Acordado</p>
                          <p className="text-gray-700 font-bold">$25,000 MXN</p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 sm:mt-6">
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-1 sm:mb-2">
                        <div
                          className="h-2 sm:h-3 rounded-full"
                          style={{ width: "60%", backgroundColor: "#E91E63" }}
                        ></div>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">60% Completado</p>
                    </div>
                  </Card>

                  {/* Seguimiento y Notas */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Seguimiento y Notas:</h3>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                      <p>Comentarios del responsable...</p>
                      <p>1ª Mes: 18 Nov/2024 (María S. 18 Ene/205). (Líder de Área)</p>
                    </div>
                  </Card>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Progress del Onboarding */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">
                      Progress del Onboarding
                    </h3>
                    <div className="flex flex-col items-center mb-3 sm:mb-4">
                      <div className="relative w-full" style={{ height: "180px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Completado", value: 60 },
                                { name: "Pendiente", value: 40 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                              strokeWidth={0}
                            >
                              <Cell fill="#E91E63" />
                              <Cell fill="#E0E0E0" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-4xl font-bold" style={{ color: "#E91E63" }}>
                            60%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-1 sm:space-y-2 text-xs">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E91E63" }}></div>
                        <span className="text-gray-700">01/Oct</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E91E63" }}></div>
                        <span className="text-gray-700">04/Oct Inicio Trámites</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <span className="text-gray-700">18 Primer Día</span>
                      </div>
                    </div>
                  </Card>

                  {/* Cronograma Clave */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Cronograma Clave</h3>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                      <p>01/Oct</p>
                      <p>04/Oct Trámites</p>
                      <p>18 pto Trámites</p>
                    </div>
                  </Card>

                  {/* Documentos de Soporte */}
                  <Card className="p-4 sm:p-6 bg-white shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900">Documentos de Soporte</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <Button
                        variant="link"
                        className="w-full justify-start text-xs sm:text-sm p-0 h-auto"
                        style={{ color: "#2196F3" }}
                      >
                        Contrato_Ana_Lopez_Firmado.pdf
                      </Button>
                      <Button
                        variant="link"
                        className="w-full justify-start text-xs sm:text-sm p-0 h-auto"
                        style={{ color: "#2196F3" }}
                      >
                        Checklist_Bienvenida_Entregado.pdf
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

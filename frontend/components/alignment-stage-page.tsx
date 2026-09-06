"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Footer } from "./footer"
import Image from "next/image"
import { Search, Check, X, Shield, AlertCircle } from "lucide-react"

export function AlignmentStagePage({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for applications/reviews
  const applications = [
    {
      id: "C-001",
      candidate: "Juan García",
      status: "Vea López",
      dateEntered: "2024-05-10",
      assigned: "Sofía P.",
    },
    {
      id: "C-001",
      candidate: "",
      status: "Pendiente",
      dateEntered: "2024-05-10",
      assigned: "Sofía R.",
    },
    {
      id: "SQL",
      candidate: "",
      status: "En Progreso",
      dateEntered: "",
      assigned: "Fabián prog.",
    },
    {
      id: "",
      candidate: "María Fernández",
      status: "Luis Pérez",
      dateEntered: "",
      assigned: "Entrevista prag.",
    },
  ]

  const filteredApplications = applications.filter((app) => {
    return (
      app.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="text-white shadow-md" style={{ backgroundColor: "#C2185B" }}>
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="relative h-8 w-32 md:h-10 md:w-40">
            <Image src="/liverpool-logo.png" alt="Liverpool" fill className="object-contain" priority />
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <span className="text-xs md:text-sm font-medium">Hola, RH Liverpool</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 hidden lg:block">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2" style={{ color: "#C2185B" }}>
              Panel de Control de RH
            </h2>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#C2185B" }}>
              Seguimiento del Proceso
            </h3>
          </div>

          <div className="space-y-2">
            {[
              { id: 1, name: "Perfil del Puesto", badge: "4" },
              { id: 5, name: "Estrategia", badge: null },
              { id: 6, name: "Cronograme", badge: null },
              { id: 6, name: "Documentos", badge: null },
              { id: 7, name: "Mini-dashboard", badge: null },
            ].map((step) => (
              <div key={step.id} className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 relative">
                  {step.id}
                  {step.badge && (
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
                      style={{ backgroundColor: "#C2185B" }}
                    >
                      {step.badge}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-700">{step.name}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-6" style={{ color: "#C2185B" }}>
            Panel de Control de RH
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Vacancy Details and Applications */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Gerente de Tienda - Centro Histórico /</h2>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-semibold">ID:</span> VT-1234
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Departamento:</span> Ventas
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">Estado general:</span>
                    <span className="text-gray-900">En Alineación (50%)</span>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Responsable:</span> Sofía Pérez
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">Prioridad:</span>
                    <span className="text-gray-900">Alta</span>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Total solicitudes (Fase actual):</span> 45
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">4ª Solicitudes / Revisones</h2>
                  <Button size="sm" className="text-white" style={{ backgroundColor: "#C2185B" }}>
                    Actualizar perfil
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600">ID / Candidato</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600">Estado</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600">Fecha Ingreso</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600">Asignado</th>
                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((app, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2 text-sm text-gray-900">
                            {app.id} {app.candidate}
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-700">{app.status}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{app.dateEntered}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">{app.assigned}</td>
                          <td className="py-3 px-2 text-sm text-gray-700">...</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      ‹
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                      ›
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Filtrar por candidato..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300 text-sm w-64"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <h2 className="text-lg font-bold mb-4" style={{ color: "#C2185B" }}>
                  2º Perfil del Puesto
                </h2>

                <h3 className="text-base font-semibold mb-4 text-gray-900">Competencias de la «pientos</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-pink-50 rounded border border-pink-200">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-900">Competencias Técnicas</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-pink-50 rounded border border-pink-200">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-900">Competencias Técnicas</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-pink-50 rounded border border-pink-200">
                    <Shield className="w-5 h-5" style={{ color: "#C2185B" }} />
                    <span className="text-sm text-gray-900">Escolarido</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-pink-50 rounded border border-pink-200">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-900">Escolaridad</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-pink-50 rounded border border-pink-200">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-900">Soft Skills</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-pink-50 rounded border border-pink-200">
                    <X className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-gray-900">Experiencia</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Mini Dashboard */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white shadow-sm sticky top-4">
                <h2 className="text-lg font-bold mb-4" style={{ color: "#C2185B" }}>
                  7º Mini-dashboard
                </h2>

                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Alineación Completada:</p>
                    <p className="text-2xl font-bold text-gray-900">50%</p>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Solicitudes Revisadas:</p>
                    <p className="text-2xl font-bold text-gray-900">1/4</p>
                  </div>

                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Riesgos:</p>
                    <p className="text-2xl font-bold text-gray-900">1</p>
                    <p className="text-xs text-gray-500 mt-1">(Faltan referencias)</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vacantes Críticas:</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

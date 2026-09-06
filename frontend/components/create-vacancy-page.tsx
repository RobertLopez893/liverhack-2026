"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { X, ArrowLeft } from "lucide-react"
import { Footer } from "./footer"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

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

type CreateVacancyPageProps = {
  onCreate: (newVacancy: Vacancy) => void
  onCancel: () => void
}

export function CreateVacancyPage({ onCreate, onCancel }: CreateVacancyPageProps) {
  const [newVacancy, setNewVacancy] = useState<Vacancy>({
    priority: "medium",
    title: "",
    manager: "",
    location: "",
    area: "",
    status: "alineacion",
    salary: "",
    employmentType: "Tiempo completo",
    description: "",
    hardSkills: [],
    softSkills: [],
  })

  const [newHardSkill, setNewHardSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")

  const handleCreate = () => {
    if (!newVacancy.title || !newVacancy.manager || !newVacancy.location || !newVacancy.area) {
      alert("Por favor completa todos los campos requeridos")
      return
    }
    onCreate(newVacancy)
  }

  const addHardSkill = () => {
    if (newHardSkill.trim()) {
      setNewVacancy({
        ...newVacancy,
        hardSkills: [...(newVacancy.hardSkills || []), newHardSkill.trim()],
      })
      setNewHardSkill("")
    }
  }

  const removeHardSkill = (index: number) => {
    setNewVacancy({
      ...newVacancy,
      hardSkills: newVacancy.hardSkills?.filter((_, i) => i !== index),
    })
  }

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setNewVacancy({
        ...newVacancy,
        softSkills: [...(newVacancy.softSkills || []), newSoftSkill.trim()],
      })
      setNewSoftSkill("")
    }
  }

  const removeSoftSkill = (index: number) => {
    setNewVacancy({
      ...newVacancy,
      softSkills: newVacancy.softSkills?.filter((_, i) => i !== index),
    })
  }

  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      alineacion: "Alineación",
      atraccion: "Atracción",
      reclutamiento: "Reclutamiento",
      seleccion: "Selección",
      oferta: "Oferta",
      onboarding: "Onboarding",
    }
    return statusLabels[status] || status
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="text-white shadow-md" style={{ backgroundColor: "#EC008C" }}>
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-4">
            <button onClick={onCancel} className="hover:bg-[#C40074]/50 p-2 rounded transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative h-10 w-32 sm:h-12 sm:w-40 md:h-16 md:w-52">
              <Image src="/liverpool-logo.png" alt="Liverpool" fill className="object-contain" priority />
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <span className="text-xs md:text-sm font-medium">Hola, RH Liverpool</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-8 bg-white shadow-sm mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Nueva Vacante</h1>

            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Título de la Vacante *</label>
              <Input
                value={newVacancy.title}
                onChange={(e) => setNewVacancy({ ...newVacancy, title: e.target.value })}
                placeholder="Ej: Gerente de Tienda - Centro Histórico"
                className="border-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Prioridad</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between border-gray-300 bg-transparent">
                        {newVacancy.priority === "high" && "Alta"}
                        {newVacancy.priority === "medium" && "Media"}
                        {newVacancy.priority === "low" && "Baja"}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white">
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, priority: "high" })}>
                        Alta
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, priority: "medium" })}>
                        Media
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, priority: "low" })}>
                        Baja
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Estado</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between border-gray-300 bg-transparent">
                        {getStatusLabel(newVacancy.status)}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white">
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, status: "alineacion" })}>
                        Alineación
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, status: "atraccion" })}>
                        Atracción
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, status: "reclutamiento" })}>
                        Reclutamiento
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, status: "seleccion" })}>
                        Selección
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, status: "oferta" })}>
                        Oferta
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setNewVacancy({ ...newVacancy, status: "onboarding" })}>
                        Onboarding
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Ubicación *</label>
                    <Input
                      value={newVacancy.location}
                      onChange={(e) => setNewVacancy({ ...newVacancy, location: e.target.value })}
                      placeholder="Ej: CDMX"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Área *</label>
                    <Input
                      value={newVacancy.area}
                      onChange={(e) => setNewVacancy({ ...newVacancy, area: e.target.value })}
                      placeholder="Ej: Centro Histórico"
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Gerente *</label>
                    <Input
                      value={newVacancy.manager}
                      onChange={(e) => setNewVacancy({ ...newVacancy, manager: e.target.value })}
                      placeholder="Ej: jose.garcia@liverpool.com"
                      className="border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Salario</label>
                  <Input
                    value={newVacancy.salary}
                    onChange={(e) => setNewVacancy({ ...newVacancy, salary: e.target.value })}
                    placeholder="Ej: $200,00"
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Tipo de Empleo</label>
                  <Input
                    value={newVacancy.employmentType}
                    onChange={(e) => setNewVacancy({ ...newVacancy, employmentType: e.target.value })}
                    placeholder="Ej: Tiempo completo"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-white shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
            <Textarea
              value={newVacancy.description}
              onChange={(e) => setNewVacancy({ ...newVacancy, description: e.target.value })}
              rows={6}
              placeholder="Describe la vacante..."
              className="border-gray-300 resize-none"
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hard skills</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {newVacancy.hardSkills?.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-gray-800 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => removeHardSkill(index)}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newHardSkill}
                  onChange={(e) => setNewHardSkill(e.target.value)}
                  placeholder="Nueva habilidad"
                  onKeyPress={(e) => e.key === "Enter" && addHardSkill()}
                  className="border-gray-300"
                />
                <Button onClick={addHardSkill} style={{ backgroundColor: "#C2185B" }} className="text-white">
                  Agregar
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Soft skills</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {newVacancy.softSkills?.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-gray-800 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => removeSoftSkill(index)}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  placeholder="Nueva habilidad"
                  onKeyPress={(e) => e.key === "Enter" && addSoftSkill()}
                  className="border-gray-300"
                />
                <Button onClick={addSoftSkill} style={{ backgroundColor: "#C2185B" }} className="text-white">
                  Agregar
                </Button>
              </div>
            </Card>
          </div>

          <div className="flex gap-4 justify-end">
            <Button onClick={onCancel} variant="outline" className="px-8 border-gray-300 text-gray-700 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={handleCreate} style={{ backgroundColor: "#C2185B" }} className="text-white px-8">
              Crear Vacante
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

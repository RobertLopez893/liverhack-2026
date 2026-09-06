"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { X, Edit2, ArrowLeft } from "lucide-react"
import { Footer } from "./footer"
import Image from "next/image"

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

type EditVacancyPageProps = {
  vacancy: Vacancy
  onSave: (updatedVacancy: Vacancy) => void
  onCancel: () => void
}

export function EditVacancyPage({ vacancy, onSave, onCancel }: EditVacancyPageProps) {
  const [editedVacancy, setEditedVacancy] = useState<Vacancy>({
    ...vacancy,
    salary: vacancy.salary || "$200,00",
    employmentType: vacancy.employmentType || "Tiempo completo",
    description:
      vacancy.description ||
      "kabscdhwvqefvqwufbvuoasbdoufvabsuidbvuoaps bgfuoabdsugbusagbuabdsgpibadsyigbadspgibdas pugoasigubuiasgbddsiubgdasibgiadsbgaidsbgiadb sgidbasi odsbaodisgbdasobiodsbagdiosagbioasgb",
    hardSkills: vacancy.hardSkills || ["SQL", "Cloud", "NoSQL"],
    softSkills: vacancy.softSkills || ["SQL", "Cloud"],
  })

  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [isEditingSalary, setIsEditingSalary] = useState(false)
  const [isEditingManager, setIsEditingManager] = useState(false)
  const [isEditingEmploymentType, setIsEditingEmploymentType] = useState(false)
  const [isEditingHardSkills, setIsEditingHardSkills] = useState(false)
  const [isEditingSoftSkills, setIsEditingSoftSkills] = useState(false)

  const [newHardSkill, setNewHardSkill] = useState("")
  const [newSoftSkill, setNewSoftSkill] = useState("")

  const handleSave = () => {
    onSave(editedVacancy)
  }

  const addHardSkill = () => {
    if (newHardSkill.trim()) {
      setEditedVacancy({
        ...editedVacancy,
        hardSkills: [...(editedVacancy.hardSkills || []), newHardSkill.trim()],
      })
      setNewHardSkill("")
    }
  }

  const removeHardSkill = (index: number) => {
    setEditedVacancy({
      ...editedVacancy,
      hardSkills: editedVacancy.hardSkills?.filter((_, i) => i !== index),
    })
  }

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setEditedVacancy({
        ...editedVacancy,
        softSkills: [...(editedVacancy.softSkills || []), newSoftSkill.trim()],
      })
      setNewSoftSkill("")
    }
  }

  const removeSoftSkill = (index: number) => {
    setEditedVacancy({
      ...editedVacancy,
      softSkills: editedVacancy.softSkills?.filter((_, i) => i !== index),
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{editedVacancy.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="mb-4">
                  <span
                    className="inline-block px-4 py-2 rounded text-white font-semibold text-sm"
                    style={{ backgroundColor: "#4CAF50" }}
                  >
                    ETAPA: {getStatusLabel(editedVacancy.status).toUpperCase()}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Ubicación</label>
                      <button onClick={() => setIsEditingLocation(!isEditingLocation)}>
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    {isEditingLocation ? (
                      <Input
                        value={editedVacancy.location}
                        onChange={(e) => setEditedVacancy({ ...editedVacancy, location: e.target.value })}
                        onBlur={() => setIsEditingLocation(false)}
                        autoFocus
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900">{editedVacancy.location}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Gerente</label>
                      <button onClick={() => setIsEditingManager(!isEditingManager)}>
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    {isEditingManager ? (
                      <Input
                        value={editedVacancy.manager}
                        onChange={(e) => setEditedVacancy({ ...editedVacancy, manager: e.target.value })}
                        onBlur={() => setIsEditingManager(false)}
                        autoFocus
                        className="border-gray-300"
                      />
                    ) : (
                      <p className="text-gray-900">{editedVacancy.manager}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">Salario</label>
                    <button onClick={() => setIsEditingSalary(!isEditingSalary)}>
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  {isEditingSalary ? (
                    <Input
                      value={editedVacancy.salary}
                      onChange={(e) => setEditedVacancy({ ...editedVacancy, salary: e.target.value })}
                      onBlur={() => setIsEditingSalary(false)}
                      autoFocus
                      className="border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-900">{editedVacancy.salary}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">Tipo de Empleo</label>
                    <button onClick={() => setIsEditingEmploymentType(!isEditingEmploymentType)}>
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  {isEditingEmploymentType ? (
                    <Input
                      value={editedVacancy.employmentType}
                      onChange={(e) => setEditedVacancy({ ...editedVacancy, employmentType: e.target.value })}
                      onBlur={() => setIsEditingEmploymentType(false)}
                      autoFocus
                      className="border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-900">{editedVacancy.employmentType}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 bg-white shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Descripcion</h2>
            <Textarea
              value={editedVacancy.description}
              onChange={(e) => setEditedVacancy({ ...editedVacancy, description: e.target.value })}
              rows={6}
              className="border-gray-300 resize-none"
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Hard skills</h2>
                <button onClick={() => setIsEditingHardSkills(!isEditingHardSkills)}>
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {editedVacancy.hardSkills?.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-gray-800 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    {isEditingHardSkills && (
                      <button onClick={() => removeHardSkill(index)}>
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditingHardSkills && (
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
              )}
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Soft skills</h2>
                <button onClick={() => setIsEditingSoftSkills(!isEditingSoftSkills)}>
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {editedVacancy.softSkills?.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-gray-800 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    {isEditingSoftSkills && (
                      <button onClick={() => removeSoftSkill(index)}>
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditingSoftSkills && (
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
              )}
            </Card>
          </div>

          <div className="flex gap-4 justify-end">
            <Button onClick={onCancel} variant="outline" className="px-8 border-gray-300 text-gray-700 bg-transparent">
              Cancelar
            </Button>
            <Button onClick={handleSave} style={{ backgroundColor: "#C2185B" }} className="text-white px-8">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

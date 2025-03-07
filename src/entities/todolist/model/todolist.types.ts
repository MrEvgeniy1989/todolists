import { TaskT, UpdatedAtDetails } from "@/entities/task/model/task.types"

export type TodolistDBT = {
  id: string
  title: string
  tasks: TaskT[]
  updatedAt: UpdatedAtDetails[]
  createdAt: Date
}

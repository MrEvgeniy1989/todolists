export type UpdatedAtDetails = {
  updatedKey: string
  updatedDate: Date
}
export type TaskStatusT = "active" | "completed"
export type TaskPriorityT = "low" | "medium-low" | "normal" | "medium-high" | "high"

export type TaskT = {
  id: string
  title: string
  description?: string
  status: TaskStatusT
  priority: TaskPriorityT
  deadline?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: UpdatedAtDetails[]
}

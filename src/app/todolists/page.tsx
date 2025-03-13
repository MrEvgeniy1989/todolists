"use client"

import { Card } from "@/shared/components/ui/card/card"
import { useState } from "react"

type Todolist = {
  id: string
  title: string
}

const TodolistsPage = () => {
  
  const [todolists] = useState<Todolist[]>([
    {
      id: "1",
      title: "Todo 1",
    },
    {
      id: "2",
      title: "Todo 2",
    },
  ])

  return (
    <div className={"flex h-full items-center justify-center gap-10"}>
      {todolists.map((todolist) => {
        return (
          <Card key={todolist.id} className={"flex h-40 min-w-40 justify-center"}>
            {todolist.title}
          </Card>
        )
      })}
    </div>
  )
}

export default TodolistsPage

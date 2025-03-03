'use client'

import { Card } from '@/shared/components/ui/card/card'
import { useState } from 'react'

type Todolist = {
  id: string
  title: string
}

const TodolistsPage = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([
    {
      id: '1',
      title: 'Todo 1'
    },
    {
      id: '2',
      title: 'Todo 2'
    }
  ])

  return (
    <div className={"flex gap-10 justify-center items-center h-full"}>
      {todolists.map(todolist => {
        return (
          <Card key={todolist.id} className={'min-w-40 h-40 flex justify-center '}>
              {todolist.title}
          </Card>
        )
      })}
    </div>
  );
};

export default TodolistsPage;

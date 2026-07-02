import type { Todo } from '../types/todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string, isComplete: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onUpdateTitle: (id: string, title: string) => Promise<void>
}

export default function TodoList({ todos, onToggle, onDelete, onUpdateTitle }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-state">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateTitle={onUpdateTitle}
        />
      ))}
    </ul>
  )
}

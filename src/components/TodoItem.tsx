import { useState } from 'react'
import type { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, isComplete: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onUpdateTitle: (id: string, title: string) => Promise<void>
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdateTitle }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(todo.title)

  const handleSave = async () => {
    await onUpdateTitle(todo.id, draftTitle)
    setIsEditing(false)
  }

  return (
    <li className={`todo-item ${todo.is_complete ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.is_complete}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        <span className="todo-title" onDoubleClick={() => setIsEditing(true)}>
          {todo.title}
        </span>
      )}

      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)}>수정</button>
        <button onClick={() => onDelete(todo.id)}>삭제</button>
      </div>
    </li>
  )
}

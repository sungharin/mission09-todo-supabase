import { useState, FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (title: string) => Promise<void>
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    await onAdd(title.trim())
    setTitle('')
    setSubmitting(false)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={submitting}>
        추가
      </button>
    </form>
  )
}

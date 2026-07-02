import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import type { Todo } from '../types/todo'

interface UseTodosReturn {
  todos: Todo[]
  loading: boolean
  error: string | null
  addTodo: (title: string) => Promise<void>
  toggleTodo: (id: string, isComplete: boolean) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  updateTodoTitle: (id: string, title: string) => Promise<void>
}

export function useTodos(userId: string | undefined): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setTodos(data as Todo[])
      setError(null)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const addTodo = async (title: string) => {
    if (!userId || !title.trim()) return
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title, user_id: userId }])
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }
    setTodos((prev) => [data as Todo, ...prev])
  }

  const toggleTodo = async (id: string, isComplete: boolean) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: isComplete })
      .eq('id', id)

    if (error) {
      setError(error.message)
      return
    }
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, is_complete: isComplete } : t)))
  }

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) {
      setError(error.message)
      return
    }
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const updateTodoTitle = async (id: string, title: string) => {
    if (!title.trim()) return
    const { error } = await supabase.from('todos').update({ title }).eq('id', id)
    if (error) {
      setError(error.message)
      return
    }
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)))
  }

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo, updateTodoTitle }
}

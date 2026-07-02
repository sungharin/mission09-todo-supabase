import { useAuth } from './hooks/useAuth'
import { useTodos } from './hooks/useTodos'
import Auth from './components/Auth'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './index.css'

function App() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { todos, loading: todosLoading, error, addTodo, toggleTodo, deleteTodo, updateTodoTitle } =
    useTodos(user?.id)

  if (authLoading) {
    return <div className="center-message">로딩 중...</div>
  }

  if (!user) {
    return (
      <div className="app-container">
        <h1>Mission 09 — Todo App</h1>
        <Auth />
      </div>
    )
  }

  return (
    <div className="app-container">
      <h1>Mission 09 — Todo App</h1>
      <Header email={user.email ?? ''} onSignOut={signOut} />
      <TodoForm onAdd={addTodo} />
      {error && <p className="error-message">에러: {error}</p>}
      {todosLoading ? (
        <p className="center-message">할 일을 불러오는 중...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdateTitle={updateTodoTitle}
        />
      )}
    </div>
  )
}

export default App

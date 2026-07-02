import { useState, FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Auth() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setMessage(error)
    } else {
      const { error } = await signUp(email, password)
      if (error) {
        setMessage(error)
      } else {
        setMessage('가입 확인 이메일을 보냈습니다. 이메일 확인 후 로그인해주세요.')
      }
    }
    setSubmitting(false)
  }

  return (
    <div className="auth-container">
      <h2>{mode === 'login' ? '로그인' : '회원가입'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
        </button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      <button
        type="button"
        className="link-button"
        onClick={() => {
          setMode(mode === 'login' ? 'signup' : 'login')
          setMessage(null)
        }}
      >
        {mode === 'login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
      </button>
    </div>
  )
}

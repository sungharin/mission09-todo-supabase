interface HeaderProps {
  email: string
  onSignOut: () => void
}

export default function Header({ email, onSignOut }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <span className="user-email">{email}</span> 님, 환영합니다
      </div>
      <button className="signout-button" onClick={onSignOut}>
        로그아웃
      </button>
    </header>
  )
}

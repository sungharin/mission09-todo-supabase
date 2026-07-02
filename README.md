# Mission 09 — Todo App with Supabase

작성자: 성하린

React + TypeScript + Supabase로 만든 Todo 앱입니다. 회원가입/로그인, Todo CRUD가 모두 Supabase DB와 연동되어 있고, Row Level Security(RLS)로 사용자별 데이터를 보호합니다.

## 주요 기능

- 이메일/비밀번호 회원가입 및 로그인
- 로그인 시 사용자 이메일 표시 및 로그아웃
- Todo 추가 / 조회 / 수정 / 삭제 (전부 Supabase DB에 저장)
- Row Level Security로 본인 Todo만 접근 가능
- 환경변수(.env)로 Supabase API 키 관리
- 새로고침 및 다른 기기에서도 동일한 데이터 유지 (DB 기반이므로 자동 보장)

## 기술 스택

- React 18 + TypeScript
- Vite
- Supabase (Auth + Postgres DB)

## 1. Supabase 프로젝트 설정

1. [supabase.com](https://supabase.com) 에서 새 프로젝트를 생성합니다.
2. 왼쪽 메뉴 **SQL Editor** 로 이동합니다.
3. 이 저장소의 `supabase/schema.sql` 파일 내용을 전체 복사해서 붙여넣고 **Run** 을 눌러 실행합니다.
   - `todos` 테이블이 생성됩니다.
   - RLS가 활성화되고, 본인 데이터만 조회/추가/수정/삭제할 수 있는 정책이 적용됩니다.
4. 왼쪽 메뉴 **Project Settings > API** 로 이동해서 `Project URL` 과 `anon public` 키를 확인합니다.
5. (선택) **Authentication > Providers > Email** 에서 "Confirm email"을 꺼두면 회원가입 후 이메일 인증 없이 바로 로그인 테스트가 가능합니다. (과제 제출용으로는 꺼두는 걸 추천)

## 2. 로컬 환경 설정

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env
# .env 파일을 열어 아래 두 값을 본인 Supabase 프로젝트 값으로 채워주세요
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 회원가입 → 로그인 → Todo 추가/수정/삭제 테스트를 진행합니다.

## 3. 배포 (Vercel)

1. GitHub에 이 프로젝트를 업로드합니다. (`.env` 파일은 `.gitignore`에 포함되어 있어 자동으로 제외됩니다)
2. [vercel.com](https://vercel.com) 에서 New Project → 방금 만든 GitHub 저장소를 Import 합니다.
3. **Environment Variables** 항목에 아래 두 개를 추가합니다.
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy를 누르면 배포가 완료됩니다.

## 4. 폴더 구조

```
src/
  components/     # Auth, Header, TodoForm, TodoItem, TodoList
  hooks/          # useAuth, useTodos (Supabase 연동 로직)
  types/          # Todo 타입 정의
  supabaseClient.ts
  App.tsx
supabase/
  schema.sql      # 테이블 생성 + RLS 정책 SQL
```

## 5. 체크리스트 대응 현황

- [x] Supabase 테이블 생성 및 CRUD DB 연동 (`useTodos.ts`)
- [x] 회원가입/로그인 페이지 구현 (`Auth.tsx`)
- [x] 로그인 시 이메일 표시 및 로그아웃 (`Header.tsx`)
- [x] Row Level Security 설정 (`supabase/schema.sql`)
- [x] 환경변수(.env)로 API 키 관리 (`supabaseClient.ts`, `.env.example`)
- [x] 새로고침/다른 기기에서도 동일 데이터 유지 (Supabase DB 기반이므로 자동 보장)
- [x] README.md에 작성자 이름 포함

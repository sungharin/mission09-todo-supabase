-- Mission 09: Supabase 테이블 생성 + RLS 설정
-- Supabase 대시보드 > SQL Editor 에 이 파일 내용을 그대로 붙여넣고 실행하세요.

-- 1. todos 테이블 생성
create table if not exists todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  is_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. RLS(Row Level Security) 활성화
alter table todos enable row level security;

-- 3. 정책: 로그인한 사용자는 자기 자신의 할 일만 조회 가능
create policy "Users can view their own todos"
  on todos for select
  using (auth.uid() = user_id);

-- 4. 정책: 로그인한 사용자는 자기 자신의 user_id로만 할 일 추가 가능
create policy "Users can insert their own todos"
  on todos for insert
  with check (auth.uid() = user_id);

-- 5. 정책: 로그인한 사용자는 자기 자신의 할 일만 수정 가능
create policy "Users can update their own todos"
  on todos for update
  using (auth.uid() = user_id);

-- 6. 정책: 로그인한 사용자는 자기 자신의 할 일만 삭제 가능
create policy "Users can delete their own todos"
  on todos for delete
  using (auth.uid() = user_id);

# 🤝 Git & GitHub 협업 가이드 (왕초보용)

## 📚 기본 개념
- **Repository (저장소)**: 프로젝트가 저장되는 곳
- **Clone**: GitHub에서 내 컴퓨터로 프로젝트 복사
- **Commit**: 변경사항을 저장
- **Push**: 내 변경사항을 GitHub에 업로드
- **Pull**: GitHub의 최신 변경사항을 내 컴퓨터로 다운로드

## 🔄 매일 작업 전 필수 과정

```bash
# 1. 최신 변경사항 가져오기
git pull origin master

# 2. 내가 어떤 파일을 변경했는지 확인
git status

# 3. 변경된 파일들을 Git에 추가
git add .

# 4. 변경사항을 저장 (메시지와 함께)
git commit -m "무엇을 변경했는지 간단히 설명"

# 5. GitHub에 업로드
git push origin master
```

## 🚨 자주 하는 실수와 해결법

### 실수 1: Commit 메시지를 잘못 썼을 때
```bash
# 가장 최근 commit 메시지 수정
git commit --amend -m "새로운 메시지"
```

### 실수 2: 잘못된 파일을 add했을 때
```bash
# 특정 파일을 add에서 제거
git reset HEAD 파일명

# 모든 파일을 add에서 제거
git reset HEAD
```

### 실수 3: 동시에 같은 파일을 수정했을 때 (Conflict)
1. 충돌된 파일을 열어서 직접 수정
2. `git add 파일명`으로 해결된 파일 추가
3. `git commit -m "충돌 해결"`로 저장

## 📋 협업 규칙 (팀에서 정하면 좋은 것들)

1. **Commit 메시지 규칙**
   - `기능추가: 로그인 기능 구현`
   - `버그수정: 회원가입 오류 해결`
   - `디자인: 메인 페이지 스타일 개선`

2. **작업 전 확인사항**
   - 항상 `git pull`로 최신 상태 유지
   - 큰 변경 전에 팀원들과 상의

3. **파일 관리**
   - 개인 설정 파일은 `.gitignore`에 추가
   - 민감한 정보 (비밀번호 등)는 절대 업로드 금지

## 🎯 실제 작업 예시

### 새로운 기능 추가하기
```bash
# 1. 최신 상태로 업데이트
git pull origin master

# 2. 코드 수정 (Cursor에서 작업)

# 3. 변경사항 확인
git status

# 4. 변경된 파일들 추가
git add src/app/새기능.tsx

# 5. 커밋 메시지와 함께 저장
git commit -m "기능추가: 새로운 페이지 추가"

# 6. GitHub에 업로드
git push origin master
```

## 💡 유용한 팁

1. **VSCode/Cursor에서 Git 사용하기**
   - 왼쪽 사이드바의 Git 아이콘 클릭
   - GUI로 쉽게 add, commit, push 가능

2. **변경사항 비교하기**
   ```bash
   git diff  # 변경된 내용 자세히 보기
   ```

3. **이전 버전으로 되돌리기**
   ```bash
   git log --oneline  # 커밋 히스토리 확인
   git reset --hard 커밋ID  # 특정 커밋으로 되돌리기
   ```

## 🆘 도움이 필요할 때

- GitHub 저장소의 "Issues" 탭에서 질문하기
- 팀원들과 실시간 소통 (카카오톡, 슬랙 등)
- Git 명령어 도움말: `git help 명령어` 
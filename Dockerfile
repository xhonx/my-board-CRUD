# Dockerfile.frontend
# 1단계: Node 환경에서 앱 빌드
FROM node:latest AS build

WORKDIR /app

# package.json과 package-lock.json (또는 yarn.lock) 먼저 복사하여 의존성 설치 캐싱 활용
COPY package*.json ./
RUN npm install

# 앱 소스 복사 및 빌드 실행
COPY . .
RUN npm run build

# 2단계: Nginx로 빌드 결과물 서빙
FROM nginx:alpine

# Vite의 기본 출력 디렉터리는 "dist"입니다.
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 기본 포트 80 노출
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

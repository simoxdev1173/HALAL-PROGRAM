# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/ ./
RUN npm run prisma:generate && npx tsc

FROM node:22-bookworm-slim AS production
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production \
    PORT=47831 \
    UPLOAD_DIR=/app/data/uploads \
    FRONTEND_DIST_DIR=/app/dist

COPY --from=frontend-build /app/dist ./dist
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY backend/package.json backend/package-lock.json ./backend/
COPY backend/prisma ./backend/prisma

RUN mkdir -p /app/data/uploads

EXPOSE 47831
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||47831)+'/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["sh", "-c", "npm --prefix backend run prisma:deploy && node backend/dist/server.js"]

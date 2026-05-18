# --- Stage 1: build frontend ---
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend

COPY northwind-frontend/ ./

ENV VITE_API_URL=

ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

RUN npm install --no-audit --no-fund \
    && npm run build


# --- Stage 2: build backend ---
FROM node:22-bookworm-slim AS backend-build
WORKDIR /app

COPY northwind-backend/ ./

RUN npm install --no-audit --no-fund \
    && npm run build


# --- Stage 3: production runtime ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY northwind-backend/package.json northwind-backend/package-lock.json ./

RUN npm install --omit=dev --no-audit --no-fund \
    && npm cache clean --force

COPY --from=backend-build /app/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3001
USER node

CMD ["node", "dist/index.js"]

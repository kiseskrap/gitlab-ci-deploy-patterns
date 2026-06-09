# Minimal Node 22 image for the toy service. Multi-stage so the runtime
# image doesn't carry npm or the build cache — pattern, not optimization.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev 2>/dev/null || true
COPY src/ ./src/

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 8080
USER node
CMD ["node", "src/server.js"]

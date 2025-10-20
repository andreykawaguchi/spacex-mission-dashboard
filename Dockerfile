# Multi-stage build para otimizar a imagem final

# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Instalar servidor HTTP simples para servir arquivos estáticos
RUN npm install -g serve

# Copiar o build da stage anterior
COPY --from=builder /app/build ./build

# Expor a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["serve", "-s", "build", "-l", "3000"]

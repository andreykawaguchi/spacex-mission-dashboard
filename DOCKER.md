# 🐳 Guia Docker - SpaceX Mission Dashboard

## 📋 Pré-requisitos

Certifique-se de ter instalado:
- **[Docker](https://docs.docker.com/get-docker/)** - v20.10+
- **[Docker Compose](https://docs.docker.com/compose/install/)** - v1.29+

---

## 🚀 Opção 1: Produção (Multi-stage Build)

### Criar e rodar a imagem

```bash
# Opção A: Usando docker-compose (recomendado)
docker-compose up --build

# Opção B: Usando docker direto
docker build -t spacex-dashboard .
docker run -p 3000:3000 spacex-dashboard
```

### Acessar a aplicação
```
http://localhost:3000
```

### Parar o container
```bash
docker-compose down
```

---

## 🔧 Opção 2: Desenvolvimento (Com Hot Reload)

### Rodar em modo desenvolvimento

```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Características:
- ✅ **Hot reload** - alterações são refletidas em tempo real
- ✅ **Volume mounting** - arquivos sincronizados
- ✅ **Mode desenvolvimento** - `NODE_ENV=development`

### Acessar a aplicação
```
http://localhost:3000
```

### Parar o container
```bash
docker-compose -f docker-compose.dev.yml down
```

---

## 📦 Comandos Úteis

### Ver logs do container
```bash
# Production
docker-compose logs -f spacex-dashboard

# Development
docker-compose -f docker-compose.dev.yml logs -f spacex-dashboard-dev
```

### Executar comandos dentro do container
```bash
# Production
docker-compose exec spacex-dashboard npm test

# Development
docker-compose -f docker-compose.dev.yml exec spacex-dashboard-dev npm test
```

### Remover tudo
```bash
# Parar e remover containers, volumes
docker-compose down -v
docker-compose -f docker-compose.dev.yml down -v

# Remover imagens
docker rmi spacex-dashboard:latest
```

### Verificar saúde do container
```bash
docker-compose ps
```

---

## 🏗️ Arquitetura do Docker

### **Dockerfile (Produção)**

Multi-stage build para otimização:

1. **Stage 1 - Builder**
   - Instala dependências
   - Executa build
   - Gera pasta `build/`

2. **Stage 2 - Production**
   - Copia apenas os arquivos necessários
   - Usa `serve` para servir arquivos estáticos
   - Imagem final reduzida (~150MB vs ~500MB)

### **Dockerfile.dev (Desenvolvimento)**

Simples para desenvolvimento:
- Instala dependências
- Monta volumes
- Roda `npm start`
- Suporta hot reload

---

## 📊 Comparação: Produção vs Desenvolvimento

| Característica | Produção | Desenvolvimento |
|---|---|---|
| **Build Size** | ~150MB | ~600MB |
| **Tempo Build** | ~3-5 min | ~2-3 min |
| **Hot Reload** | ❌ | ✅ |
| **Volumes** | ❌ | ✅ |
| **Performance** | ⚡⚡⚡ | ⚡ |
| **Debug** | 📊 (Health checks) | 📊 (Logs/Logs) |

---

## 🔍 Troubleshooting

### Erro: "Cannot find module 'react'"
```bash
# Limpar node_modules e reinstalar
docker-compose down -v
docker-compose up --build
```

### Erro: "Port 3000 already in use"
```bash
# Usar porta diferente
docker run -p 8000:3000 spacex-dashboard
```

### Container não responde
```bash
# Ver logs
docker-compose logs spacex-dashboard

# Reiniciar
docker-compose restart spacex-dashboard
```

---

## 📝 Variáveis de Ambiente

### Production (`docker-compose.yml`)
```env
NODE_ENV=production
```

### Development (`docker-compose.dev.yml`)
```env
NODE_ENV=development
WATCHPACK_POLLING=true  # Para detectar mudanças em volumes
```

---

## 🎯 Boas Práticas

✅ **Sempre usar `.dockerignore`** - Reduz tamanho do build
✅ **Multi-stage builds** - Otimiza imagem final
✅ **Health checks** - Monitora status do container
✅ **Volumes nomeados** - Persiste dados se necessário
✅ **Restart policy** - Container reinicia automaticamente

---

## 🚢 Deploy em Produção

### Opções de plataformas:

#### **Heroku**
```bash
heroku create spacex-dashboard
heroku container:push web
heroku container:release web
```

#### **AWS ECS**
```bash
aws ecr create-repository --repository-name spacex-dashboard
docker tag spacex-dashboard:latest <aws-account>.dkr.ecr.<region>.amazonaws.com/spacex-dashboard:latest
docker push <aws-account>.dkr.ecr.<region>.amazonaws.com/spacex-dashboard:latest
```

#### **DigitalOcean App Platform**
1. Conectar repositório GitHub
2. Auto-deploy a cada push

#### **Docker Hub**
```bash
docker tag spacex-dashboard:latest seu-usuario/spacex-dashboard:latest
docker push seu-usuario/spacex-dashboard:latest
```

---

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Node.js in Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

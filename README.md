# 🚀 SpaceX Mission Dashboard

Dashboard interativo de missões da SpaceX desenvolvido com **Clean Architecture + SOLID** e **React + TypeScript**.
<!-- 
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.1-764abc)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Como Executar](#-como-executar)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Decisões Técnicas](#-decisões-técnicas-e-trade-offs)
- [Uso de IA](#-uso-de-ia)

---

## 🌟 Sobre o Projeto

Dashboard completo para visualização de missões da SpaceX que consome a [API oficial da SpaceX](https://api.spacexdata.com/v4) para exibir informações detalhadas sobre lançamentos passados, futuros e em andamento.

### Funcionalidades Principais

- ✅ **Dashboard Principal** - Gráfico de pizza mostrando distribuição de lançamentos (sucesso, falha e pendentes)
- ✅ **Visualização de Dados** - Gráficos interativos com Recharts
- ✅ **Listagem de Missões** - Filtros para lançamentos futuros e passados
- ✅ **Detalhes de Missão** - Modal com informações completas de cada lançamento
- ✅ **Sistema de Notificações** - Feedback visual para ações do usuário
- ✅ **Gerenciamento de Estado** - Redux Toolkit para estado global
- ✅ **Interface Responsiva** - Layout adaptável para desktop e mobile
- ✅ **Tratamento de Erros** - Estados de loading, erro e dados vazios

--- -->

## 🚀 Como Executar

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/andreykawaguchi/spacex-mission-dashboard.git
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**

```bash
npm start
```

4. **Acesse no navegador**

O aplicativo será aberto automaticamente em [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm start

# Executa os testes unitários
npm test

# Cria build otimizado para produção
npm run build

# Ejeta as configurações do Create React App (irreversível)
npm run eject
```

---

## 🛠️ Tecnologias Utilizadas

### Core
- **[React 19.2.0](https://react.dev/)** - Biblioteca para construção de interfaces
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Redux Toolkit 2.9.1](https://redux-toolkit.js.org/)** - Gerenciamento de estado global

### Roteamento e Formulários
- **[React Router DOM 6.8.0](https://reactrouter.com/)** - Navegação entre páginas
- **[React Hook Form 7.65.0](https://react-hook-form.com/)** - Gerenciamento de formulários

### HTTP e APIs
- **[Axios 1.6.0](https://axios-http.com/)** - Cliente HTTP para requisições

### Estilização
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** - Estilização nativa
- **[Styled Components 6.1.0](https://styled-components.com/)** - CSS-in-JS

### Visualização de Dados
- **[Recharts 3.3.0](https://recharts.org/)** - Biblioteca para criar gráficos e visualizações

### Testes
- **[Jest 30.0.0](https://jestjs.io/)** - Framework de testes
- **[React Testing Library 16.3.0](https://testing-library.com/react)** - Testes de componentes
- **[@testing-library/user-event 13.5.0](https://testing-library.com/docs/user-event/intro)** - Simulação de interações

### DevTools
- **[React Scripts 5.0.1](https://create-react-app.dev/)** - Ferramentas do Create React App

---

## 🏗️ Arquitetura

Este projeto foi desenvolvido seguindo os princípios da **Clean Architecture** (Uncle Bob) e **SOLID**, garantindo separação de responsabilidades, testabilidade, manutenibilidade e código flexível.
<!-- 
### 🎯 Princípios SOLID Aplicados

#### **S - Single Responsibility Principle (SRP)**
✅ Cada classe tem uma única razão para mudar
- `GetAllLaunches.ts` - Responsável apenas por buscar todos os lançamentos
- `GetUpcomingLaunches.ts` - Responsável apenas por buscar lançamentos futuros
- `LaunchService.ts` - Responsável apenas por coordenar múltiplos use cases
- Componentes React com responsabilidades bem definidas

#### **O - Open/Closed Principle (OCP)**
✅ Aberto para extensão, fechado para modificação
- Novos use cases podem ser adicionados sem modificar os existentes
- Novos services podem ser criados implementando a mesma interface
- Fácil adicionar novos tipos de repositórios para diferentes APIs

#### **L - Liskov Substitution Principle (LSP)**
✅ Subtipos devem ser substituíveis pelo tipo base
- `SpaceXLaunchRepository` implementa `LaunchRepository` e pode ser substituída por outra implementação
- Qualquer implementação de `LaunchRepository` funciona com os use cases
- Facilita testes com mocks e stubs

#### **I - Interface Segregation Principle (ISP)**
✅ Clientes não devem depender de interfaces que não usam
- `LaunchRepository` possui apenas os métodos necessários
- Cada use case usa apenas os métodos relevantes
- Interfaces específicas em vez de genéricas

#### **D - Dependency Inversion Principle (DIP)**
✅ Depender de abstrações, não de implementações concretas
- `DependencyContainer` gerencia todas as dependências
- Use cases dependem de `LaunchRepository` (interface), não de `SpaceXLaunchRepository` (implementação)
- React Context fornece serviços injetados para componentes
- Fácil trocar implementações para testes e diferentes cenários -->

<!-- ### 📐 Estrutura de Camadas

```
src/
├── domain/                 # 🎯 Camada de Domínio (Regras de Negócio)
│   ├── entities/          # Entidades com lógica de negócio
│   ├── repositories/      # Interfaces (contratos) dos repositórios
│   └── usecases/         # Casos de uso da aplicação
│
├── application/           # 🔄 Camada de Aplicação (Orquestração)
│   └── services/         # Serviços que coordenam use cases
│
├── infrastructure/        # 🔧 Camada de Infraestrutura (Implementações)
│   ├── api/              # Cliente HTTP (Axios)
│   └── repositories/     # Implementações concretas dos repositórios
│
├── presentation/         # 🎨 Camada de Apresentação (UI)
│   ├── components/       # Componentes React reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── hooks/          # Custom hooks
│   └── context/        # React Context (DI)
│
├── store/               # 📦 Gerenciamento de Estado (Redux)
│   ├── slices/         # Redux slices
│   └── thunks/        # Operações assíncronas
│
└── shared/             # 🔀 Código Compartilhado
    ├── constants/      # Constantes da aplicação
    ├── utils/         # Funções utilitárias
    └── DependencyContainer.ts  # Container de Injeção de Dependências
``` -->

<!-- ### 🎯 Fluxo de Dependências

```
┌─────────────────────────────────────────────────────────────┐
│                   UI (React Components)                      │
│                   (Presentation Layer)                       │
└────────────────────────┬────────────────────────────────────┘
                         │ usa
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Redux Thunks / Custom Hooks                     │
└────────────────────────┬────────────────────────────────────┘
                         │ usa
                         ↓
┌─────────────────────────────────────────────────────────────┐
│           Application Services (LaunchService)               │
│                   (Application Layer)                        │
└────────────────────────┬────────────────────────────────────┘
                         │ usa
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  Use Cases (GetAllLaunches, GetUpcomingLaunches, etc.)     │
│                    (Domain Layer)                            │
└────────────────────────┬────────────────────────────────────┘
                         │ depende de
                         ↓
┌─────────────────────────────────────────────────────────────┐
│        Repository Interfaces (LaunchRepository)              │
│                    (Domain Layer)                            │
└────────────────────────△────────────────────────────────────┘
                         │ implementado por
                         │
┌─────────────────────────────────────────────────────────────┐
│   Repository Implementations (SpaceXLaunchRepository)        │
│                (Infrastructure Layer)                        │
└────────────────────────┬────────────────────────────────────┘
                         │ usa
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              HTTP Client (Axios) → SpaceX API                │
│                (Infrastructure Layer)                        │
└─────────────────────────────────────────────────────────────┘
``` -->

<!-- ### 📦 Principais Componentes

#### 1. **Domain Layer** (`src/domain/`)
Núcleo da aplicação com regras de negócio puras e independentes de frameworks.

**Entities:**
- `Launch.ts` - Entidade de lançamento com métodos de negócio (isSuccessful, getStatus, etc.)
- `Rocket.ts` - Entidade de foguete

**Repository Interfaces:**
- `LaunchRepository.ts` - Contrato abstrato para operações de lançamentos

**Use Cases:**
- `GetAllLaunches.ts` - Buscar todos os lançamentos
- `GetUpcomingLaunches.ts` - Buscar próximos lançamentos
- `GetPastLaunches.ts` - Buscar lançamentos passados
- `GetLatestLaunch.ts` - Buscar último lançamento
- `GetNextLaunch.ts` - Buscar próximo lançamento
- `GetLaunchById.ts` - Buscar lançamento por ID

#### 2. **Application Layer** (`src/application/`)
Orquestra múltiplos use cases e coordena fluxos complexos.

**Services:**
- `LaunchService.ts` - Coordena operações relacionadas a lançamentos

```typescript
class LaunchService {
  async refreshDashboardData() {
    // Executa múltiplos use cases em paralelo
    const [upcoming, past, latest, next] = await Promise.all([
      this.getUpcomingLaunches.execute(5),
      this.getPastLaunches.execute(5),
      this.getLatestLaunch.execute(),
      this.getNextLaunch.execute()
    ]);
    return { upcoming, past, latest, next };
  }
}
```

#### 3. **Infrastructure Layer** (`src/infrastructure/`)
Implementações concretas de interfaces, detalhes técnicos.

- `HttpClient.ts` - Wrapper do Axios
- `SpaceXLaunchRepository.ts` - Implementação concreta do LaunchRepository

#### 4. **Presentation Layer** (`src/presentation/`)
Interface com o usuário e componentes visuais.

- **Components:** LaunchModal, NotificationSystem, Sidebar, etc.
- **Pages:** Dashboard, LaunchesPage
- **Hooks:** useLaunches, useReduxLaunches
- **Context:** ServicesContext (Dependency Injection)

### 🔌 Injeção de Dependências

```typescript
// DependencyContainer.ts
class DependencyContainer {
  setupDependencies() {
    // Infraestrutura
    this.httpClient = new HttpClient();
    this.launchRepository = new SpaceXLaunchRepository(this.httpClient);
    
    // Use Cases
    this.getAllLaunches = new GetAllLaunches(this.launchRepository);
    // ...
    
    // Application Services
    this.launchService = new LaunchService(
      this.getAllLaunches,
      this.getUpcomingLaunches,
      // ...
    );
  }
}

// ServicesContext.tsx - Fornece serviços via Context API
<ServicesProvider>
  <App />
</ServicesProvider>
```

--- -->

## 💡 Decisões Técnicas e Trade-offs

### ✅ Decisões Arquiteturais

#### 1. **Clean Architecture + SOLID**
**Por quê?**
- ✅ Separação clara de responsabilidades (SRP)
- ✅ Código facilmente extensível (OCP)
- ✅ Implementações intercambiáveis (LSP)
- ✅ Interfaces bem definidas (ISP)
- ✅ Código testável (cada camada isoladamente)
- ✅ Independência de frameworks e bibliotecas externas (DIP)

**Trade-off:**
- ⚠️ Maior complexidade inicial (mais arquivos e abstrações)
- ⚠️ Curva de aprendizado para desenvolvedores não familiarizados
- ⚠️ Overhead para projetos muito pequenos
<!-- 
**Exemplos Práticos:**

```typescript
// ✅ SRP: Cada use case tem uma responsabilidade
class GetAllLaunches {
  async execute(options): Promise<Launch[]> {
    return this.repository.getAll(options);
  }
}

// ✅ DIP: Dependência em interface, não em implementação
class GetAllLaunches {
  constructor(private repository: LaunchRepository) {} // Interface!
}

// ✅ LSP: SpaceXLaunchRepository substitui LaunchRepository
class SpaceXLaunchRepository implements LaunchRepository {
  async getAll(options): Promise<Launch[]> {
    // Implementação específica
  }
}

// ✅ OCP: Fácil adicionar novo use case sem modificar existentes
class GetLaunchById {
  async execute(id: string): Promise<Launch> {
    return this.repository.getById(id);
  }
}

// ✅ ISP: Interface segmentada, não genérica
interface LaunchRepository {
  getAll(options): Promise<Launch[]>;
  getById(id: string): Promise<Launch>;
  getUpcoming(limit: number): Promise<Launch[]>;
  // Métodos específicos, não genéricos
}
``` -->

#### 2. **Redux Toolkit para Estado Global**
**Por quê?**
- ✅ Gerenciamento centralizado de estado
- ✅ DevTools para debugging
- ✅ RTK simplifica muito a configuração do Redux
- ✅ Immer integrado para imutabilidade

**Trade-off:**
- ⚠️ Boilerplate adicional (actions, reducers, thunks)
- ⚠️ Context API seria suficiente para projetos menores
- ⚠️ Curva de aprendizado para iniciantes

**Alternativas consideradas:**
- Context API + useReducer (mais simples, mas menos escalável)
- Zustand (mais leve, mas menos recursos)
- MobX (mais simples, mas menos previsível)

#### 3. **TypeScript**
**Por quê?**
- ✅ Detecção de erros em tempo de desenvolvimento
- ✅ Intellisense e autocomplete
- ✅ Refatoração mais segura
- ✅ Documentação "viva" através de tipos

**Trade-off:**
- ⚠️ Configuração inicial mais complexa
- ⚠️ Tempo adicional para definir tipos
- ⚠️ Build ligeiramente mais lento

#### 4. **Repository Pattern**
**Por quê?**
- ✅ Abstração do acesso a dados
- ✅ Facilita troca de fonte de dados (API → Mock → LocalStorage)
- ✅ Facilita testes (mock de repositórios)
- ✅ Centraliza lógica de transformação de dados

**Trade-off:**
- ⚠️ Camada adicional de abstração
- ⚠️ Pode ser over-engineering para APIs muito simples

#### 5. **Use Cases Pattern**
**Por quê?**
- ✅ Encapsula regras de negócio específicas
- ✅ Reutilizável em diferentes partes da aplicação
- ✅ Facilita testes unitários
- ✅ Single Responsibility Principle

**Trade-off:**
- ⚠️ Muitos arquivos pequenos (pode parecer verboso)
- ⚠️ Para operações muito simples, pode ser desnecessário

### 🎨 Decisões de UI/UX

#### 1. **CSS Puro + CSS Modules**
**Por quê?**
- ✅ Sem dependências pesadas
- ✅ Performance nativa do CSS
- ✅ Controle total sobre estilos
- ✅ Styled Components usado apenas onde necessário

**Alternativas consideradas:**
- Tailwind CSS (utilitário, mas verboso no JSX)
- Material-UI (componentes prontos, mas pesado)
- Chakra UI (boa DX, mas adiciona dependências)

#### 2. **React 19**
**Por quê?**
- ✅ Versão mais recente com melhorias de performance
- ✅ Server Components (preparado para futuro)
- ✅ Concurrent Features

**Trade-off:**
- ⚠️ Possíveis incompatibilidades com bibliotecas antigas
- ⚠️ Documentação ainda em transição

### 🧪 Decisões de Testes

#### 1. **Jest + React Testing Library**
**Por quê?**
- ✅ Stack padrão da comunidade React
- ✅ Testa comportamento, não implementação
- ✅ Excelente documentação

**Cobertura de testes:**
- ✅ Entidades de domínio (Launch, Rocket)
- ✅ Use Cases
- ✅ Componentes React (LaunchModal, hooks)
- ⚠️ Cobertura de integração poderia ser expandida

### 📦 Decisões de Gerenciamento de Dependências

#### 1. **Axios vs Fetch**
**Escolha:** Axios

**Por quê?**
- ✅ Interceptors para tratamento global de erros
- ✅ Transformação automática de JSON
- ✅ Timeout configurável
- ✅ Melhor suporte a cancelamento de requisições

#### 2. **React Hook Form**
**Por quê?**
- ✅ Performance (renderizações mínimas)
- ✅ Validação integrada
- ✅ API simples e intuitiva

## 🤖 Uso de IA

Este projeto foi desenvolvido com auxílio de **Inteligência Artificial** como ferramenta de produtividade e qualidade:

### 🎯 Onde a IA foi Utilizada

#### 1. **Arquitetura e Design Patterns**
- ✅ Consultas sobre implementação de Clean Architecture
- ✅ Discussões sobre padrões de projeto (Repository, Use Case, Service Layer)
- ✅ Validação de fluxos de dependências

#### 2. **Geração de Código**
- ✅ Scaffolding inicial de estrutura de pastas
- ✅ Boilerplate de classes e interfaces
- ✅ Implementação de testes unitários

#### 3. **Documentação**
- ✅ Geração de comentários JSDoc
- ✅ Escrita deste README
- ✅ Diagramas de arquitetura em Markdown

#### 4. **Revisão de Código**
- ✅ Sugestões de melhorias de performance
- ✅ Identificação de code smells
- ✅ Verificação de boas práticas TypeScript/React

### 💭 Reflexão sobre o Uso de IA

**Vantagens:**
- ⚡ Acelerou desenvolvimento de features repetitivas
- 📚 Sugestões de padrões e boas práticas
- 🐛 Ajudou a identificar bugs sutis
- 📖 Geração rápida de documentação

**Limitações:**
- 🧠 Decisões arquiteturais ainda requerem análise humana
- 🎨 Detalhes de UX/UI precisam de toque humano
- 🔍 Código gerado sempre revisado e adaptado
- 🧪 Testes precisam ser validados manualmente

**Ferramentas Utilizadas:**
- GitHub Copilot - Autocompletar código
- ChatGPT/Claude - Consultas arquiteturais e documentação
- Cursor AI - Edição assistida de código

---

## 📡 API da SpaceX

Este projeto consome a [SpaceX-API v4](https://github.com/r-spacex/SpaceX-API):

**Base URL:** `https://api.spacexdata.com/v4`

**Endpoints utilizados:**
- `GET /launches` - Todos os lançamentos
- `GET /launches/upcoming` - Próximos lançamentos
- `GET /launches/past` - Lançamentos passados
- `GET /launches/latest` - Último lançamento
- `GET /launches/next` - Próximo lançamento
- `GET /launches/:id` - Lançamento específico

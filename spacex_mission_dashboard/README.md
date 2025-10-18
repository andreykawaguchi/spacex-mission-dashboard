# SpaceX Mission Dashboard

Dashboard de missões da SpaceX desenvolvido seguindo os princípios da **Clean Architecture**.

## 🚀 Sobre o Projeto

Este projeto consome a API oficial da SpaceX (https://api.spacexdata.com/v4) para exibir informações sobre lançamentos, seguindo uma arquitetura limpa e bem estruturada.

## 🏗️ Arquitetura

O projeto segue os princípios da Clean Architecture, organizando o código em camadas bem definidas:

```
src/
├── domain/                 # Camada de Domínio
│   ├── entities/          # Entidades de negócio
│   ├── repositories/      # Contratos dos repositórios
│   └── usecases/         # Casos de uso
├── infrastructure/        # Camada de Infraestrutura
│   ├── api/              # Cliente HTTP
│   └── repositories/     # Implementações dos repositórios
├── presentation/         # Camada de Apresentação
│   ├── components/       # Componentes React
│   ├── pages/           # Páginas
│   └── hooks/          # Hooks customizados
└── shared/             # Código compartilhado
    ├── constants/      # Constantes
    ├── utils/         # Utilitários
    └── DependencyContainer.js  # Injeção de dependências
```

### Principais Conceitos Implementados:

- **Separation of Concerns**: Cada camada tem responsabilidades bem definidas
- **Dependency Inversion**: As dependências apontam para abstrações
- **Dependency Injection**: Container centralizado para gerenciar dependências
- **Single Responsibility**: Cada classe/módulo tem uma única responsabilidade
- **Interface Segregation**: Contratos específicos para cada necessidade

## 🛠️ Tecnologias Utilizadas

- **React 19.2.0** - Framework de interface
- **Axios** - Cliente HTTP para consumir APIs
- **JavaScript ES6+** - Linguagem de programação
- **CSS3** - Estilização

## 📦 Funcionalidades

- ✅ Exibição do próximo lançamento
- ✅ Exibição do último lançamento
- ✅ Lista dos próximos lançamentos
- ✅ Lista dos lançamentos recentes
- ✅ Estados de loading e erro
- ✅ Layout responsivo
- ✅ Tratamento de erros

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd spacex_mission_dashboard
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
npm start
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📝 Scripts Disponíveis

- `npm start` - Executa o app em modo de desenvolvimento
- `npm test` - Executa os testes
- `npm run build` - Cria o build de produção
- `npm run eject` - Ejeta as configurações do Create React App

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 🚀 Build de Produção

Para criar o build de produção:
```bash
npm run build
```

## 📡 API Utilizada

Este projeto consome a API oficial da SpaceX:
- **Base URL**: https://api.spacexdata.com/v4
- **Endpoints utilizados**:
  - `/launches` - Todos os lançamentos
  - `/launches/upcoming` - Próximos lançamentos
  - `/launches/past` - Lançamentos passados
  - `/launches/latest` - Último lançamento
  - `/launches/next` - Próximo lançamento

## 🔧 Estrutura das Entidades

### Launch Entity
```javascript
{
  id: string,
  name: string,
  flightNumber: number,
  dateUtc: string,
  success: boolean,
  upcoming: boolean,
  details: string,
  // ... outros campos
}
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

Grupo Lume - BlendIT

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

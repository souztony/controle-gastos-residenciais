# 💰 Controle de Gastos Residenciais

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![.NET](https://img.shields.io/badge/.NET-8.0-blueviolet)
![React](https://img.shields.io/badge/React-19-blue)

Uma aplicação moderna e intuitiva para o gerenciamento de finanças domésticas, permitindo o controle preciso de receitas, despesas e relatórios por pessoa ou categoria.

## 🚀 Visão Geral

O projeto é dividido em uma arquitetura robusta de **Backend (API)** e um **Frontend (SPA)** responsivo, garantindo performance e escalabilidade.

### 🏗️ Arquitetura

- **Backend**: Desenvolvido com ASP.NET Core 8, utilizando SQLite como banco de dados e Entity Framework Core para persistência.
- **Frontend**: Single Page Application (SPA) construída com React, Vite e TypeScript, focada em uma experiência de usuário (UX) fluida e moderna.

## 📁 Estrutura do Projeto

```text
controle-gastos-residenciais/
├── backend/             # API ASP.NET Core
│   └── ControleGastos.Api/
├── frontend/            # Aplicação React/Vite
│   └── src/
└── controle-gastos-residenciais.sln
```

## 🛠️ Tecnologias Principais

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Backend**: [.NET 8](https://dotnet.microsoft.com/), [ASP.NET Core Web API](https://learn.microsoft.com/en-us/aspnet/core/web-api/)
- **Banco de Dados**: [SQLite](https://www.sqlite.org/)
- **ORM**: [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)

## 🚦 Como Iniciar

### Pré-requisitos

- [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Executando o Backend

1. Navegue até a pasta do backend: `cd backend/ControleGastos.Api`
2. Execute o projeto: `dotnet run`
3. A API estará disponível em `http://localhost:5031` (ou conforme configurado).
4. Acesse o Swagger em `/swagger` para documentação dos endpoints.

### Executando o Frontend

1. Navegue até a pasta do frontend: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Acesse em `http://localhost:5173`.

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido por [Tony Souza](https://github.com/souztony)
# Controle de Gastos Residenciais – Backend

API REST desenvolvida para gerenciar gastos residenciais, permitindo o cadastro de pessoas, categorias e transações financeiras. Este backend foi desenvolvido como parte de um **teste técnico Full Stack**, com foco em organização, clareza de regras de negócio e documentação.

---

## 📌 Objetivo

Fornecer uma API responsável por:
- Gerenciar **pessoas** vinculadas aos gastos
- Organizar **categorias** de despesas
- Registrar **transações financeiras** (gastos)
- Disponibilizar endpoints REST para consumo por um frontend

---

## 🛠️ Tecnologias Utilizadas

- **.NET 8**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **Entity Framework Core SQLite**
- **Swagger / OpenAPI**
- **SQLite**
- **C#**

---

## 📂 Estrutura do Projeto

```
ControleGastos.Api
├── Controllers
│   ├── PessoasController.cs
│   ├── CategoriasController.cs
│   └── TransacoesController.cs
├── Models
│   ├── Pessoa.cs
│   ├── Categoria.cs
│   └── Transacao.cs
├── Data
│   └── AppDbContext.cs
├── Program.cs
└── appsettings.json
```

---

## 📖 Endpoints Disponíveis

### 👤 Pessoas

- **GET** `/api/Pessoas`
  - Lista todas as pessoas cadastradas

- **POST** `/api/Pessoas`
  - Cadastra uma nova pessoa

---

### 🗂️ Categorias

- **GET** `/api/Categorias`
  - Lista todas as categorias de gastos

- **POST** `/api/Categorias`
  - Cadastra uma nova categoria

---

### 💰 Transações

- **GET** `/api/Transacoes`
  - Lista todas as transações registradas

- **POST** `/api/Transacoes`
  - Registra uma nova transação financeira

---

## 🧪 Documentação da API

Após executar o projeto, a documentação interativa estará disponível via **Swagger**:

```
http://localhost:5259/swagger
```

Por meio do Swagger é possível:
- Visualizar todos os endpoints
- Testar requisições GET e POST
- Ver os modelos de dados utilizados

---

## ▶️ Como Executar o Projeto

1. Clone o repositório
2. Acesse a pasta do backend
3. O projeto utiliza **SQLite**, não sendo necessária configuração externa de banco de dados
4. Execute o comando:

```
dotnet run
```

5. A API será iniciada e o Swagger ficará disponível no navegador

---

## 📌 Observações

- O projeto segue o padrão **REST**
- A separação de responsabilidades foi mantida entre Controllers, Models e Data
- Comentários e organização do código foram priorizados conforme solicitado no teste técnico

---

## 👨‍💻 Autor

**Tony Souza**
- LinkedIn: https://www.linkedin.com/in/souztony/
- GitHub: https://github.com/souztony

# Controle de Gastos Residenciais – Frontend

Aplicação frontend desenvolvida para consumo da API de controle de gastos residenciais. Este projeto faz parte de um **teste técnico Full Stack**, com foco em clareza, aderência às regras de negócio e boas práticas no uso de **React com TypeScript**.

---

## 📌 Objetivo

Fornecer uma interface web responsável por:
- Gerenciar **pessoas** vinculadas aos gastos
- Gerenciar **categorias** de despesas e receitas
- Registrar e listar **transações financeiras**
- Exibir **consultas de totais** por pessoa e por categoria
- Consumir corretamente a API REST desenvolvida em .NET

---

## 🛠️ Tecnologias Utilizadas

- **React**
- **TypeScript**
- **Vite**
- **Fetch API**
- **HTML5 / CSS básico**

---

## 📂 Estrutura do Projeto

```
src/
├── api
│   ├── http.ts
│   ├── pessoas.ts
│   ├── categorias.ts
│   ├── transacoes.ts
│   └── totais.ts
├── pages
│   ├── Pessoas.tsx
│   ├── Categorias.tsx
│   ├── Transacoes.tsx
│   ├── TotaisPorPessoa.tsx
│   └── TotaisPorCategoria.tsx
├── components
├── types
│   ├── Pessoa.ts
│   ├── Categoria.ts
│   ├── Transacao.ts
│   └── Totais.ts
├── App.tsx
└── main.tsx
```

---

## 📖 Funcionalidades Implementadas

### 👤 Pessoas

- Listagem de pessoas cadastradas
- Criação de novas pessoas
- Exclusão de pessoas

Campos:
- Identificador (gerado automaticamente)
- Nome
- Idade

> Ao excluir uma pessoa, suas transações associadas são removidas conforme regra aplicada no backend.

---

### 🗂️ Categorias

- Listagem de categorias
- Criação de novas categorias

Campos:
- Identificador (gerado automaticamente)
- Descrição
- Finalidade: **Despesa**, **Receita** ou **Ambas**

---

### 💰 Transações

- Listagem de transações financeiras
- Criação de novas transações

Regras de negócio respeitadas:
- Pessoas menores de 18 anos só podem registrar **despesas**
- Categorias disponíveis são filtradas conforme o tipo da transação:
  - Despesa → categorias do tipo Despesa ou Ambas
  - Receita → categorias do tipo Receita ou Ambas

Campos:
- Identificador (gerado automaticamente)
- Descrição
- Valor
- Tipo (Despesa ou Receita)
- Categoria
- Pessoa

---

### 📊 Consultas

#### Totais por Pessoa (Obrigatório)
- Exibição do total de receitas, despesas e saldo por pessoa
- Exibição do total geral considerando todas as pessoas

#### Totais por Categoria (Opcional)
- Exibição do total de receitas, despesas e saldo por categoria
- Exibição do total geral considerando todas as categorias

---

## ▶️ Como Executar o Projeto

1. Acesse a pasta do frontend
2. Instale as dependências:

```
npm install
```

3. Execute o projeto:

```
npm run dev
```

4. A aplicação estará disponível em:

```
http://localhost:5173
```

> ⚠️ O backend deve estar em execução em `http://localhost:5259`.

---

## 📌 Observações

- O frontend consome exclusivamente a API REST do backend
- As regras de negócio críticas são validadas no backend
- O frontend trata e exibe mensagens de erro retornadas pela API
- O projeto foi desenvolvido com foco em simplicidade, organização e aderência total ao escopo do teste técnico

---

## 👨‍💻 Autor

**Tony Souza**

- LinkedIn: https://www.linkedin.com/in/souztony/
- GitHub: https://github.com/souztony


# ⚙️ Controle de Gastos - API Backend

Este diretório contém a API do sistema de Controle de Gastos Residenciais, desenvolvida com **ASP.NET Core 8**.

## 🛠️ Tecnologias e Frameworks

- **Runtime**: [.NET 8](https://dotnet.microsoft.com/)
- **Framework Web**: [ASP.NET Core Web API](https://learn.microsoft.com/en-us/aspnet/core/web-api/)
- **ORM**: [Entity Framework Core (EF Core)](https://learn.microsoft.com/en-us/ef/core/)
- **Banco de Dados**: [SQLite](https://www.sqlite.org/) (Armazenamento local em arquivo)
- **Documentação**: [Swagger / UI](https://swagger.io/)

## 📂 Estrutura de Pastas

- `/Controllers`: Endpoints da API (Categorias, Pessoas, Transações, Relatórios).
- `/Data`: Contexto do Banco de Dados (Entity Framework).
- `/Models`: Entidades do domínio.
- `/DTOs`: Objetos de Transferência de Dados.
- `/Migrations`: Histórico de evolução do banco de dados.

## 🚀 Como Rodar

1. **Restaurar Dependências**:
   ```bash
   dotnet restore
   ```

2. **Atualizar Banco de Dados** (Se necessário):
   ```bash
   dotnet ef database update
   ```

3. **Executar a Aplicação**:
   ```bash
   dotnet run
   ```

A API estará rodando por padrão em: `http://localhost:5031`

## 📖 Documentação da API

Uma vez que a aplicação esteja rodando, você pode acessar a interface do Swagger para testar os endpoints:

👉 [http://localhost:5031/swagger](http://localhost:5031/swagger)

### Principais Endpoints

- `GET /api/Categorias`: Lista todas as categorias.
- `GET /api/Pessoas`: Lista todas as pessoas cadastradas.
- `GET /api/Transacoes`: Gerenciamento de entradas e saídas financeiras.
- `GET /api/Relatorios`: Dashboards e totais por categoria/pessoa.

## 🔧 Configurações

O arquivo `appsettings.json` contém as configurações de conexão:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=controle_gastos.db"
  }
}
```

---
> [!NOTE]
> O banco de dados SQLite é gerado automaticamente na raiz da pasta `ControleGastos.Api` ao iniciar a aplicação pela primeira vez.

using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ===============================
// Serviços
// ===============================

// Habilita Controllers (Web API)
builder.Services.AddControllers();

// Configuração do banco de dados SQLite
// Isso cria e mantém o arquivo controle_gastos.db
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=controle_gastos.db"));

// Swagger (documentação da API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ===============================
// Pipeline HTTP
// ===============================

if (app.Environment.IsDevelopment())
{
    // Ativa Swagger apenas em desenvolvimento
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirecionamento HTTPS
app.UseHttpsRedirection();

// Mapeia os Controllers
app.MapControllers();

// Inicia a aplicação
app.Run();
var builder = WebApplication.CreateBuilder(args);

// ===============================
// Serviços
// ===============================

// Habilita Controllers (MVC / Web API)
builder.Services.AddControllers();

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

app.UseHttpsRedirection();

// Mapeia os Controllers
app.MapControllers();

app.Run();
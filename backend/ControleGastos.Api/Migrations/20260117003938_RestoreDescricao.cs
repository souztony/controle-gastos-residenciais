using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleGastos.Api.Migrations
{
    /// <inheritdoc />
    public partial class RestoreDescricao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Observacao",
                table: "Transacoes",
                newName: "Descricao");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Transacoes",
                newName: "Observacao");
        }
    }
}

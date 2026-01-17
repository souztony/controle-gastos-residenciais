using ControleGastos.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    /// <summary>
    /// Representa uma categoria de transação (ex: Alimentação, Salário)
    /// </summary>
    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public FinalidadeCategoria Finalidade { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public System.Collections.Generic.List<Transacao> Transacoes { get; set; } = new System.Collections.Generic.List<Transacao>();
    }
}
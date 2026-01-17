using ControleGastos.Api.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.Api.Models
{
    /// <summary>
    /// Representa uma transação financeira (despesa ou receita)
    /// </summary>
    public class Transacao
    {
        public int Id { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Valor { get; set; }

        [Required]
        public TipoTransacao Tipo { get; set; }

        // Relacionamentos
        public int CategoriaId { get; set; }
        public Categoria? Categoria { get; set; }

        public int PessoaId { get; set; }
        public Pessoa? Pessoa { get; set; }
    }
}
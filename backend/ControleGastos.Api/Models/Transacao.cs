using ControleGastos.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    /// <summary>
    /// Representa uma transação financeira
    /// </summary>
    public class Transacao
    {
        public int Id { get; set; }

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public TipoTransacao Tipo { get; set; }

        [Required]
        public int PessoaId { get; set; }

        // 'null!' diz ao compilador que EF vai preencher essa propriedade
        public Pessoa Pessoa { get; set; } = null!;

        [Required]
        public int CategoriaId { get; set; }

        public Categoria Categoria { get; set; } = null!;

        public string? Observacao { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    /// <summary>
    /// Representa uma pessoa que pode possuir transações financeiras
    /// </summary>
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        public int Idade { get; set; }

        // Relacionamento: uma pessoa pode ter várias transações
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
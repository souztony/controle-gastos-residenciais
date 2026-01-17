namespace ControleGastos.Api.DTOs
{
    /// <summary>
    /// DTO usado para exibir o resumo financeiro de uma pessoa
    /// </summary>
    public class RelatorioPessoaDto
    {
        public int PessoaId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
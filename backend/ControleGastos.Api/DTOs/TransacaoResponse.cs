using ControleGastos.Api.Enums;

namespace ControleGastos.Api.DTOs;

public class TransacaoResponse
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public int PessoaId { get; set; }
    public int CategoriaId { get; set; }
}
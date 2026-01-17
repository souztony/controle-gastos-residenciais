using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ControleGastos.Api.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty; // inicializado para evitar warning
        public int Idade { get; set; }

        [JsonIgnore] // evita ciclo de referência Pessoa -> Transacoes -> Pessoa
        public List<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
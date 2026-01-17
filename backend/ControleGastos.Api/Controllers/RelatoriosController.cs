using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RelatoriosController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna o total de receitas, despesas e saldo por pessoa
        /// incluindo o total geral
        /// </summary>
        [HttpGet("pessoas")]
        public async Task<ActionResult> TotaisPorPessoa()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var resultado = pessoas.Select(p => new RelatorioPessoaDto
            {
                PessoaId = p.Id,
                Nome = p.Nome,
                TotalReceitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor),
                TotalDespesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor)
            }).ToList();

            var totalGeral = new
            {
                TotalReceitas = resultado.Sum(r => r.TotalReceitas),
                TotalDespesas = resultado.Sum(r => r.TotalDespesas),
                Saldo = resultado.Sum(r => r.Saldo)
            };

            return Ok(new
            {
                Pessoas = resultado,
                TotalGeral = totalGeral
            });
        }
    }
}
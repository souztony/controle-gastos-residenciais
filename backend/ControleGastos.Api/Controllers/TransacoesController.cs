using ControleGastos.Api.Data;
using ControleGastos.Api.Enums;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransacoesController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lista todas as transações cadastradas
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> Get()
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .ToListAsync();

            return Ok(transacoes);
        }

        /// <summary>
        /// Cria uma nova transação com validações de negócio
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> Post(Transacao transacao)
        {
            // Busca a pessoa no banco
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            if (pessoa == null)
                return BadRequest("Pessoa não encontrada.");

            // Regra: menor de idade não pode ter receita
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                return BadRequest("Pessoa menor de 18 anos não pode registrar receitas.");

            // Busca a categoria
            var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);
            if (categoria == null)
                return BadRequest("Categoria não encontrada.");

            // Regra: categoria deve ser compatível com o tipo da transação
            if (categoria.Finalidade != FinalidadeCategoria.Ambas)
            {
                if ((transacao.Tipo == TipoTransacao.Despesa && categoria.Finalidade != FinalidadeCategoria.Despesa) ||
                    (transacao.Tipo == TipoTransacao.Receita && categoria.Finalidade != FinalidadeCategoria.Receita))
                {
                    return BadRequest("Categoria incompatível com o tipo da transação.");
                }
            }

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return Ok(transacao);
        }
    }
}
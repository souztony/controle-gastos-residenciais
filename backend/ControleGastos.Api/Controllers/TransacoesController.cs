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
            try
            {
                var transacoes = await _context.Transacoes
                    .Include(t => t.Pessoa)
                    .Include(t => t.Categoria)
                    .ToListAsync();

                return Ok(transacoes);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); // Log detalhado no console
                return StatusCode(500, "Erro ao carregar transações: " + ex.Message);
            }
        }

        /// <summary>
        /// Cria uma nova transação com validações de negócio
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Transacao transacao)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
                if (pessoa == null)
                    return BadRequest("Pessoa não encontrada.");

                if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                    return BadRequest("Pessoa menor de 18 anos não pode registrar receitas.");

                var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);
                if (categoria == null)
                    return BadRequest("Categoria não encontrada.");

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

                // Retorna a transação completa, já com Pessoa e Categoria carregados
                var transacaoCompleta = await _context.Transacoes
                    .Include(t => t.Pessoa)
                    .Include(t => t.Categoria)
                    .FirstOrDefaultAsync(t => t.Id == transacao.Id);

                return Ok(transacaoCompleta);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex); // Log detalhado no console
                return StatusCode(500, "Erro ao criar transação: " + ex.Message);
            }
        }
    }
}
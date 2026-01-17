using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers
{
    /// <summary>
    /// Controlador responsável pelo gerenciamento de pessoas no sistema.
    /// Permite a criação, listagem e exclusão de registros.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// O DbContext é injetado automaticamente pelo sistema de injeção de dependências do .NET.
        /// </summary>
        public PessoasController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lista todas as pessoas cadastradas
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> Get()
        {
            var pessoas = await _context.Pessoas.ToListAsync();
            return Ok(pessoas);
        }

        /// <summary>
        /// Cria uma nova pessoa
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Pessoa>> Post(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = pessoa.Id }, pessoa);
        }

        /// <summary>
        /// Remove uma pessoa pelo Id
        /// Todas as transações ligadas a ela serão removidas automaticamente
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
                return NotFound();

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriasController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lista todas as categorias cadastradas
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> Get()
        {
            var categorias = await _context.Categorias.ToListAsync();
            return Ok(categorias);
        }

        /// <summary>
        /// Cria uma nova categoria
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = categoria.Id }, categoria);
        }
    }
}
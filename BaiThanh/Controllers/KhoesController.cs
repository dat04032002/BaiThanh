using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BaiThanh.Model;

namespace BaiThanh.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoesController : ControllerBase
    {
        private readonly BaoCaoContext _context;

        public KhoesController(BaoCaoContext context)
        {
            _context = context;
        }

        // GET: api/Khoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kho>>> Getkhos()
        {
          if (_context.khos == null)
          {
              return NotFound();
          }
            return await _context.khos.ToListAsync();
        }

        // GET: api/Khoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Kho>> GetKho(int id)
        {
          if (_context.khos == null)
          {
              return NotFound();
          }
            var kho = await _context.khos.FindAsync(id);

            if (kho == null)
            {
                return NotFound();
            }

            return kho;
        }

        // PUT: api/Khoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKho(int id, Kho kho)
        {
            if (id != kho.Id)
            {
                return BadRequest();
            }

            _context.Entry(kho).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KhoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Khoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Kho>> PostKho(Kho kho)
        {
          if (_context.khos == null)
          {
              return Problem("Entity set 'BaoCaoContext.khos'  is null.");
          }
            _context.khos.Add(kho);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKho", new { id = kho.Id }, kho);
        }

        // DELETE: api/Khoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKho(int id)
        {
            if (_context.khos == null)
            {
                return NotFound();
            }
            var kho = await _context.khos.FindAsync(id);
            if (kho == null)
            {
                return NotFound();
            }

            _context.khos.Remove(kho);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KhoExists(int id)
        {
            return (_context.khos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

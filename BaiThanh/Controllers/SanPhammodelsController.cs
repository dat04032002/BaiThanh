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
    public class SanPhammodelsController : ControllerBase
    {
        private readonly BaoCaoContext _context;

        public SanPhammodelsController(BaoCaoContext context)
        {
            _context = context;
        }

        // GET: api/SanPhammodels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPhammodel>>> GetsanPhams()
        {
          if (_context.sanPhams == null)
          {
              return NotFound();
          }
            return await _context.sanPhams.ToListAsync();
        }

        // GET: api/SanPhammodels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPhammodel>> GetSanPhammodel(int? id)
        {
          if (_context.sanPhams == null)
          {
              return NotFound();
          }
            var sanPhammodel = await _context.sanPhams.FindAsync(id);

            if (sanPhammodel == null)
            {
                return NotFound();
            }

            return sanPhammodel;
        }

        // PUT: api/SanPhammodels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanPhammodel(int? id, SanPhammodel sanPhammodel)
        {
            if (id != sanPhammodel.Id)
            {
                return BadRequest();
            }

            _context.Entry(sanPhammodel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhammodelExists(id))
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

        // POST: api/SanPhammodels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanPhammodel>> PostSanPhammodel(SanPhammodel sanPhammodel)
        {
          if (_context.sanPhams == null)
          {
              return Problem("Entity set 'BaoCaoContext.sanPhams'  is null.");
          }
            _context.sanPhams.Add(sanPhammodel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanPhammodel", new { id = sanPhammodel.Id }, sanPhammodel);
        }

        // DELETE: api/SanPhammodels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanPhammodel(int? id)
        {
            if (_context.sanPhams == null)
            {
                return NotFound();
            }
            var sanPhammodel = await _context.sanPhams.FindAsync(id);
            if (sanPhammodel == null)
            {
                return NotFound();
            }

            _context.sanPhams.Remove(sanPhammodel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SanPhammodelExists(int? id)
        {
            return (_context.sanPhams?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

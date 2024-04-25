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
    public class DanhMucSanPhamsController : ControllerBase
    {
        private readonly BaoCaoContext _context;

        public DanhMucSanPhamsController(BaoCaoContext context)
        {
            _context = context;
        }

        // GET: api/DanhMucSanPhams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanhMucSanPham>>> GetdanhMucSanPhams()
        {
          if (_context.danhMucSanPhams == null)
          {
              return NotFound();
          }
            return await _context.danhMucSanPhams.ToListAsync();
        }

        // GET: api/DanhMucSanPhams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DanhMucSanPham>> GetDanhMucSanPham(int id)
        {
          if (_context.danhMucSanPhams == null)
          {
              return NotFound();
          }
            var danhMucSanPham = await _context.danhMucSanPhams.FindAsync(id);

            if (danhMucSanPham == null)
            {
                return NotFound();
            }

            return danhMucSanPham;
        }

        // PUT: api/DanhMucSanPhams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDanhMucSanPham(int id, DanhMucSanPham danhMucSanPham)
        {
            if (id != danhMucSanPham.Id)
            {
                return BadRequest();
            }

            _context.Entry(danhMucSanPham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DanhMucSanPhamExists(id))
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

        // POST: api/DanhMucSanPhams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DanhMucSanPham>> PostDanhMucSanPham(DanhMucSanPham danhMucSanPham)
        {
          if (_context.danhMucSanPhams == null)
          {
              return Problem("Entity set 'BaoCaoContext.danhMucSanPhams'  is null.");
          }
            _context.danhMucSanPhams.Add(danhMucSanPham);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDanhMucSanPham", new { id = danhMucSanPham.Id }, danhMucSanPham);
        }

        // DELETE: api/DanhMucSanPhams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDanhMucSanPham(int id)
        {
            if (_context.danhMucSanPhams == null)
            {
                return NotFound();
            }
            var danhMucSanPham = await _context.danhMucSanPhams.FindAsync(id);
            if (danhMucSanPham == null)
            {
                return NotFound();
            }

            _context.danhMucSanPhams.Remove(danhMucSanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DanhMucSanPhamExists(int id)
        {
            return (_context.danhMucSanPhams?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

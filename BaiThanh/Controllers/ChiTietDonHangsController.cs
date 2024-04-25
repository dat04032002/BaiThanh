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
    public class ChiTietDonHangsController : ControllerBase
    {
        private readonly BaoCaoContext _context;

        public ChiTietDonHangsController(BaoCaoContext context)
        {
            _context = context;
        }

        // GET: api/ChiTietDonHangs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChiTietDonHang>>> GetchiTietDonHangs()
        {
          if (_context.chiTietDonHangs == null)
          {
              return NotFound();
          }
            return await _context.chiTietDonHangs.ToListAsync();
        }

        // GET: api/ChiTietDonHangs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChiTietDonHang>> GetChiTietDonHang(int? id)
        {
          if (_context.chiTietDonHangs == null)
          {
              return NotFound();
          }
            var chiTietDonHang = await _context.chiTietDonHangs.FindAsync(id);

            if (chiTietDonHang == null)
            {
                return NotFound();
            }

            return chiTietDonHang;
        }

        // PUT: api/ChiTietDonHangs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChiTietDonHang(int? id, ChiTietDonHang chiTietDonHang)
        {
            if (id != chiTietDonHang.Id)
            {
                return BadRequest();
            }

            _context.Entry(chiTietDonHang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChiTietDonHangExists(id))
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

        // POST: api/ChiTietDonHangs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ChiTietDonHang>> PostChiTietDonHang(ChiTietDonHang chiTietDonHang)
        {
          if (_context.chiTietDonHangs == null)
          {
              return Problem("Entity set 'BaoCaoContext.chiTietDonHangs'  is null.");
          }
            _context.chiTietDonHangs.Add(chiTietDonHang);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChiTietDonHang", new { id = chiTietDonHang.Id }, chiTietDonHang);
        }

        // DELETE: api/ChiTietDonHangs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChiTietDonHang(int? id)
        {
            if (_context.chiTietDonHangs == null)
            {
                return NotFound();
            }
            var chiTietDonHang = await _context.chiTietDonHangs.FindAsync(id);
            if (chiTietDonHang == null)
            {
                return NotFound();
            }

            _context.chiTietDonHangs.Remove(chiTietDonHang);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChiTietDonHangExists(int? id)
        {
            return (_context.chiTietDonHangs?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

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
    public class DonHangsController : ControllerBase
    {
        private readonly BaoCaoContext _context;

        public DonHangsController(BaoCaoContext context)
        {
            _context = context;
        }

        // GET: api/DonHangs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonHang>>> GetdonHang()
        {
          if (_context.donHang == null)
          {
              return NotFound();
          }
            return await _context.donHang.ToListAsync();
        }

        // GET: api/DonHangs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DonHang>> GetDonHang(string id)
        {
          if (_context.donHang == null)
          {
              return NotFound();
          }
            var donHang = await _context.donHang.FindAsync(id);

            if (donHang == null)
            {
                return NotFound();
            }

            return donHang;
        }

        // PUT: api/DonHangs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonHang(string id, DonHang donHang)
        {
            if (id != donHang.ID)
            {
                return BadRequest();
            }

            _context.Entry(donHang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonHangExists(id))
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

        // POST: api/DonHangs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DonHang>> PostDonHang(DonHang donHang)
        {
          if (_context.donHang == null)
          {
              return Problem("Entity set 'BaoCaoContext.donHang'  is null.");
          }
            _context.donHang.Add(donHang);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DonHangExists(donHang.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDonHang", new { id = donHang.ID }, donHang);
        }

        // DELETE: api/DonHangs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonHang(string id)
        {
            if (_context.donHang == null)
            {
                return NotFound();
            }
            var donHang = await _context.donHang.FindAsync(id);
            if (donHang == null)
            {
                return NotFound();
            }

            _context.donHang.Remove(donHang);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DonHangExists(string id)
        {
            return (_context.donHang?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}

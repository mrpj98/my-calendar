#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalendarAPI.Models;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Cors;

namespace CalendarAPI.Controllers
{
    [Route("api/calendar")]
    
    [ApiController]
    public class CalendarItemsController : ControllerBase
    {
        private readonly CalendarContext _context;

        public CalendarItemsController(CalendarContext context)
        {
            _context = context;
        }

        // GET: api/CalendarItems
        //[EnableCors("AllowAllHeaders")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CalendarItem>>> GetCalendarItems()
        {
            return await _context.CalendarItems.ToListAsync();
        }

        // GET: api/CalendarItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CalendarItem>> GetCalendarItem(long id)
        {
            var calendarItem = await _context.CalendarItems.FindAsync(id);

            if (calendarItem == null)
            {
                return NotFound();
            }

            return calendarItem;
        }

        // PUT: api/CalendarItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCalendarItem(long id, CalendarItem calendarItem)
        {
            if (id != calendarItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(calendarItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalendarItemExists(id))
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

        // POST: api/CalendarItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CalendarItem>> PostCalendarItem(CalendarItem calendarItem)
        {
            _context.CalendarItems.Add(calendarItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCalendarItem), new { id = calendarItem.Id }, calendarItem);
        }

        // DELETE: api/CalendarItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalendarItem(long id)
        {
            var calendarItem = await _context.CalendarItems.FindAsync(id);
            if (calendarItem == null)
            {
                return NotFound();
            }

            _context.CalendarItems.Remove(calendarItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CalendarItemExists(long id)
        {
            return _context.CalendarItems.Any(e => e.Id == id);
        }
    }
}

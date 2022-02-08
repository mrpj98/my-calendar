using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace CalendarAPI.Models
{
    public class CalendarContext : DbContext
    {
        public CalendarContext(DbContextOptions<CalendarContext> options)
            : base(options)
        {

        }
        public DbSet<CalendarItem> CalendarItems { get; set; } = null!;
    }
}

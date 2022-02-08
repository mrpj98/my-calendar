namespace CalendarAPI.Models
{
    public class CalendarItem
    {
        public long Id { get; set; }
        public string? Date { get; set; } 
        public string? Time { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}

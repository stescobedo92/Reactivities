namespace Domain;

public class ActivityTask
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
    public required string Category { get; set; }
    public string? City { get; set; }
    public string? Venue { get; set; }
}

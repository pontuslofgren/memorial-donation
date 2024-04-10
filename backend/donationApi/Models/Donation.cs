using System.ComponentModel.DataAnnotations;

namespace donationApi.Models;

public class MemorialDonation
{
    [Key]
    public int Id { get; init; }
    public Guid Guid { get; } = Guid.NewGuid();
    public string ClientSecret { get; set; }
    public required string HonoreeName { get; set; }
    public required string Message { get; set; }
    public int Amount { get; set; }
    public required string DonorFirstName { get; set; }
    public required string DonorLastName { get; set; }
    public required string Email { get; set; }
    public bool HasSucceededPayment { get; set; } = false;
    public DateTime CreatedAt { get; init; } = DateTime.Now;
}
namespace donationApi.DTOs;

public class MemorialDonationResponse
{
    public Guid Guid { get; } = Guid.NewGuid();
    public required string HonoreeName { get; set; }
    public required string Message { get; set; }
    public int Amount { get; set; }
    public required string DonorFirstName { get; set; }
    public required string DonorLastName { get; set; }
    public required string Email { get; set; }
    public DateTime CreatedAt { get; init; }
}
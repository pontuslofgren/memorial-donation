namespace donationApi.DTOs;

public class MemorialDonationRequest
{
    public required string HonoreeName { get; set; }
    public required string Message { get; set; }

    private int _amount;
    public int Amount
    {
        get => _amount;
        set => _amount = value * 100;
    }

    public required string DonorFirstName { get; set; }
    public required string DonorLastName { get; set; }
    public required string Email { get; set; }
}
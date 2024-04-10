using donationApi.DTOs;
using Stripe;

namespace donationApi.Services;

public interface IDonationService
{
    public Task CreateDonation(MemorialDonationRequest request, StripeClientSecretResponse clientSecret);
    public Task SetDonationStatusToSucceeded(string clientSecret);
    // public MemorialDonationResponse GetDonation(Guid guid);
}
using donationApi.DTOs;
using Stripe;

namespace donationApi.Services;

public interface IDonationService
{
    public Task CreateDonation(MemorialDonationRequest request);
    // public MemorialDonationRequest SetDonationStatusToSucceeded(Event stripeEvent);
    // public MemorialDonationResponse GetDonation(Guid guid);
}
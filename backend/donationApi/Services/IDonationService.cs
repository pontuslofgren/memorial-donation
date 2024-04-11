using donationApi.DTOs;
using donationApi.Models;
using Stripe;

namespace donationApi.Services;

public interface IDonationService
{
    public Task HandlePaymentSuccess(string clientSecret);
    public Task CreateDonation(MemorialDonationRequest request, StripeClientSecretResponse clientSecret);
    public Task SetDonationStatusToSucceeded(MemorialDonation donation);
    public Task SendTributeEmail(MemorialDonation donation);
}
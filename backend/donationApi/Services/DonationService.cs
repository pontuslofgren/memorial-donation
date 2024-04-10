using donationApi.DTOs;
using donationApi.Models;
using Stripe;

namespace donationApi.Services;

public class DonationService
{
    public MemorialDonationRequest CreateDonation(MemorialDonationRequest request)
    {
        // map it to an entity
        // save it
        // return
        throw new NotImplementedException();
    }
    
    public MemorialDonationRequest SetDonationStatusToSucceeded(Event stripeEvent)
    {
        // fetch the donation from the database
        // set status to succeeded
        throw new NotImplementedException();
    }

    public MemorialDonationResponse GetDonation(Guid guid)
    {
        // find and return the MemorialDonationResponse
        throw new NotImplementedException();
    }

    private Boolean IsDonationPersisted()
    {
        throw new NotImplementedException();
    }
    
}
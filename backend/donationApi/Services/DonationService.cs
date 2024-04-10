using System.Data.Common;
using AutoMapper;
using donationApi.DTOs;
using donationApi.Models;
using Stripe;

namespace donationApi.Services;

public class DonationService : IDonationService
{
    private readonly DonationContext _context;
    private readonly IMapper _mapper;
    public DonationService(DonationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task CreateDonation(MemorialDonationRequest request)
    {
        var memorialDonation = _mapper.Map<MemorialDonation>(request);
        _context.Add(memorialDonation);
        await _context.SaveChangesAsync();
    }
    //
    // public MemorialDonationRequest SetDonationStatusToSucceeded(Event stripeEvent)
    // {
    //     // fetch the donation from the database
    //     // set status to succeeded
    //     throw new NotImplementedException();
    // }
    //
    // public MemorialDonationResponse GetDonation(Guid guid)
    // {
    //     // find and return the MemorialDonationResponse
    //     throw new NotImplementedException();
    // }
    
}
using System.Data.Common;
using AutoMapper;
using donationApi.DTOs;
using donationApi.Models;
using Microsoft.EntityFrameworkCore;
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
    
    public async Task CreateDonation(MemorialDonationRequest request, StripeClientSecretResponse clientSecret)
    {
        var memorialDonation = _mapper.Map<MemorialDonation>(request);
        memorialDonation.ClientSecret = clientSecret.ClientSecret;
        _context.Add(memorialDonation);
        await _context.SaveChangesAsync();
    }
    
    public async Task SetDonationStatusToSucceeded(string clientSecret)
    {
        var donation = await _context.Donations
            .FirstOrDefaultAsync(donation => donation.ClientSecret == clientSecret);

        donation.HasSucceededPayment = true;

        _context.Update(donation);
        await _context.SaveChangesAsync();
    }
    //
    // public MemorialDonationResponse GetDonation(Guid guid)
    // {
    //     // find and return the MemorialDonationResponse
    //     throw new NotImplementedException();
    // }
    
}
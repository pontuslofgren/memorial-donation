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
    private readonly IBrevoClient _brevoClient;

    public DonationService(DonationContext context, IMapper mapper, IBrevoClient brevoClient)
    {
        _context = context;
        _mapper = mapper;
        _brevoClient = brevoClient;
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
        var donation = await GetDonationByClientSecret(clientSecret);

        donation.HasSucceededPayment = true;

        _context.Update(donation);
        await _context.SaveChangesAsync();
    }

    public async Task SendTributeEmail(string clientSecret)
    {
        throw new NotImplementedException();
    }
    
    public async Task<MemorialDonation?> GetDonationByClientSecret(string clientSecret)
    {
        return await _context.Donations
            .FirstOrDefaultAsync(donation => donation.ClientSecret == clientSecret);
    }
    
}
using System.Data.Common;
using AutoMapper;
using donationApi.DTO;
using donationApi.DTOs;
using donationApi.Helpers;
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
    
    public async Task HandlePaymentSuccess(string clientSecret)
    {
        var donation = await GetDonationByClientSecret(clientSecret);

        if (donation == null)
        {
            throw new Exception("Cannot find donation.");
        }
        
        await SetDonationStatusToSucceeded(donation);
        var pdf = PdfGeneratorHelper.GenerateTributePdf(_mapper.Map<TributePdf>(donation));
        await SendTributeEmail(donation, pdf);
    }
    
    public async Task SetDonationStatusToSucceeded(MemorialDonation donation)
    {
        donation.HasSucceededPayment = true;
        _context.Update(donation);
        await _context.SaveChangesAsync();
    }

    public async Task SendTributeEmail(MemorialDonation donation, string? pdf)
    {
        var emailRequest = _mapper.Map<EmailTemplateRequest>(donation);
        emailRequest.TemplateId = 1;
        if (pdf is not null)
        {
            var attachment = new EmailTemplateRequest.AttachmentRecord()
            {
                Content = pdf,
                Name = "eCard.pdf"
            };
            emailRequest.Attachment.Add(attachment);
        }
        await _brevoClient.SendTributeEmail(emailRequest);
    }
    
    public async Task<MemorialDonation?> GetDonationByClientSecret(string clientSecret)
    {
        return await _context.Donations
            .FirstOrDefaultAsync(donation => donation.ClientSecret == clientSecret);
    }
}
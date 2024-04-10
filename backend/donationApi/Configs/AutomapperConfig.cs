using AutoMapper;
using donationApi.DTO;
using donationApi.DTOs;
using donationApi.Models;

namespace donationApi.Configs;

public class AutomapperConfig : Profile
{
    public AutomapperConfig()
    {
        CreateMap<MemorialDonationRequest, MemorialDonation>().ReverseMap();
        CreateMap<MemorialDonationResponse, MemorialDonation>().ReverseMap();
        CreateMap<MemorialDonation, EmailTemplateRequest>()
            .ForMember(dest => dest.Params,
                opt => opt.MapFrom(src => new EmailTemplateRequest.ParamsRecord { FNAME = src.DonorFirstName }))
            .ForMember(dest => dest.To,
                opt => opt.MapFrom(src => new List<EmailTemplateRequest.RecipientRecord>
                    { new EmailTemplateRequest.RecipientRecord { Email = src.Email, Name = src.DonorFirstName } }))
            .ForMember(dest => dest.Attachment, opt => opt.Ignore())
            .ForMember(dest => dest.TemplateId, opt => opt.Ignore());
    }
}
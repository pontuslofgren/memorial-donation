using AutoMapper;
using donationApi.DTOs;
using donationApi.Models;

namespace donationApi.Configs;

public class AutomapperConfig : Profile
{
    public AutomapperConfig()
    {
        CreateMap<MemorialDonationRequest, MemorialDonation>().ReverseMap();
    }
}
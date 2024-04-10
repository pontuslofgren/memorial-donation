using donationApi.DTO;

namespace donationApi.Services;

public interface IBrevoClient
{ 
    Task SendTributeEmail(EmailTemplateRequest emailDetails);
}
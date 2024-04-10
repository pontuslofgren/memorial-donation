using donationApi.Data;

namespace donationApi.Services;

public interface IBrevoClient
{ 
    Task SendTributeEmail(TributeEmail emailDetails);
}
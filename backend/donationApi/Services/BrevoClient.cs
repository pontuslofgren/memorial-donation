using donationApi.Data;
using RestSharp;

namespace donationApi.Services;

public class BrevoClient: IBrevoClient
{
    private readonly RestClient _client;
    private readonly string _apiSecret;

    public void BrevoClient(IConfiguration config)
    {
        var options = new RestClientOptions("https://api.brevo.com/v3/smtp/email");
        _client = new RestClient(options);
        _apiSecret = config["ApiKeys:BrevoApiKey"]
    }

    public Task SendTributeEmail(TributeEmail emailDetails)
    {
        throw new NotImplementedException();
    }
}

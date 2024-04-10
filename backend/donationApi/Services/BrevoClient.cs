using System.Text.Json;
using donationApi.DTO;
using RestSharp;

namespace donationApi.Services;

// TODO: Implement IDisposable
public class BrevoClient: IBrevoClient
{
    private readonly RestClient _client;
    private readonly string _apiSecret;

    public BrevoClient(IConfiguration config)
    {
        var options = new RestClientOptions("https://api.brevo.com/v3/smtp/email");
        _client = new RestClient(options);
        _apiSecret = config["ApiKeys:BrevoApiKey"];
    }

    public async Task SendTributeEmail(EmailTemplateRequest emailDetails)
    {
        var request = new RestRequest("");
        request.AddHeader("accept", "application/json");
        request.AddHeader("api-key", _apiSecret);
        request.AddJsonBody(JsonSerializer.Serialize(emailDetails));
        var response = await _client.PostAsync(request);
    }
}

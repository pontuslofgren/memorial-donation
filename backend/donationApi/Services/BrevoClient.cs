using System.Text.Json;
using donationApi.DTO;
using RestSharp;

namespace donationApi.Services;

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
        Console.WriteLine("Sending email");
        string jsonString = JsonSerializer.Serialize(emailDetails);
        Console.WriteLine(jsonString);
        var request = new RestRequest("");
        request.AddHeader("accept", "application/json");
        request.AddHeader("api-key", _apiSecret);
        // TODO: JsonBody from emailDetails
        request.AddJsonBody("{\"sender\":{\"email\":\"postmaster@ullacarinstiftelse.se\",\"name\":\"Ulla-Carin Stiftelse\"},\"params\":{\"FIRSTNAME\":\"Pontus\",\"FNAME\":\"Ponta\"},\"attachment\":[{\"content\":\"b3JkZXIucGRm\",\"name\":\"myAttachment.png\"}],\"to\":[{\"email\":\"pontus@ullacarinstiftelse.se\",\"name\":\"Pontus\"}],\"tags\":[\"Test\"],\"templateId\":1}", false);
        var response = await _client.PostAsync(request);
        Console.WriteLine("{0}", response.Content);
    }
}

using System.Text.Json.Serialization;

namespace donationApi.DTOs;

public class StripeClientSecretResponse
{
    [JsonPropertyName("client_secret")]
    public required string ClientSecret { get; set; }
}
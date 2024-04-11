namespace donationApi.DTOs;

public class TributePdfRequest
{
    public required string Honoree { get; set; }
    public required string Message { get; set; }
}
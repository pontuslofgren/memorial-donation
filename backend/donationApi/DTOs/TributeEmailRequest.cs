namespace donationApi.DTO;

public class EmailTemplateRequest
{
    public Sender Sender { get; set; }
    public Params Params { get; set; }
    public List<Recipient> To { get; set; }
    public List<Attachment> Attachment { get; set; }
    public int TemplateId { get; set; }
}

public class Sender
{
    public string Name { get; set; }
    public string Email { get; set; }
}

public class Params
{
    public string FNAME { get; set; }
    public string Name { get; set; }
}

public class Recipient
{
    public string Email { get; set; }
    public string Name { get; set; }
}

public class Attachment
{
    public string Content { get; set; }
    public string Name { get; set; }
}
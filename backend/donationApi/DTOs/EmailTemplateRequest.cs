namespace donationApi.DTO;

public record EmailTemplateRequest
{
    public ParamsRecord? Params { get; set; }
    public required List<RecipientRecord> To { get; set; }
    public List<AttachmentRecord>? Attachment { get; set; }
    public int TemplateId { get; set; }
    
    public record ParamsRecord
    {
        public required string FNAME { get; set; }
    }

    public record RecipientRecord
    {
        public required string Email { get; set; }
        public required string Name { get; set; }
    }

    public record AttachmentRecord
    {
        public required string Content { get; set; }
        public required string Name { get; set; }
    }
}
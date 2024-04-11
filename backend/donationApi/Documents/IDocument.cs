using QuestPDF.Infrastructure;

namespace donationApi.Documents;

public interface IDocument
{
    DocumentMetadata GetMetadata();
    DocumentSettings GetSettings();
    void Compose(IDocumentContainer container);
}
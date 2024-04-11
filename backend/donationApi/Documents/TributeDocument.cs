using donationApi.Models;
using QuestPDF.Infrastructure;

namespace donationApi.Documents;

public class TributeDocument : IDocument
{
    private TributePdf _model;

    public TributeDocument(TributePdf model)
    {
        _model = model;
    }
    
    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;
    public DocumentSettings GetSettings() => DocumentSettings.Default;

    public void Compose(IDocumentContainer container)
    {
        throw new NotImplementedException();
    }
    
    
}
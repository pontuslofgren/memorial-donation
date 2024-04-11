using donationApi.Documents;
using donationApi.Models;

namespace donationApi.Services;

public class PdfGeneratorService
{
    // Add the license and other config
    
    public MemoryStream GenerateTributePdf(TributePdf tribute)
    {
        var document = new TributeDocument(tribute);
        // document.GeneratePdf();

        throw new NotImplementedException();
    }
}
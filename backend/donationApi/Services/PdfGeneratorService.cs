using System.Buffers.Text;
using donationApi.Documents;
using donationApi.Models;
using QuestPDF.Fluent;

namespace donationApi.Services;

public static class PdfGeneratorService
{
    public static string GenerateTributePdf(TributePdf tribute)
    {
        var document = new TributeDocument(tribute);
        var pdf = document.GeneratePdf();
        return System.Convert.ToBase64String(pdf);
    }
}
using donationApi.Documents;
using donationApi.Models;
using QuestPDF.Fluent;

namespace donationApi.Helpers;

public static class PdfGeneratorHelper
{
    public static string GenerateTributePdf(TributePdf tribute)
    {
        var document = new TributeDocument(tribute);
        var pdf = document.GeneratePdf();
        return System.Convert.ToBase64String(pdf);
    }
}
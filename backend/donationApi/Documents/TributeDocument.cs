using donationApi.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
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
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(20));
                    
                    page.Header().Element(ComposeHeader);
                    page.Content().Element(ComposeContent);

                    page.Footer()
                        .AlignCenter()
                        .Text("Lorem lipsum: 123 45 67 89")
                        .FontSize(10);
                });
    }

    void ComposeHeader(IContainer container)
    {
        container
            .AlignCenter()
                .Text("Hello Salties!")
                .FontSize(36);
    }

    void ComposeContent(IContainer container)
    {
        container
            .PaddingVertical(1, Unit.Centimetre)
                .Column(col =>
                {
                    col.Item().AlignCenter()
                        .Padding(10)
                        .Text("In Memory Of")
                        .FontSize(20)
                        .SemiBold();
                    col.Item().AlignCenter()
                        .Padding(10)
                        .Text(_model.Honoree)
                        .FontSize(40)
                        .SemiBold();
                    col.Item().AlignCenter()
                        .Padding(10)
                        .Text("Have we received a donation")
                        .FontSize(20)
                        .SemiBold();
                    col.Item().Height(100).AlignCenter()
                        .Padding(10)
                        .Image("/Images/heart.png").FitHeight();
                    col.Item().AlignCenter()
                        .Padding(10)
                        .Text(_model.Message)
                        .FontSize(20)
                        .SemiBold();
                });
    }
}
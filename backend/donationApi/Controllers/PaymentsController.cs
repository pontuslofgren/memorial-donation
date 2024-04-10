using donationApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using donationApi.Models;
using Stripe;

namespace donationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly DonationContext _context;

        public PaymentsController(DonationContext context, IConfiguration config)
        {
            _context = context;
            StripeConfiguration.ApiKey = config["ApiKeys:StripeTestKey"];
        }

        [HttpPost("create-payment-intent")]
        public ActionResult<StripeClientSecretResponse> PostPaymentIntent(MemorialDonationRequest request)
        {
            Console.WriteLine($"{request.DonorFirstName} donated {request.Amount}");
            
            var options = new PaymentIntentCreateOptions
            {
                Amount = request.Amount,
                Currency = "sek"
            };
            var service = new PaymentIntentService();
            PaymentIntent intent = service.Create(options);
            return new StripeClientSecretResponse() { ClientSecret = intent.ClientSecret };
        }
    }
}

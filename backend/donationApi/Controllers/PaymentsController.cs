using AutoMapper;
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
        private readonly IMapper _mapper;

        public PaymentsController(DonationContext context, IConfiguration config, IMapper mapper)
        {
            _context = context;
            StripeConfiguration.ApiKey = config["ApiKeys:StripeTestKey"];
            _mapper = mapper;
        }

        [HttpPost("create-payment-intent")]
        public ActionResult<StripeClientSecretResponse> PostPaymentIntent(MemorialDonationRequest request)
        {
            Console.WriteLine($"{request.DonorFirstName} donated {request.Amount}");

            var newDonation = _mapper.Map<MemorialDonation>(request);
            Console.WriteLine($"{newDonation.DonorLastName} donated {newDonation.Amount}");
            
            var options = new PaymentIntentCreateOptions
            {
                Amount = request.Amount,
                Currency = "sek"
            };
            var service = new PaymentIntentService();
            PaymentIntent intent = service.Create(options);
            return new StripeClientSecretResponse() { ClientSecret = intent.ClientSecret };
        }
        
        [HttpPost("webhook")]
        public async Task<IActionResult> PostPaymentWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ParseEvent(json);

                // Handle the event
                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    Console.WriteLine($"Payment succeeded. {paymentIntent!.Id}");
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                }
                else
                {
                    // Unexpected event type
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }
                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }
    }
}

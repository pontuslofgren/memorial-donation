using donationApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using donationApi.Models;
using donationApi.Services;
using Stripe;

namespace donationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private IDonationService _donationService;
        public PaymentsController(IConfiguration config, IDonationService donationService)
        {
            StripeConfiguration.ApiKey = config["ApiKeys:StripeTestKey"];
            _donationService = donationService;
        }

        [HttpPost("create-payment-intent")]
        public async Task<ActionResult<StripeClientSecretResponse>> PostPaymentIntent(MemorialDonationRequest request)
        {
            try
            {
                await _donationService.CreateDonation(request);
                var options = new PaymentIntentCreateOptions
                {
                    Amount = request.Amount,
                    Currency = "sek"
                };
                
                var service = new PaymentIntentService();
                PaymentIntent intent = service.Create(options);
                return Ok(new StripeClientSecretResponse() { ClientSecret = intent.ClientSecret });
            }
            catch (Exception e)
            {
                return BadRequest("Something went wrong. Please try again later.");
            }
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

        [HttpGet]
        public async Task<ActionResult<MemorialDonationResponse>> GetDonation(Guid guid)
        {
            throw new NotImplementedException();
        }
    }
}

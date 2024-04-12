using donationApi.DTOs;
using Microsoft.AspNetCore.Mvc;
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
                var options = new PaymentIntentCreateOptions
                {
                    Amount = request.Amount,
                    Currency = "sek"
                };
                
                var service = new PaymentIntentService();
                PaymentIntent intent = service.Create(options);
                var clientSecret = new StripeClientSecretResponse() { ClientSecret = intent.ClientSecret }; 
                await _donationService.CreateDonation(request, clientSecret);
                return Ok(clientSecret);
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
                
                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    await _donationService.HandlePaymentSuccess(paymentIntent!.ClientSecret);
                }
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }
                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

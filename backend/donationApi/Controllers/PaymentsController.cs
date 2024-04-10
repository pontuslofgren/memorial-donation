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
    }
}

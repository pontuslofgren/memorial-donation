using Microsoft.AspNetCore.Mvc;
using donationApi.Models;

namespace donationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly DonationContext _context;

        public PaymentsController(DonationContext context)
        {
            _context = context;
        }
    }
}

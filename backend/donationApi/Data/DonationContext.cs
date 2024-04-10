using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using donationApi.Models;

    public class DonationContext : DbContext
    {
        public DonationContext (DbContextOptions<DonationContext> options)
            : base(options)
        {
        }

        public DbSet<MemorialDonation> Donations { get; set; } = default!;
    }

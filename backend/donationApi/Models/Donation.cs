using System.ComponentModel.DataAnnotations;

namespace donationApi.Models;

public class Donation
{
    [Key]
    public int Id { get; set; }
}
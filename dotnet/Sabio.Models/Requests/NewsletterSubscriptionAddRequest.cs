using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class NewsletterSubscriptionAddRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}

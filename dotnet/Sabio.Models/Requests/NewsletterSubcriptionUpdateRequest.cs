using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class NewsletterSubcriptionUpdateRequest : NewsletterSubscriptionAddRequest
    {
        [Required]
        public bool IsSubscribed { get; set; }
    }
}

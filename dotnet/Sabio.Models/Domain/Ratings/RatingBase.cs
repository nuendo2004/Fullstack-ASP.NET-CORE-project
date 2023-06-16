namespace Sabio.Models.Domain.Ratings
{
    public class RatingBase
    {
        public LookUp EntityType { get; set; }
        public int EntityId { get; set; }
        public int RatingAverage { get; set; }
        public int TotalRatings { get; set; }
    }
}
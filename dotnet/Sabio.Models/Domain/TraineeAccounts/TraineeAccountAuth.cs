namespace Sabio.Models.Domain.TraineeAccounts
{
    public class TraineeAccountAuth
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string AvatarUrl { get; set; }
        public int ZoneId { get; set; }
        public int TraineeId { get; set; }
    }
}

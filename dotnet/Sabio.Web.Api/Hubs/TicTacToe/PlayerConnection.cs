namespace Sabio.Web.Api.Hubs.TicTacToe
{
    public class PlayerConnection
    {
        public string User { get; set; }
        public string Room { get; set; }
        public bool IsTurn { get; set; }
    }
}

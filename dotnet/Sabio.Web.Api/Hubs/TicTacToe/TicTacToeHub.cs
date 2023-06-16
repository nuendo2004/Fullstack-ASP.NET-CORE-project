using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Hubs.TicTacToe
{
    public class TicTacToeHub : Hub
    {
        private readonly IDictionary<string, PlayerConnection> _connections;
        public TicTacToeHub(IDictionary<string, PlayerConnection> connections)
        {
            _connections = connections;
        }
        public async Task SendMessage(string[] message, int fromUserId)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.OthersInGroup(playerConnection.Room).SendAsync("ReceiveMessage", playerConnection.User, message, fromUserId);
            }
        }
        public async Task HasWon(string[] message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.OthersInGroup(playerConnection.Room).SendAsync("HasWon", playerConnection.User, message);
            }
        }
        public async Task SetScore(ScoreBoard message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.Group(playerConnection.Room).SendAsync("SetScore", playerConnection.User, message);
            }
        }
        public async Task SendChat(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.OthersInGroup(playerConnection.Room).SendAsync("ReceiveChat", playerConnection.User, message);
            }
        }
        public async Task RequestRoom(PlayerConnection playerConnection)
        {
            var room = _connections.Values.FirstOrDefault(p => p.Room != playerConnection.Room && p.Room != null && p.Room != "" && _connections.Values.Count(c => c.Room == p.Room) < 2);
            if (room != null)
            {
                playerConnection.IsTurn = true;
                playerConnection.Room = room.Room;
                await Groups.AddToGroupAsync(Context.ConnectionId, room.Room);
                _connections[Context.ConnectionId] = playerConnection;
                await Clients.Client(Context.ConnectionId).SendAsync("ReceiveChat", playerConnection.User, "has joined the lobby.");
                await Clients.OthersInGroup(room.Room).SendAsync("ReceiveChat", playerConnection.User, "has joined the lobby.");
                await Clients.Client(Context.ConnectionId).SendAsync("HandleTurn", playerConnection.IsTurn, "Turn");
            }
            else
            {
                var lastRoom = _connections.Values.LastOrDefault(p => p.Room != null && p.Room != "");
                if (lastRoom != null)
                {
                    var newRoom = (int.Parse(lastRoom.Room) + 1).ToString();
                    playerConnection.Room = newRoom;
                    playerConnection.IsTurn = false;
                    await Groups.AddToGroupAsync(Context.ConnectionId, newRoom);
                    _connections[Context.ConnectionId] = playerConnection;
                    await Clients.Client(Context.ConnectionId).SendAsync("ReceiveChat", playerConnection.User, "has joined the lobby.");
                    await Clients.OthersInGroup(newRoom).SendAsync("ReceiveChat", playerConnection.User, "has joined the lobby.");
                    await Clients.Client(Context.ConnectionId).SendAsync("HandleTurn", playerConnection.IsTurn, "Turn");
                }
                else
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, "1");
                    playerConnection.Room = "1";
                    playerConnection.IsTurn = false;
                    _connections[Context.ConnectionId] = playerConnection;
                    await Clients.Client(Context.ConnectionId).SendAsync("ReceiveChat", playerConnection.User, "has joined the lobby.");
                    await Clients.OthersInGroup("1").SendAsync("ReceiveChat", playerConnection.User, "has joined the lobby.");
                    await Clients.Client(Context.ConnectionId).SendAsync("HandleTurn", playerConnection.IsTurn, "Turn");
                }
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                _connections.Remove(Context.ConnectionId);
                 Clients.Group(playerConnection.Room).SendAsync("HandleDisconnect", playerConnection.User);
            }
            return base.OnDisconnectedAsync(exception);
        }
        public async Task SendMalware()
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.OthersInGroup(playerConnection.Room).SendAsync("ReceiveMalware", playerConnection.User);
            }
        }      
       
        public async Task SendDefenseNotice()
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.OthersInGroup(playerConnection.Room).SendAsync("ReceiveDefenseNotice", playerConnection.User);
            }
        }
        
        public async Task SendCounterWinCallback()
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.OthersInGroup(playerConnection.Room).SendAsync("ReceiveCounterWinCallback", playerConnection.User);
            }
        }
        
        public async Task SendMoveRemoval()
        {
            if (_connections.TryGetValue(Context.ConnectionId, out PlayerConnection playerConnection))
            {
                await Clients.OthersInGroup(playerConnection.Room).SendAsync("ReceiveMoveRemoval", playerConnection.User);
            }
        }
    }
}

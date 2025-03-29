using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

public class Client
{
    public Guid Id { get; }

    public WebSocket WebSocket { get; init; }
    public Session? Session { get; private set; }

    public Client(WebSocket _webSocket)
    {
        this.Id = Guid.NewGuid();
        this.WebSocket = _webSocket;
    }

    public async Task Run()
    {
        while (true)
        {
            var message = await this.ReceiveAsync();

            if (message.Action == "Disconnect") {
                await this.WebSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                this.Session?.DisconnectClient(this);
                break;
            }

            await this.Session?.HandleCommand(this, message);
        }
    }

    internal void AssignSession(Session session)
    {
        if (this.Session != null)
        {
            this.Session.DisconnectClient(this);
        }
        this.Session = session;
    }

    internal void UnassignSession()
    {
        this.Session = null;
    }

    public async Task<ClientCommand> ReceiveAsync(CancellationToken? cancellationToken = null)
    {
        try
        {
            var buffer = new byte[1024 * 4];
            WebSocketReceiveResult result;
            StringBuilder builder = new();
            do {
                result = await this.WebSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationToken ?? CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Text) {
                    var part = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    builder.Append(part);
                }
            } while (!result.EndOfMessage);

            if (result.MessageType == WebSocketMessageType.Text)
            {
                var message = builder.ToString();
                return JsonSerializer.Deserialize<ClientCommand>(message)!;
            }

            return new ClientCommand("Disconnect");
        } 
        catch (WebSocketException)
        {
            this.Session?.DisconnectClient(this);
            throw;
        }
    }

    private async Task Send(string transmission)
    {
        var bytes = Encoding.UTF8.GetBytes(transmission);
        await this.WebSocket.SendAsync(bytes, WebSocketMessageType.Text, true, CancellationToken.None);
    }

}
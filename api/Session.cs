using System.Text;

public class Session : ISession
{

    public string Id { get; init; }
    public IList<Client> Clients { get; init; }

    private readonly CommandBroker _commandBroker;
    private readonly SessionBroker _sessionBroker;

    public Session(SessionBroker sessionBroker, Client firstClient)
    {
        this.Id = this.GenerateId();
        this.Clients = new List<Client>();
        this._sessionBroker = sessionBroker;

        this.ConnectClient(firstClient);
    }

    public void ConnectClient(Client newClient)
    {
        this.Clients.Add(newClient);
        newClient.AssignSession(this);
    }

    public void HandleCommand(Client newClient)

    public async Task BroadcastMessageAsync(Client sender, ClientCommand command)
    {
        foreach (var client in this.Clients)
        {
            if (client == sender) continue;
            await client.SendMessageReceivedAsync(command);
        }
    }

    public void DisconnectClient(Client disconnectingClient)
    {
        this.Clients.Remove(disconnectingClient);
        disconnectingClient.UnassignSession();
        foreach (var client in this.Clients)
        {
            if (client == disconnectingClient) continue;
            _ = client.SendDevDisconnectedAsync();
        }
    }

    private string GenerateId(){
		var charSource = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var ran = new Random();
        int length = 8;
        var stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++)
        {
            var randValue = ran.Next(0, charSource.Length);
            stringBuilder.Append(charSource[randValue]);
        }
        return stringBuilder.ToString();
    }

}
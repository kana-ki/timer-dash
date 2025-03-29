public interface ISession {

    string Id { get; }

    void ConnectClient(Client newClient);

    Task BroadcastMessageAsync(Client sender, ClientCommand command);

    void DisconnectClient(Client disconnectingClient);

}
public interface ISessionBroker {
    void HandleClient(Client client);
    void ShiftClientToSession(Client client, string targetSessionId);
}
using System;
using System.Collections.Concurrent;

class SessionBroker : ISessionBroker {

    private ConcurrentDictionary<string, ISession> _activeSessions;

    public SessionBroker() {
        this._activeSessions = new ConcurrentDictionary<string, ISession>();
    }

    public void HandleClient(Client client) {
        var session = new Session(this, client);
        this._activeSessions.TryAdd(session.Id, session);
    }

    public void HandleSessionAbandoned(ISession session) {
        this._activeSessions.Remove(session.Id, out _);
    }

    public void ShiftClientToSession(Client client, string targetSessionId) {
        if (this._activeSessions.ContainsKey(targetSessionId))
            this._activeSessions[targetSessionId].ConnectClient(client);
        else
            throw new KeyNotFoundException();
    }

}
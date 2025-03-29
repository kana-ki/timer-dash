public class SessionFactory : ISessionFactory {
    private readonly IServiceProvider serviceProvider;

    public SessionFactory(IServiceProvider serviceProvider)
    {
        this.serviceProvider = serviceProvider;
    }
    
    public ISession CreateSession(ISessionBroker sessionBroker, Client firstClient) =>
        ActivatorUtilities.CreateInstance<ISession>(this.serviceProvider, sessionBroker, firstClient);

}
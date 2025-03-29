interface ISessionFactory
{

    ISession CreateSession(ISessionBroker sessionBroker, Client firstClient);

}
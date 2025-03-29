internal class CommandBroker
{

    public void ProcessCommand(Client sender, ClientCommand command) {
        switch (command.Action) {
            case "Create":
                new CreateHandler(sender, command).Handle();
                break;
            case "Create":
                new CreateHandler(sender, command).Handle();
                break;

        }
    }

}
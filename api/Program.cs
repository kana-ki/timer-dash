var appBuilder = WebApplication.CreateBuilder(args);
appBuilder.Services.AddSingleton<ISessionBroker>(new SessionBroker());
appBuilder.Services.AddSingleton<ISessionFactory, SessionFactory>();
var app = appBuilder.Build();

app.UseHttpsRedirection();
app.Use(async (context, next) =>
{
    if (context.Request.Path != "/ws")
    { 
        await next(context);
        return;
    }

    if (!context.WebSockets.IsWebSocketRequest)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        return;
    }

    var webSocket = await context.WebSockets.AcceptWebSocketAsync();
    var client = new Client(webSocket);
    // context.RequestServices.GetService<>()
});

app.Run();

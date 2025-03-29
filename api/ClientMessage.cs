
using System.Diagnostics;

[DebuggerDisplay("{Action} :: {Target}")]
public record ClientCommand(string Action, string? Target = null, string? Argument = null);

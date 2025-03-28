namespace OresAndCores_2.Models;

public class GameViewModel
{
    public List<EnvironmentObject> EnvironmentObjects { get; set; } = new List<EnvironmentObject>();
    public List<Item> Items { get; set; } = new List<Item>();
}
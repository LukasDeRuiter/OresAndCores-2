namespace OresAndCores_2.Models;

public class GameViewModel
{
    public List<EnvironmentObject> EnvironmentObjects { get; set; } = new List<EnvironmentObject>();
    public List<Enemy> Enemies { get; set; } = new List<Enemy>();
    public List<Item> Items { get; set; } = new List<Item>();
}
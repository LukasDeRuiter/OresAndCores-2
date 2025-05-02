
namespace OresAndCores_2.Dtos;

public class InventoryDto
{
    public Dictionary<string, int> Inventory { get; set; }
    public int Level { get; set; }
    public int Money { get; set; }
      public List<ToolDto> Tools { get; set; } 
}

public class ToolDto
{
    public string Type { get; set; }
    public int Level { get; set; }
}
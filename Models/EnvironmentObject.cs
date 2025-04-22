using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;

namespace OresAndCores_2.Models;

public class EnvironmentObject {

    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public int Health { get; set; }

    [Required]
    public string Path { get; set; }

    [Required]
     public string Items { get; set; }

    [Required]
     public string MaterialType { get; set; }

    [Required]
     public int RequiredLevel { get; set; }

    [Required]
     public int Layer { get; set; }

     public List<ObjectItem> GetItems()
     {
        return string.IsNullOrEmpty(Items) ? new List<ObjectItem>() : JsonSerializer.Deserialize<List<ObjectItem>>(Items);
     }
}
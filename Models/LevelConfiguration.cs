using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;

namespace OresAndCores_2.Models;

public class LevelConfiguration {

    [Key]
    public int Id { get; set; }

    [Required]
     public string EnvironementObjects { get; set; }

    [Required]
     public string Enemies { get; set; }


    [Required]
     public int Amount { get; set; }

     public List<EntityPercentage> GetEnvironementObjects()
     {
        return string.IsNullOrEmpty(EnvironementObjects) ? new List<EntityPercentage>() : JsonSerializer.Deserialize<List<EntityPercentage>>(EnvironementObjects);
     }
     
     public List<EntityPercentage> GetEnemies()
     {
        return string.IsNullOrEmpty(Enemies) ? new List<EntityPercentage>() : JsonSerializer.Deserialize<List<EntityPercentage>>(Enemies);
     }
}
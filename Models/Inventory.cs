using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace OresAndCores_2.Models;

public class Inventory {

    [Key]
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; }

    [Required]
    public string Data { get; set; }

    [Required]
    public string ToolData { get; set; }

    [Required]
    public int PlayerLevel { get; set; }
        
    [Required]
    public int PlayerMoney { get; set; }
}
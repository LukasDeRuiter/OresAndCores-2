using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace OresAndCores_2.Models;

public class EntityPercentage {

    [Key]
    public int Id { get; set; }

    [Required]
    public string EntityId { get; set; }

    [Required]
    public string Percentage { get; set; }
}
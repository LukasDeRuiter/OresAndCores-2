using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace OresAndCores_2.Models;

public class ObjectItem {

    [Key]
    public int ItemId { get; set; }

    [Required]
    public int Amount { get; set; }

    [Required]
    public int DropChance { get; set; }
}
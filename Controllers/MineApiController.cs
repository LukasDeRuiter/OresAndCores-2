using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Text.Json;
using OresAndCores_2.Data;
using OresAndCores_2.Models;

namespace OresAndCores_2.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MineApiController : ControllerBase
{
    private readonly OresAndCores_2Context _context;

    public MineApiController(OresAndCores_2Context context)
    {
         _context = context;
    }


    [HttpPost("save")]
    public async Task<IActionResult> SaveInventory([FromBody] Dictionary<string, int> inventory) 
    {
        var UserId = 1;

        var inventoryObject = new Inventory
        { 
            UserId = UserId,
            Data = JsonSerializer.Serialize(inventory)
        };

        _context.Inventory.Add(inventoryObject);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Inventory successfully saved!"});
        }
    
}
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Text.Json;
using OresAndCores_2.Data;
using OresAndCores_2.Models;
using Microsoft.EntityFrameworkCore;
using OresAndCores_2.Dtos;
using System.Security.Claims;

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
    public async Task<IActionResult> SaveInventory([FromBody] InventoryDto data) 
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var userInventory = await _context.Inventory.FirstOrDefaultAsync(i => i.UserId == currentUserId);

        if (userInventory != null) {
            userInventory.Data = JsonSerializer.Serialize(data.Inventory);
            userInventory.PlayerLevel = data.Level;
            userInventory.PlayerMoney = data.Money;
            userInventory.ToolData = JsonSerializer.Serialize(data.Tools);
            _context.Inventory.Update(userInventory);
        } else {
              var inventoryObject = new Inventory
        { 
            UserId = currentUserId,
            Data = JsonSerializer.Serialize(data.Inventory),
            PlayerLevel = data.Level,
            PlayerMoney = data.Money,
            ToolData = JsonSerializer.Serialize(data.Tools),
        };

        _context.Inventory.Add(inventoryObject);
        }
        
        await _context.SaveChangesAsync();

        return Ok(new { message = "Inventory successfully saved!"});
        }
    
}
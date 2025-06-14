using Microsoft.AspNetCore.Mvc;
using OresAndCores_2.Data;
using OresAndCores_2.Models;
using System.Text.Encodings.Web;
using System.Security.Claims;

namespace OresAndCores_2.Controllers;

public class MineController : Controller
{
    private readonly OresAndCores_2Context _context;

    public MineController(OresAndCores_2Context context)
    {
        _context = context;
    }

    // 
    // GET: /Mine/
    public IActionResult Index()
    {
        var ViewModel = new GameViewModel
        {
            EnvironmentObjects = _context.EnvironmentObject.ToList(),
            Enemies = _context.Enemy.ToList(),
            Items = _context.Item.ToList(),
            LevelConfigurations = _context.LevelConfiguration.ToList(),
            UserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
        };

        return View(ViewModel);
    }
}
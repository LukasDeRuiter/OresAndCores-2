using Microsoft.AspNetCore.Mvc;
using OresAndCores_2.Data;
using OresAndCores_2.Models;
using System.Text.Encodings.Web;

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
             Items = _context.Item.ToList()

        };

        return View(ViewModel);
    }
}
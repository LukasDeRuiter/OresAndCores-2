using Microsoft.AspNetCore.Mvc;
using OresAndCores_2.Data;
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
        var environmentObjects = _context.EnvironmentObject.ToList();

        return View(environmentObjects);
    }
}
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace OresAndCores_2.Controllers;

public class MineController : Controller
{
    // 
    // GET: /Mine/
    public IActionResult Index()
    {
        return View();
    }
}
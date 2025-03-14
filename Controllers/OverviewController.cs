using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace OresAndCores_2.Controllers;

public class OverviewController : Controller
{
    // 
    // GET: /Overview/
    public IActionResult Index()
    {
        return View();
    }
}
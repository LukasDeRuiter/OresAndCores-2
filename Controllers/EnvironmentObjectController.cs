using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OresAndCores_2.Data;
using OresAndCores_2.Models;

namespace OresAndCores_2.Controllers
{
    public class EnvironmentObjectController : Controller
    {
        private readonly OresAndCores_2Context _context;

        public EnvironmentObjectController(OresAndCores_2Context context)
        {
            _context = context;
        }

        // GET: EnvironmentObject
        public async Task<IActionResult> Index()
        {
            return View(await _context.EnvironmentObject.ToListAsync());
        }

        // GET: EnvironmentObject/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var environmentObject = await _context.EnvironmentObject
                .FirstOrDefaultAsync(m => m.Id == id);
            if (environmentObject == null)
            {
                return NotFound();
            }

            return View(environmentObject);
        }

        // GET: EnvironmentObject/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: EnvironmentObject/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,name,path,items")] EnvironmentObject environmentObject)
        {
            if (ModelState.IsValid)
            {
                _context.Add(environmentObject);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(environmentObject);
        }

        // GET: EnvironmentObject/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var environmentObject = await _context.EnvironmentObject.FindAsync(id);
            if (environmentObject == null)
            {
                return NotFound();
            }
            return View(environmentObject);
        }

        // POST: EnvironmentObject/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,name,path,items")] EnvironmentObject environmentObject)
        {
            if (id != environmentObject.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(environmentObject);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EnvironmentObjectExists(environmentObject.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(environmentObject);
        }

        // GET: EnvironmentObject/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var environmentObject = await _context.EnvironmentObject
                .FirstOrDefaultAsync(m => m.Id == id);
            if (environmentObject == null)
            {
                return NotFound();
            }

            return View(environmentObject);
        }

        // POST: EnvironmentObject/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var environmentObject = await _context.EnvironmentObject.FindAsync(id);
            if (environmentObject != null)
            {
                _context.EnvironmentObject.Remove(environmentObject);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EnvironmentObjectExists(int id)
        {
            return _context.EnvironmentObject.Any(e => e.Id == id);
        }
    }
}

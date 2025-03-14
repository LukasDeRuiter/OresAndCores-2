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
    public class OreController : Controller
    {
        private readonly OresAndCores_2Context _context;

        public OreController(OresAndCores_2Context context)
        {
            _context = context;
        }

        // GET: Ore
        public async Task<IActionResult> Index()
        {
            return View(await _context.Ore.ToListAsync());
        }

        // GET: Ore/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ore = await _context.Ore
                .FirstOrDefaultAsync(m => m.Id == id);
            if (ore == null)
            {
                return NotFound();
            }

            return View(ore);
        }

        // GET: Ore/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Ore/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Color,Value")] Ore ore)
        {
            if (ModelState.IsValid)
            {
                _context.Add(ore);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(ore);
        }

        // GET: Ore/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ore = await _context.Ore.FindAsync(id);
            if (ore == null)
            {
                return NotFound();
            }
            return View(ore);
        }

        // POST: Ore/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Color,Value")] Ore ore)
        {
            if (id != ore.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(ore);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OreExists(ore.Id))
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
            return View(ore);
        }

        // GET: Ore/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ore = await _context.Ore
                .FirstOrDefaultAsync(m => m.Id == id);
            if (ore == null)
            {
                return NotFound();
            }

            return View(ore);
        }

        // POST: Ore/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var ore = await _context.Ore.FindAsync(id);
            if (ore != null)
            {
                _context.Ore.Remove(ore);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OreExists(int id)
        {
            return _context.Ore.Any(e => e.Id == id);
        }
    }
}

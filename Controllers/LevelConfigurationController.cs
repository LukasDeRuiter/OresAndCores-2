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
    public class LevelConfigurationController : Controller
    {
        private readonly OresAndCores_2Context _context;

        public LevelConfigurationController(OresAndCores_2Context context)
        {
            _context = context;
        }

        // GET: LevelConfiguration
        public async Task<IActionResult> Index()
        {
            return View(await _context.LevelConfiguration.ToListAsync());
        }

        // GET: LevelConfiguration/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var levelConfiguration = await _context.LevelConfiguration
                .FirstOrDefaultAsync(m => m.Id == id);
            if (levelConfiguration == null)
            {
                return NotFound();
            }

            return View(levelConfiguration);
        }

        // GET: LevelConfiguration/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: LevelConfiguration/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,EnvironementObjects,Enemies,Amount")] LevelConfiguration levelConfiguration)
        {
            if (ModelState.IsValid)
            {
                _context.Add(levelConfiguration);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(levelConfiguration);
        }

        // GET: LevelConfiguration/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var levelConfiguration = await _context.LevelConfiguration.FindAsync(id);
            if (levelConfiguration == null)
            {
                return NotFound();
            }
            return View(levelConfiguration);
        }

        // POST: LevelConfiguration/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,EnvironementObjects,Enemies,Amount")] LevelConfiguration levelConfiguration)
        {
            if (id != levelConfiguration.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(levelConfiguration);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LevelConfigurationExists(levelConfiguration.Id))
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
            return View(levelConfiguration);
        }

        // GET: LevelConfiguration/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var levelConfiguration = await _context.LevelConfiguration
                .FirstOrDefaultAsync(m => m.Id == id);
            if (levelConfiguration == null)
            {
                return NotFound();
            }

            return View(levelConfiguration);
        }

        // POST: LevelConfiguration/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var levelConfiguration = await _context.LevelConfiguration.FindAsync(id);
            if (levelConfiguration != null)
            {
                _context.LevelConfiguration.Remove(levelConfiguration);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LevelConfigurationExists(int id)
        {
            return _context.LevelConfiguration.Any(e => e.Id == id);
        }
    }
}

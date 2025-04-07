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
    public class EnemyController : Controller
    {
        private readonly OresAndCores_2Context _context;

        public EnemyController(OresAndCores_2Context context)
        {
            _context = context;
        }

        // GET: Enemy
        public async Task<IActionResult> Index()
        {
            return View(await _context.Enemy.ToListAsync());
        }

        // GET: Enemy/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var enemy = await _context.Enemy
                .FirstOrDefaultAsync(m => m.Id == id);
            if (enemy == null)
            {
                return NotFound();
            }

            return View(enemy);
        }

        // GET: Enemy/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Enemy/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Sprite,Health,Speed,Items")] Enemy enemy)
        {
            if (ModelState.IsValid)
            {
                _context.Add(enemy);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(enemy);
        }

        // GET: Enemy/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var enemy = await _context.Enemy.FindAsync(id);
            if (enemy == null)
            {
                return NotFound();
            }
            return View(enemy);
        }

        // POST: Enemy/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Sprite,Health,Speed,Items")] Enemy enemy)
        {
            if (id != enemy.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(enemy);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EnemyExists(enemy.Id))
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
            return View(enemy);
        }

        // GET: Enemy/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var enemy = await _context.Enemy
                .FirstOrDefaultAsync(m => m.Id == id);
            if (enemy == null)
            {
                return NotFound();
            }

            return View(enemy);
        }

        // POST: Enemy/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var enemy = await _context.Enemy.FindAsync(id);
            if (enemy != null)
            {
                _context.Enemy.Remove(enemy);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool EnemyExists(int id)
        {
            return _context.Enemy.Any(e => e.Id == id);
        }
    }
}

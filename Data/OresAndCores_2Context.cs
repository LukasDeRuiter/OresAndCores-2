using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OresAndCores_2.Models;

namespace OresAndCores_2.Data
{
    public class OresAndCores_2Context : DbContext
    {
        public OresAndCores_2Context (DbContextOptions<OresAndCores_2Context> options)
            : base(options)
        {
        }

        public DbSet<OresAndCores_2.Models.Ore> Ore { get; set; } = default!;

        public DbSet<OresAndCores_2.Models.Inventory> Inventory { get; set; } = default!;
    }
}

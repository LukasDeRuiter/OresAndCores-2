using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OresAndCores_2.Data;
using Microsoft.AspNetCore.Identity;
using OresAndCores_2.Areas.Identity.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbContextConnection")));

builder.Services.AddDbContext<OresAndCores_2Context>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("OresAndCores_2Context") ?? throw new InvalidOperationException("Connection string 'OresAndCores_2Context' not found.")));

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<ApplicationDbContext>();

// Health checks
builder.Services.AddHealthChecks()
    .AddSqlServer(
        connectionString: builder.Configuration.GetConnectionString("OresAndCores_2Context"),
        name: "sql",
        timeout: TimeSpan.FromSeconds(5),
        tags: new[] { "db", "sql", "azure" });

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.MapRazorPages();
app.MapControllers();
app.MapHealthChecks("/health");

app.MapOpenApi();
app.UseSwaggerUI(options => 
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Ores and Cores Api");
    });

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var dbContext1 = services.GetRequiredService<OresAndCores_2Context>();
        dbContext1.Database.Migrate();
    }
    catch (Exception ex)
    {
        // Log or handle exceptions as needed
        Console.WriteLine($"An error occurred migrating the DB: {ex.Message}");
    }
}
    
app.Run();

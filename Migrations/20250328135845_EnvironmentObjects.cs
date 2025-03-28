using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class EnvironmentObjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EnvironmentObject",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Items = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnvironmentObject", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "EnvironmentObject",
                columns: new[] { "Id", "Items", "Name", "Path" },
                values: new object[,]
                {
                    { 1, "test", "rock", "assets/mine/sprites/objects/rock.png" },
                    { 2, "test", "copper-rock", "assets/mine/sprites/objects/copper-rock.png" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnvironmentObject");
        }
    }
}

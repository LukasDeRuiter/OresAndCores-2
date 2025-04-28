using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class AddCoalAndBars : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "EnvironmentObject",
                columns: new[] { "Id", "Health", "Items", "MaterialType", "Name", "Path", "RequiredLevel" },
                values: new object[] { 7, 4, "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":7,\"Amount\":3,\"DropChance\":60}]", "stone", "coal-rock", "assets/mine/sprites/objects/coal-rock.png", 1 });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "Name", "Path", "Value" },
                values: new object[,]
                {
                    { 7, "coal-item", "assets/mine/sprites/items/coal-item.png", 7 },
                    { 8, "copper-bar-item", "assets/mine/sprites/items/copper-bar-item.png", 7 },
                    { 9, "bronze-bar-item", "assets/mine/sprites/items/bronze-bar-item.png", 7 },
                    { 10, "iron-bar-item", "assets/mine/sprites/items/iron-bar-item.png", 7 },
                    { 11, "steel-bar-item", "assets/mine/sprites/items/steel-bar-item.png", 7 }
                });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 1,
                column: "EnvironementObjects",
                value: "[{\"Id\":0,\"EntityId\":0,\"Percentage\":80,\"Layer\":0},{\"Id\":0,\"EntityId\":6,\"Percentage\":1,\"Layer\":1},{\"Id\":0,\"EntityId\":1,\"Percentage\":15,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":5,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":5,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]");

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":20,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":6,\"Percentage\":5,\"Layer\":1},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":20,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 1,
                column: "EnvironementObjects",
                value: "[{\"Id\":0,\"EntityId\":0,\"Percentage\":80,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":15,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":5,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]");

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":99,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":1,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":6,\"Percentage\":5,\"Layer\":1},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":78,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":20,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });
        }
    }
}

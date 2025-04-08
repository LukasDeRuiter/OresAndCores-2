using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class health : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Health",
                table: "EnvironmentObject",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Enemy",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Items", "Sprite" },
                values: new object[] { "[{\"ItemId\":5,\"Amount\":5,\"DropChance\":50}]", "assets/mine/sprites/enemies/slime.png" });

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 1,
                column: "Health",
                value: 3);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 2,
                column: "Health",
                value: 5);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 3,
                column: "Health",
                value: 7);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 4,
                column: "Health",
                value: 10);

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "Name", "Path", "Value" },
                values: new object[] { 5, "coin-item", "assets/mine/sprites/items/coin-item.png", 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "Health",
                table: "EnvironmentObject");

            migrationBuilder.UpdateData(
                table: "Enemy",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Items", "Sprite" },
                values: new object[] { "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":2,\"Amount\":1,\"DropChance\":100}]", "slime" });
        }
    }
}

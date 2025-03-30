using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class newValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 1,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":2,\"DropChance\":100}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 2,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":2,\"Amount\":2,\"DropChance\":100}]");

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "Name", "Path", "Value" },
                values: new object[] { 2, "copper-ore-item", "assets/mine/sprites/items/copper-ore-item.png", 50 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 1,
                column: "Items",
                value: "test");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 2,
                column: "Items",
                value: "test");
        }
    }
}

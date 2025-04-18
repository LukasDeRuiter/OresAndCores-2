using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class Spiders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Enemy",
                columns: new[] { "Id", "Health", "Items", "Name", "Speed", "Sprite" },
                values: new object[] { 2, 5, "[{\"ItemId\":5,\"Amount\":8,\"DropChance\":50}]", "spider", 30, "assets/mine/sprites/enemies/spider.png" });

            migrationBuilder.InsertData(
                table: "LevelConfiguration",
                columns: new[] { "Id", "Amount", "Enemies", "EnvironementObjects" },
                values: new object[] { 3, 15, "[{\"Id\":0,\"EntityId\":1,\"Percentage\":80},{\"Id\":0,\"EntityId\":2,\"Percentage\":20}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75},{\"Id\":0,\"EntityId\":1,\"Percentage\":20},{\"Id\":0,\"EntityId\":2,\"Percentage\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2}]" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Enemy",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}

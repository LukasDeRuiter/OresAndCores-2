using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class AddEnemy3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Enemy",
                columns: new[] { "Id", "Health", "Items", "Name", "Speed", "Sprite" },
                values: new object[] { 1, 3, "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":2,\"Amount\":1,\"DropChance\":100}]", "slime", 20, "slime" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Enemy",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}

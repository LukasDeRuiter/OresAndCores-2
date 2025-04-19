using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class AddEnemyType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnemyType",
                table: "Enemy",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Enemy",
                keyColumn: "Id",
                keyValue: 1,
                column: "EnemyType",
                value: "standard");

            migrationBuilder.UpdateData(
                table: "Enemy",
                keyColumn: "Id",
                keyValue: 2,
                column: "EnemyType",
                value: "crawler");

            migrationBuilder.InsertData(
                table: "Enemy",
                columns: new[] { "Id", "EnemyType", "Health", "Items", "Name", "Speed", "Sprite" },
                values: new object[] { 3, "ambush", 4, "[{\"ItemId\":5,\"Amount\":3,\"DropChance\":50},{\"ItemId\":1,\"Amount\":3,\"DropChance\":50}]", "rocker", 50, "assets/mine/sprites/enemies/rocker.png" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Enemy",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "EnemyType",
                table: "Enemy");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class Wood : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Name", "Path" },
                values: new object[] { "wood-stump", "assets/mine/sprites/objects/wood-stump.png" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                column: "EnvironementObjects",
                value: "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":6,\"Percentage\":5,\"Layer\":1},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Name", "Path" },
                values: new object[] { "log-stump", "assets/mine/sprites/objects/log-stump.png" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                column: "EnvironementObjects",
                value: "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]");
        }
    }
}

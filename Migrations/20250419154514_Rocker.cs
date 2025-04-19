using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class Rocker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                column: "Enemies",
                value: "[{\"Id\":0,\"EntityId\":1,\"Percentage\":99},{\"Id\":0,\"EntityId\":3,\"Percentage\":1}]");

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 3,
                column: "Enemies",
                value: "[{\"Id\":0,\"EntityId\":1,\"Percentage\":78},{\"Id\":0,\"EntityId\":2,\"Percentage\":20},{\"Id\":0,\"EntityId\":3,\"Percentage\":2}]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                column: "Enemies",
                value: "[{\"Id\":0,\"EntityId\":1,\"Percentage\":100}]");

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 3,
                column: "Enemies",
                value: "[{\"Id\":0,\"EntityId\":1,\"Percentage\":80},{\"Id\":0,\"EntityId\":2,\"Percentage\":20}]");
        }
    }
}

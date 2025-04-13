using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class LevelConfigurations2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "LevelConfiguration",
                columns: new[] { "Id", "Amount", "Enemies", "EnvironementObjects" },
                values: new object[,]
                {
                    { 1, 10, "[{\"Id\":0,\"EntityId\":1,\"Percentage\":100}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":80},{\"Id\":0,\"EntityId\":1,\"Percentage\":15},{\"Id\":0,\"EntityId\":2,\"Percentage\":5}]" },
                    { 2, 12, "[{\"Id\":0,\"EntityId\":1,\"Percentage\":100}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75},{\"Id\":0,\"EntityId\":1,\"Percentage\":20},{\"Id\":0,\"EntityId\":2,\"Percentage\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2}]" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}

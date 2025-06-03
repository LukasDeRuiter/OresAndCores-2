using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class addDefaultLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "LevelConfiguration",
                columns: new[] { "Id", "Amount", "Enemies", "EnvironementObjects" },
                values: new object[] { 100, 15, "[{\"Id\":0,\"EntityId\":1,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":20,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 100);
        }
    }
}

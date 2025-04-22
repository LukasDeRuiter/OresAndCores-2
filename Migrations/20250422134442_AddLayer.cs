using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class AddLayer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Layer",
                table: "EnvironmentObject");

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":100,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":80,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":15,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":5,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":99,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":1,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":78,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":20,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":0}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Layer",
                table: "EnvironmentObject",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 1,
                column: "Layer",
                value: 2);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 2,
                column: "Layer",
                value: 2);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 3,
                column: "Layer",
                value: 2);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 4,
                column: "Layer",
                value: 2);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 5,
                column: "Layer",
                value: 3);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 6,
                column: "Layer",
                value: 1);

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":100}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":80},{\"Id\":0,\"EntityId\":1,\"Percentage\":15},{\"Id\":0,\"EntityId\":2,\"Percentage\":5}]" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":99},{\"Id\":0,\"EntityId\":3,\"Percentage\":1}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75},{\"Id\":0,\"EntityId\":1,\"Percentage\":20},{\"Id\":0,\"EntityId\":2,\"Percentage\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2}]" });

            migrationBuilder.UpdateData(
                table: "LevelConfiguration",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Enemies", "EnvironementObjects" },
                values: new object[] { "[{\"Id\":0,\"EntityId\":1,\"Percentage\":78},{\"Id\":0,\"EntityId\":2,\"Percentage\":20},{\"Id\":0,\"EntityId\":3,\"Percentage\":2}]", "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75},{\"Id\":0,\"EntityId\":1,\"Percentage\":20},{\"Id\":0,\"EntityId\":2,\"Percentage\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2}]" });
        }
    }
}

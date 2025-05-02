using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSavingData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlayerLevel",
                table: "Inventory",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlayerMoney",
                table: "Inventory",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ToolData",
                table: "Inventory",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlayerLevel",
                table: "Inventory");

            migrationBuilder.DropColumn(
                name: "PlayerMoney",
                table: "Inventory");

            migrationBuilder.DropColumn(
                name: "ToolData",
                table: "Inventory");
        }
    }
}

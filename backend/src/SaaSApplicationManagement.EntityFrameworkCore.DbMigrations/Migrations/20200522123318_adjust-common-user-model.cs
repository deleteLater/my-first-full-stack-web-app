using Microsoft.EntityFrameworkCore.Migrations;

namespace SaaSApplicationManagement.Migrations
{
    public partial class adjustcommonusermodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "SAM.CommonUser");

            migrationBuilder.DropColumn(
                name: "Roles",
                table: "SAM.CommonUser");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "SAM.CommonUser",
                maxLength: 16,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "SAM.CommonUser");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "SAM.CommonUser",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Roles",
                table: "SAM.CommonUser",
                type: "nvarchar(16)",
                maxLength: 16,
                nullable: true);
        }
    }
}

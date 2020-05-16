using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SaaSApplicationManagement.Migrations
{
    public partial class Add_TenantId_To_CommonUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "SAM.CommonUser",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "SAM.CommonUser");
        }
    }
}

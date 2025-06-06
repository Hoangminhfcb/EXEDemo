using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BakeMarket.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Cakes");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Cakes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cakes_CategoryId",
                table: "Cakes",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cakes_Category_CategoryId",
                table: "Cakes",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cakes_Category_CategoryId",
                table: "Cakes");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Cakes_CategoryId",
                table: "Cakes");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Cakes");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Cakes",
                type: "int",
                nullable: true);
        }
    }
}

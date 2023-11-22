using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SuperHeroApp.Migrations
{
    public partial class ConfigDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "T_HEROES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NAME = table.Column<string>(type: "text", nullable: false),
                    HERO_NAME = table.Column<string>(type: "text", nullable: false),
                    BIRTH_DATE = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    HERO_HEIGHT = table.Column<string>(type: "text", nullable: false),
                    HERO_WEIGHT = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_HEROES", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "T_SUPER_POWER",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SUPER_POWER = table.Column<string>(type: "text", nullable: false),
                    DESCRIPTION = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_SUPER_POWER", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "T_SUPER_POWER_HEROES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ID_HEROES = table.Column<int>(type: "integer", nullable: false),
                    ID_SUPER_POWER = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_SUPER_POWER_HEROES", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_SUPER_POWER_HEROES_T_HEROES_ID_HEROES",
                        column: x => x.ID_HEROES,
                        principalTable: "T_HEROES",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_SUPER_POWER_HEROES_T_SUPER_POWER_ID_SUPER_POWER",
                        column: x => x.ID_SUPER_POWER,
                        principalTable: "T_SUPER_POWER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_T_SUPER_POWER_HEROES_ID_HEROES",
                table: "T_SUPER_POWER_HEROES",
                column: "ID_HEROES");

            migrationBuilder.CreateIndex(
                name: "IX_T_SUPER_POWER_HEROES_ID_SUPER_POWER",
                table: "T_SUPER_POWER_HEROES",
                column: "ID_SUPER_POWER");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "T_SUPER_POWER_HEROES");

            migrationBuilder.DropTable(
                name: "T_HEROES");

            migrationBuilder.DropTable(
                name: "T_SUPER_POWER");
        }
    }
}

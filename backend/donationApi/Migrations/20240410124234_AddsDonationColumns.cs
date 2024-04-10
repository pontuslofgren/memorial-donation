using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace donationApi.Migrations
{
    /// <inheritdoc />
    public partial class AddsDonationColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "Donation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Donation",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DonorFirstName",
                table: "Donation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DonorLastName",
                table: "Donation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Donation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "HasSucceededPayment",
                table: "Donation",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "HonoreeName",
                table: "Donation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Message",
                table: "Donation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "DonorFirstName",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "DonorLastName",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "HasSucceededPayment",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "HonoreeName",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "Message",
                table: "Donation");
        }
    }
}

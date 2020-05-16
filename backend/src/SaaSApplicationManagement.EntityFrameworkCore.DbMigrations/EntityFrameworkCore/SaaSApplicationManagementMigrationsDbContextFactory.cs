using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace SaaSApplicationManagement.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class SaaSApplicationManagementMigrationsDbContextFactory : IDesignTimeDbContextFactory<SaaSApplicationManagementMigrationsDbContext>
    {
        public static readonly ILoggerFactory ConsoleLogger = LoggerFactory.Create(builder => builder.AddConsole());
        
        public SaaSApplicationManagementMigrationsDbContext CreateDbContext(string[] args)
        {
            SaaSApplicationManagementEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<SaaSApplicationManagementMigrationsDbContext>()
                .UseLoggerFactory(ConsoleLogger)
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new SaaSApplicationManagementMigrationsDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}

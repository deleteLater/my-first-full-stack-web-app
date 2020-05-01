using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SaaSApplicationManagement.Data;
using Volo.Abp.DependencyInjection;

namespace SaaSApplicationManagement.EntityFrameworkCore
{
    public class EntityFrameworkCoreSaaSApplicationManagementDbSchemaMigrator
        : ISaaSApplicationManagementDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreSaaSApplicationManagementDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the SaaSApplicationManagementMigrationsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<SaaSApplicationManagementMigrationsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}
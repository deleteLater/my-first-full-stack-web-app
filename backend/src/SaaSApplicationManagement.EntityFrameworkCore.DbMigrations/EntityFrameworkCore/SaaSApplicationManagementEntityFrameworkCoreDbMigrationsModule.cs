using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace SaaSApplicationManagement.EntityFrameworkCore
{
    [DependsOn(
        typeof(SaaSApplicationManagementEntityFrameworkCoreModule)
        )]
    public class SaaSApplicationManagementEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<SaaSApplicationManagementMigrationsDbContext>();
        }
    }
}

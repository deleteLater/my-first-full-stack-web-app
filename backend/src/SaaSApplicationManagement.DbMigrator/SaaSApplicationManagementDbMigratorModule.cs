using SaaSApplicationManagement.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace SaaSApplicationManagement.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(SaaSApplicationManagementEntityFrameworkCoreDbMigrationsModule),
        typeof(SaaSApplicationManagementApplicationContractsModule)
        )]
    public class SaaSApplicationManagementDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}

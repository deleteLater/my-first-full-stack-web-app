using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Authorization;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Data;
using Volo.Abp.IdentityServer;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;

namespace SaaSApplicationManagement
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(AbpTestBaseModule),
        typeof(AbpAuthorizationModule),
        typeof(SaaSApplicationManagementDomainModule)
        )]
    public class SaaSApplicationManagementTestBaseModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            PreConfigure<AbpIdentityServerBuilderOptions>(options =>
            {
                options.AddDeveloperSigningCredential = false;
            });

            PreConfigure<IIdentityServerBuilder>(identityServerBuilder =>
            {
                identityServerBuilder.AddDeveloperSigningCredential(false, System.Guid.NewGuid().ToString());
            });
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options =>
            {
                options.IsJobExecutionEnabled = false;
            });

            context.Services.AddAlwaysAllowAuthorization();
        }

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();
            
            configuration["IdentityServer:ApiName"] = "ExternalTrainingSystem";
            configuration["IdentityServer:AuthorityServer"] = "http://localhost:5000";
            configuration["IdentityServer:WebClientId"] = "ExternalTrainingSystem";
            configuration["IdentityServer:WebClientSecret"] = "ExternalTrainingSystem_1q2w3E";
            
            SeedTestData(context);
        }

        private static void SeedTestData(ApplicationInitializationContext context)
        {
            AsyncHelper.RunSync(async () =>
            {
                using (var scope = context.ServiceProvider.CreateScope())
                {
                    await scope.ServiceProvider
                        .GetRequiredService<IDataSeeder>()
                        .SeedAsync();
                }
            });
        }
    }
}

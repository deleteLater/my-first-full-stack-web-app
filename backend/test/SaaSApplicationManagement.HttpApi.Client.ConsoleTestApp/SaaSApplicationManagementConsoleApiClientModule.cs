using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace SaaSApplicationManagement.HttpApi.Client.ConsoleTestApp
{
    [DependsOn(
        typeof(SaaSApplicationManagementHttpApiClientModule),
        typeof(AbpHttpClientIdentityModelModule)
        )]
    public class SaaSApplicationManagementConsoleApiClientModule : AbpModule
    {
        
    }
}

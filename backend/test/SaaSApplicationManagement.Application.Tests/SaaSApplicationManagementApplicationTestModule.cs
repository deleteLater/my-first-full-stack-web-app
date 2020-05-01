using Volo.Abp.Modularity;

namespace SaaSApplicationManagement
{
    [DependsOn(
        typeof(SaaSApplicationManagementApplicationModule),
        typeof(SaaSApplicationManagementDomainTestModule)
        )]
    public class SaaSApplicationManagementApplicationTestModule : AbpModule
    {

    }
}
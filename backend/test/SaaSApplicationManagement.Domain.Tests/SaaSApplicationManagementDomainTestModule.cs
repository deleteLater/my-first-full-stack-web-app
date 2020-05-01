using SaaSApplicationManagement.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace SaaSApplicationManagement
{
    [DependsOn(
        typeof(SaaSApplicationManagementEntityFrameworkCoreTestModule)
        )]
    public class SaaSApplicationManagementDomainTestModule : AbpModule
    {

    }
}
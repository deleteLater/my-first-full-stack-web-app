using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace SaaSApplicationManagement.Data
{
    /* This is used if database provider does't define
     * ISaaSApplicationManagementDbSchemaMigrator implementation.
     */
    public class NullSaaSApplicationManagementDbSchemaMigrator : ISaaSApplicationManagementDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}
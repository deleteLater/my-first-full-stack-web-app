using System.Threading.Tasks;

namespace SaaSApplicationManagement.Data
{
    public interface ISaaSApplicationManagementDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}

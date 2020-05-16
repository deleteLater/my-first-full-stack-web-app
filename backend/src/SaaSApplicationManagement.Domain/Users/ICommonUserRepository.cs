using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace SaaSApplicationManagement.Users
{
    public interface ICommonUserRepository : IRepository<CommonUser, long>
    {
        Task<int> GetCountAsync(
            string name = null,
            CancellationToken cancellationToken = default
        );

        Task<List<CommonUser>> GetListAsync(
            string name = null,
            int skipCount = 0,
            int maxResultCount = int.MaxValue,
            CancellationToken cancellationToken = default
        );

        Task<CommonUser> GetByNameAsync(
            string name,
            CancellationToken cancellationToken = default
        );
    }
}
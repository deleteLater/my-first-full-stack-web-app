using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaaSApplicationManagement.EntityFrameworkCore;
using SaaSApplicationManagement.Users;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace SaaSApplicationManagement
{
    public class CommonUserRepository : EfCoreRepository<SaaSApplicationManagementDbContext, CommonUser, long>,
        ICommonUserRepository
    {
        public CommonUserRepository(IDbContextProvider<SaaSApplicationManagementDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
        }

        public async Task<int> GetCountAsync(
            string name = null,
            CancellationToken cancellationToken = default
        )
        {
            return await DbSet
                .WhereIf(
                    !name.IsNullOrWhiteSpace(),
                    x => x.Name.StartsWith(name))
                .CountAsync(GetCancellationToken(cancellationToken));
        }

        public async Task<List<CommonUser>> GetListAsync(
            string name = null,
            int skipCount = 0,
            int maxResultCount = int.MaxValue,
            CancellationToken cancellationToken = default
        )
        {
            return await DbSet
                .WhereIf(
                    !name.IsNullOrWhiteSpace(),
                    x => x.Name.StartsWith(name)
                )
                .PageBy(skipCount, maxResultCount)
                .ToListAsync(GetCancellationToken(cancellationToken));
        }

        public async Task<CommonUser> GetByNameAsync(
            string name,
            CancellationToken cancellationToken = default
        )
        {
            return await DbSet.FirstOrDefaultAsync(
                x => x.Name == name,
                GetCancellationToken(cancellationToken)
            );
        }
    }
}
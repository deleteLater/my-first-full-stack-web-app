using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using SaaSApplicationManagement.Users;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace SaaSApplicationManagement
{
    public class SaaSApplicationManagementTestDataSeedContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public SaaSApplicationManagementTestDataSeedContributor(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task SeedAsync(DataSeedContext context)
        {
            await BuildCommonUserAsync();
        }

        private async Task BuildCommonUserAsync()
        {
            await _serviceProvider.GetRequiredService<ICommonUserRepository>()
                .InsertAsync(
                    new CommonUser(
                        null,
                        "test-common",
                        "123456",
                        "15338593769",
                        "mikcczhang@gmail.com",
                        "boy",
                        "wow, it's very awesome"
                    )
                );
        }
    }
}
using System.Threading.Tasks;
using SaaSApplicationManagement.Users;
using Shouldly;
using Volo.Abp;
using Xunit;

namespace SaaSApplicationManagement
{
    public class CommonUserDomainTests : SaaSApplicationManagementDomainTestBase
    {
        private readonly CommonUserManager _manager;

        public CommonUserDomainTests()
        {
            _manager = GetRequiredService<CommonUserManager>();
        }

        [Fact]
        public async Task Should_Check_User_Name_Exists()
        {
            // 'test-common' has been used by data-seeder
            await _manager.CheckNameHaveBeenUsedAsync("test-common")
                .ShouldThrowAsync<UserFriendlyException>();;
        }
    }
}
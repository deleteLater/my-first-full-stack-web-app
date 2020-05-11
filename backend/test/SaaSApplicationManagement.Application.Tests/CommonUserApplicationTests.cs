using System.Threading.Tasks;
using SaaSApplicationManagement.Users;
using SaaSApplicationManagement.Users.Dtos;
using Shouldly;
using Xunit;

namespace SaaSApplicationManagement
{
    public class CommonUserApplicationTests : SaaSApplicationManagementApplicationTestBase
    {
        private readonly ICommonUserAppService _service;

        public CommonUserApplicationTests()
        {
            _service = GetRequiredService<ICommonUserAppService>();
        }

        [Fact]
        public async Task Should_Create_A_New_Common_User()
        {
            var result = await _service.CreateAsync(new CreateCommonUserDto
            {
                Name = "jack",
                Description = "wow, it's awesome",
                Email = "jack@test.com",
                Password = "1q2w3E*",
                Phone = "15338593769",
                Roles = "admin",
                Sex = "boy"
            });
            
            result.ShouldNotBe(null);
        }

        [Fact]
        public async Task Should_Get_Common_User()
        {
            var commonUser = await _service.GetListAsync(new CommonUserFilter());
            
            commonUser.TotalCount.ShouldBe(1);
            commonUser.Items[0].Email.ShouldBe("mikcczhang@gmail.com");
        }
    }
}
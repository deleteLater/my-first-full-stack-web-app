using System.Collections.Generic;
using System.Threading.Tasks;
using SaaSApplicationManagement.Users.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SaaSApplicationManagement.Users
{
    public class CommonUserAppService : ApplicationService, ICommonUserAppService
    {
        private readonly ICommonUserRepository _repository;

        public CommonUserAppService(ICommonUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<CommonUserDto> CreateAsync(CreateCommonUserDto input)
        {
            var user = new CommonUser(
                CurrentTenant.Id,
                input.Name,
                input.Password,
                input.Phone,
                input.Email,
                input.Sex,
                input.Description, input.Roles
            );

            await _repository.InsertAsync(user);

            return ObjectMapper.Map<CommonUser, CommonUserDto>(user);
        }

        public async Task<PagedResultDto<CommonUserDto>> GetListAsync(CommonUserFilter filter)
        {
            var total = await _repository.GetCountAsync(filter.Name);

            var list = await _repository.GetListAsync(filter.Name, filter.SkipCount, filter.MaxResultCount);

            return new PagedResultDto<CommonUserDto>(
                total,
                ObjectMapper.Map<List<CommonUser>, List<CommonUserDto>>(list)
            );
        }

        public async Task DeleteAsync(long id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
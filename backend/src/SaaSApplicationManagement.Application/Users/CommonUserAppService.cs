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
        private readonly CommonUserManager _manager;

        public CommonUserAppService(
            ICommonUserRepository repository,
            CommonUserManager manager
            )
        {
            _repository = repository;
            _manager = manager;
        }

        public async Task<CommonUserDto> CreateAsync(CreateCommonUserDto input)
        {
            await _manager.CheckNameHaveBeenUsedAsync(input.Name);
            
            var user = new CommonUser(
                CurrentTenant.Id,
                input.Name,
                input.Phone,
                input.Email,
                input.Sex,
                input.Description, 
                input.Role
            );

            await _repository.InsertAsync(user);

            return ObjectMapper.Map<CommonUser, CommonUserDto>(user);
        }

        public async Task<CommonUserDto> GetAsync(long id)
        {
            return ObjectMapper.Map<CommonUser, CommonUserDto>(
                await _repository.GetAsync(id)
            );
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

        public async Task<CommonUserDto> UpdateAsync(long id, UpdateCommonUserDto input)
        {
            var user = await _repository.GetAsync(id);

            user.UpdateInternal(
                input.Name,
                input.Sex,
                input.Phone,
                input.Email,
                input.Role,
                input.Description
            );

            return ObjectMapper.Map<CommonUser, CommonUserDto>(user);
        }

        public async Task DeleteAsync(long id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
using System.Threading.Tasks;
using SaaSApplicationManagement.Users.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SaaSApplicationManagement.Users
{
    public interface ICommonUserAppService : IApplicationService
    {
        Task<CommonUserDto> CreateAsync(CreateCommonUserDto input);

        Task<CommonUserDto> GetAsync(long id);
        
        Task<PagedResultDto<CommonUserDto>> GetListAsync(CommonUserFilter filter);

        Task<CommonUserDto> UpdateAsync(long id, UpdateCommonUserDto input);

        Task DeleteAsync(long id);
    }
}
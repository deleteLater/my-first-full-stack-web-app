using System.Threading.Tasks;
using SaaSApplicationManagement.Users.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace SaaSApplicationManagement.Users
{
    public interface ICommonUserAppService : IApplicationService
    {
        Task<CommonUserDto> CreateAsync(CreateCommonUserDto input);
        
        Task<PagedResultDto<CommonUserDto>> GetListAsync(CommonUserFilter filter);

        Task DeleteAsync(long id);
    }
}
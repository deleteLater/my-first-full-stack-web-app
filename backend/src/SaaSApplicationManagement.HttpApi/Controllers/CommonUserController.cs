using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SaaSApplicationManagement.Users;
using SaaSApplicationManagement.Users.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;

namespace SaaSApplicationManagement.Controllers
{
    [ControllerName("CommonUser")]
    [Route("api/common-user")]
    public class CommonUserController : AbpController, ICommonUserAppService
    {
        private readonly ICommonUserAppService _service;

        public CommonUserController(ICommonUserAppService service)
        {
            _service = service;
        }

        /// <summary>
        /// create new common user
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<CommonUserDto> CreateAsync([FromBody] CreateCommonUserDto input)
        {
            return await _service.CreateAsync(input);
        }

        /// <summary>
        /// get common user paged-list
        /// </summary>
        /// <param name="filter">page params</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<PagedResultDto<CommonUserDto>> GetListAsync(CommonUserFilter filter)
        {
            return await _service.GetListAsync(filter);
        }

        /// <summary>
        /// delete a specific common user
        /// </summary>
        /// <param name="id">common user id</param>
        /// <returns></returns>
        [HttpDelete]
        public async Task DeleteAsync(long id)
        {
            await _service.DeleteAsync(id);
        }
    }
}
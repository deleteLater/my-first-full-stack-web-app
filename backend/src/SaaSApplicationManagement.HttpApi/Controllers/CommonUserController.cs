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
        /// get a specific common user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<CommonUserDto> GetAsync(long id)
        {
            return await _service.GetAsync(id);
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
        /// update a specific common user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<CommonUserDto> UpdateAsync(long id, [FromBody] UpdateCommonUserDto input)
        {
            return await _service.UpdateAsync(id, input);
        }

        /// <summary>
        /// delete a specific common user
        /// </summary>
        /// <param name="id">common user id</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task DeleteAsync(long id)
        {
            await _service.DeleteAsync(id);
        }
    }
}
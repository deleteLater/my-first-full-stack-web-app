using Volo.Abp.Application.Dtos;

namespace SaaSApplicationManagement.Users.Dtos
{
    public class CommonUserFilter : PagedResultRequestDto
    {
        public string Name { get; set; }
    }
}
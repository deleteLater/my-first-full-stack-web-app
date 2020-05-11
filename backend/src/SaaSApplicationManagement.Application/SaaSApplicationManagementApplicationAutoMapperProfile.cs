using AutoMapper;
using SaaSApplicationManagement.Users;
using SaaSApplicationManagement.Users.Dtos;

namespace SaaSApplicationManagement
{
    public class SaaSApplicationManagementApplicationAutoMapperProfile : Profile
    {
        public SaaSApplicationManagementApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */

            CreateMap<CommonUser, CommonUserDto>();
        }
    }
}

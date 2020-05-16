using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace SaaSApplicationManagement.Users
{
    public class CommonUserManager : DomainService
    {
        private readonly ICommonUserRepository _repository;

        public CommonUserManager(ICommonUserRepository repository)
        {
            _repository = repository;
        }

        public async Task CheckNameHaveBeenUsedAsync(string name)
        {
            var user = await _repository.GetByNameAsync(name);
            if (user != null)
            {
                throw new UserFriendlyException($"username {name} have been used, please try again.");
            }
        }
    }
}
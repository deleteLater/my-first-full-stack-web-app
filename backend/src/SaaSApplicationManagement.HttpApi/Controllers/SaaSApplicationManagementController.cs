using SaaSApplicationManagement.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace SaaSApplicationManagement.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class SaaSApplicationManagementController : AbpController
    {
        protected SaaSApplicationManagementController()
        {
            LocalizationResource = typeof(SaaSApplicationManagementResource);
        }
    }
}
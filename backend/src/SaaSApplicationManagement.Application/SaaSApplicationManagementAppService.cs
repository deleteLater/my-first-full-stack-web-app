using System;
using System.Collections.Generic;
using System.Text;
using SaaSApplicationManagement.Localization;
using Volo.Abp.Application.Services;

namespace SaaSApplicationManagement
{
    /* Inherit your application services from this class.
     */
    public abstract class SaaSApplicationManagementAppService : ApplicationService
    {
        protected SaaSApplicationManagementAppService()
        {
            LocalizationResource = typeof(SaaSApplicationManagementResource);
        }
    }
}

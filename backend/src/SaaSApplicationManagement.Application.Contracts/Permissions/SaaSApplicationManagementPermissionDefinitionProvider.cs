using SaaSApplicationManagement.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace SaaSApplicationManagement.Permissions
{
    public class SaaSApplicationManagementPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(SaaSApplicationManagementPermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(SaaSApplicationManagementPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<SaaSApplicationManagementResource>(name);
        }
    }
}

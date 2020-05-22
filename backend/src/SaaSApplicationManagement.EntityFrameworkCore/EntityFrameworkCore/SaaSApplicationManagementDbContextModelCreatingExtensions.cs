using Microsoft.EntityFrameworkCore;
using SaaSApplicationManagement.Users;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Identity;

namespace SaaSApplicationManagement.EntityFrameworkCore
{
    public static class SaaSApplicationManagementDbContextModelCreatingExtensions
    {
        public static void ConfigureSaaSApplicationManagement(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            builder.Entity<CommonUser>(user =>
            {
                user.ToTable(
                    $"{SaaSApplicationManagementConsts.DbTablePrefix}.CommonUser",
                    SaaSApplicationManagementConsts.DbSchema
                );
                
                user.ConfigureFullAuditedAggregateRoot();

                user.Property(nameof(CommonUser.Name))
                    .IsRequired()
                    .HasMaxLength(IdentityUserConsts.MaxNameLength);
                user.Property(nameof(CommonUser.Avatar))
                    .HasMaxLength(CommonUserConsts.MaxAvatarLength)
                    .HasDefaultValue("default");
                user.Property(nameof(CommonUser.Sex))
                    .IsRequired()
                    .HasMaxLength(CommonUserConsts.MaxSexLength);
                user.Property(nameof(CommonUser.Role))
                    .HasMaxLength(CommonUserConsts.MaxRoleLength);
                user.Property(nameof(CommonUser.Online))
                    .IsRequired()
                    .HasDefaultValue(false);
                user.Property(nameof(CommonUser.Phone))
                    .IsRequired()
                    .HasMaxLength(CommonUserConsts.MaxPhoneLength);
                user.Property(nameof(CommonUser.Email))
                    .IsRequired()
                    .HasMaxLength(IdentityUserConsts.MaxEmailLength);
                user.Property(nameof(CommonUser.Description))
                    .IsRequired()
                    .HasMaxLength(CommonUserConsts.MaxDescriptionLength);
            });
        }
    }
}
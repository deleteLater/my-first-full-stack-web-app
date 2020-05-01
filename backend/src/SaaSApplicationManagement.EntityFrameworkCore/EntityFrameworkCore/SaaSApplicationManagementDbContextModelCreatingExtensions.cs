using Microsoft.EntityFrameworkCore;
using Volo.Abp;

namespace SaaSApplicationManagement.EntityFrameworkCore
{
    public static class SaaSApplicationManagementDbContextModelCreatingExtensions
    {
        public static void ConfigureSaaSApplicationManagement(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(SaaSApplicationManagementConsts.DbTablePrefix + "YourEntities", SaaSApplicationManagementConsts.DbSchema);

            //    //...
            //});
        }
    }
}
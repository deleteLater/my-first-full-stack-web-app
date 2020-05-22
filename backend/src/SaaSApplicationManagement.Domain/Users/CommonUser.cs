using System;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace SaaSApplicationManagement.Users
{
    public class CommonUser : FullAuditedAggregateRoot<long>, IMultiTenant
    {
        public Guid? TenantId { get; protected set; }
        
        public string Name { get; protected set; }

        public string Avatar { get; protected set; }

        public string Sex { get; protected set; }

        public string Role { get; protected set; }

        public bool Online { get; protected set; }

        public string Phone { get; protected set; }

        public string Email { get; protected set; }

        public string Description { get; protected set; }

        protected CommonUser()
        {
        }

        public CommonUser(
            Guid? tenantId,
            [NotNull] string name,
            [NotNull] string phone,
            [NotNull] string email,
            [NotNull] string sex,
            string description = "he is lazy so no description here",
            string role = "test",
            bool online = false,
            string avatar = "default"
        )
        {
            TenantId = tenantId;

            Name = Check.NotNullOrWhiteSpace(name, nameof(name));
            Phone = Check.NotNullOrWhiteSpace(phone, nameof(phone));
            Email = Check.NotNullOrWhiteSpace(email, nameof(email));
            Sex = Check.NotNullOrWhiteSpace(sex, nameof(sex));

            Description = description;
            Role = role;
            Online = online;
            Avatar = avatar;
        }

        public void UpdateInternal(
            [NotNull] string name,
            [NotNull] string phone,
            [NotNull] string email,
            [NotNull] string sex,
            [NotNull] string role,
            string description
        )
        {
            Name = Check.NotNullOrWhiteSpace(name, nameof(name));
            Phone = Check.NotNullOrWhiteSpace(phone, nameof(phone));
            Email = Check.NotNullOrWhiteSpace(email, nameof(email));
            Sex = Check.NotNullOrWhiteSpace(sex, nameof(sex));
            Role = Check.NotNullOrWhiteSpace(role, nameof(role));

            Description = description;
        }
    }
}
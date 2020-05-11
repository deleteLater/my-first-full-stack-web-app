using System.ComponentModel.DataAnnotations;
using Volo.Abp.Auditing;
using Volo.Abp.Identity;

namespace SaaSApplicationManagement.Users.Dtos
{
    public class CreateCommonUserDto
    {
        [Required]
        [StringLength(IdentityUserConsts.MaxUserNameLength)]
        public string Name { get; set; }
        
        [Required]
        [StringLength(IdentityUserConsts.MaxPasswordLength)]
        [DisableAuditing]
        public string Password { get; set; }
        
        [Required]
        [EmailAddress]
        [StringLength(IdentityUserConsts.MaxEmailLength)]
        public string Email { get; set; }

        [Required]
        [StringLength(CommonUserConsts.MaxSexLength)]
        public string Sex { get; set; }

        [StringLength(CommonUserConsts.MaxRolesLength)]
        public string Roles { get; set; }

        [Required]
        public string Phone { get; set; }

        [StringLength(CommonUserConsts.MaxDescriptionLength)]
        public string Description { get; set; }
    }
}
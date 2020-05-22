using System.ComponentModel.DataAnnotations;
using Volo.Abp.Identity;

namespace SaaSApplicationManagement.Users.Dtos
{
    public class CreateCommonUserDto
    {
        [Required]
        [StringLength(IdentityUserConsts.MaxUserNameLength)]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        [StringLength(IdentityUserConsts.MaxEmailLength)]
        public string Email { get; set; }

        [Required]
        [StringLength(CommonUserConsts.MaxSexLength)]
        public string Sex { get; set; }

        [StringLength(CommonUserConsts.MaxRoleLength)]
        public string Role { get; set; }

        [Required]
        public string Phone { get; set; }

        [StringLength(CommonUserConsts.MaxDescriptionLength)]
        public string Description { get; set; }
    }
}
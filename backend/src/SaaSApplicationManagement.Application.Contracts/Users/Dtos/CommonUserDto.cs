namespace SaaSApplicationManagement.Users.Dtos
{
    public class CommonUserDto
    {
        public string Name { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Sex { get; set; }
        
        public string Avatar { get; set; }

        public string Roles { get; set; }

        public string Description { get; set; }

        public bool Online { get; set; }
    }
}
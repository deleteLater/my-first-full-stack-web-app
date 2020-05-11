using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace SaaSApplicationManagement
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication<SaaSApplicationManagementHttpApiModule>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            app.InitializeApplication();
        }
    }
}
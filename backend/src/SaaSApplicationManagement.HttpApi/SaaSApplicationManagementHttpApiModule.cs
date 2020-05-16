using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using SaaSApplicationManagement.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.AspNetCore.Authentication.JwtBearer;
using Volo.Abp.AspNetCore.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Autofac;
using Volo.Abp.Data;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Identity.AspNetCore;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy.ConfigurationStore;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.Settings;
using Volo.Abp.TenantManagement;
using Volo.Abp.Threading;

namespace SaaSApplicationManagement
{
    [DependsOn(
        typeof(SaaSApplicationManagementApplicationModule),
        typeof(SaaSApplicationManagementEntityFrameworkCoreModule),
        typeof(AbpAutofacModule),
        typeof(AbpAccountHttpApiModule),
        typeof(AbpIdentityHttpApiModule),
        typeof(AbpAspNetCoreMvcModule),
        typeof(AbpAspNetCoreMultiTenancyModule),
        typeof(AbpIdentityAspNetCoreModule),
        typeof(AbpPermissionManagementHttpApiModule),
        typeof(AbpTenantManagementHttpApiModule),
        typeof(AbpAspNetCoreAuthenticationJwtBearerModule),
        typeof(AbpFeatureManagementHttpApiModule)
    )]
    public class SaaSApplicationManagementHttpApiModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            ConfigureAuthentication(context.Services);
            ConfigureHttpClientFactory(context.Services);
            ConfigureSwaggerServices(context);
            
            var configuration = BuildConfiguration();
            
            Configure<AbpDefaultTenantStoreOptions>(configuration);
        }

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();

            app.UseCors("Default");
            app.UseAuthentication();
            app.UseJwtTokenMiddleware();
            app.UseAuditing();
            app.UseIdentityServer();
            app.UseRouting();
            app.UseMultiTenancy();
            app.UseMvcWithDefaultRouteAndArea();

            app.UseSwagger();
            app.UseSwaggerUI(options => { options.SwaggerEndpoint("/swagger/v1/swagger.json", "BookStore API"); });
        }

        public override void OnPostApplicationInitialization(ApplicationInitializationContext context)
        {
            AsyncHelper.RunSync(async () =>
            {
                using var scope = context.ServiceProvider.CreateScope();
                await scope.ServiceProvider.GetRequiredService<IDataSeeder>().SeedAsync();

                var defaultLanguage = scope.ServiceProvider.GetRequiredService<ISettingDefinitionManager>()
                    .Get(LocalizationSettingNames.DefaultLanguage);
                defaultLanguage.DefaultValue = "zh-Hans";
            });
        }

        private static void ConfigureSwaggerServices(ServiceConfigurationContext context)
        {
            context.Services.AddSwaggerGen(
                options =>
                {
                    options.SwaggerDoc("v1", new OpenApiInfo
                    {
                        Title = "SaaSApplicationManagement API",
                        Version = "v1",
                        Contact = new OpenApiContact
                        {
                            Email = "mikcczhang@gmail.com",
                            Name = "zhang",
                            Url = new Uri("https://github.com/deleteLater/my-first-full-stack-web-app")
                        },
                        Description = "Web Api For SaaSApplicationManagement",
                    });
                    options.DocInclusionPredicate((docName, description) => true);
                    options.IncludeXmlComments(Path.Combine(
                            AppContext.BaseDirectory,
                            "XmlDoc/HttpApi.xml"
                        )
                    );
                });
        }

        private static void ConfigureAuthentication(IServiceCollection services)
        {
            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", op =>
                {
                    op.Authority = services.GetConfiguration()["IdentityServer:AuthorityServer"];
                    op.Audience = services.GetConfiguration()["IdentityServer:ApiName"];
                    op.RequireHttpsMetadata = false;
                });
        }

        private static void ConfigureHttpClientFactory(IServiceCollection services)
        {
            services.AddHttpClient();
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();
        }
    }
}
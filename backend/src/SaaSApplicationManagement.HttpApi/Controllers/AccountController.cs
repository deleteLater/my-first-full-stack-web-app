using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SaaSApplicationManagement.Models;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;

namespace SaaSApplicationManagement.Controllers
{
    [ControllerName("Account")]
    [Route("api/account")]
    public class AccountController : AbpController
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;

        public AccountController(
            IHttpClientFactory clientFactory,
            IConfiguration configuration
        )
        {
            _clientFactory = clientFactory;
            _configuration = configuration;
        }
        
        /// <summary>
        /// user login
        /// </summary>
        [Route("login")]
        [HttpPost]
        public async Task<ActionResult> AccountLoginAsync([FromBody] LoginInput input)
        {
            var client = _clientFactory.CreateClient();

            // 从 IdentityServer 服务器请求 AccessToken。
            var tokenResponse = await client.RequestPasswordTokenAsync(
                new PasswordTokenRequest
                {
                    Address = await RetrieveTokenPointEndAsync(),
                    ClientId = _configuration["IdentityServer:WebClientId"],
                    ClientSecret = _configuration["IdentityServer:WebClientSecret"],
                    UserName = input.Name,
                    Password = input.Password,
                    Scope = _configuration["IdentityServer:ApiName"]
                }
            );

            return tokenResponse.IsError
                ? throw new UserFriendlyException(tokenResponse.ErrorDescription)
                : Content(tokenResponse.Json.ToString(), "application/json; encoding=utf-8");
        }
        
        private async Task<string> RetrieveTokenPointEndAsync()
        {
            var client = _clientFactory.CreateClient();

            // discover endpoints from metadata
            var disco = await client.GetDiscoveryDocumentAsync(_configuration["IdentityServer:AuthorityServer"]);
            if (disco.IsError)
            {
                throw new HttpRequestException($"请求 Identity Server 4 终端点失败。{disco.Error}");
            }

            return disco.TokenEndpoint;
        }
    }
}
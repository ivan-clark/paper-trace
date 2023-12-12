using API.Models;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly UserService _userService;

        public AccountController(AccountService accountService, UserService userService)
        {
            _accountService = accountService;
            _userService = userService;
        }

        [HttpPost]
        public JsonResponse Login(AccountModel model)
        {
            try
            {
                var user = _accountService.Login(model.Username!, model.Password!);

                if (user != null)
                {
                    var tokenString = _accountService.GenerateJSONWebToken(user.User?.Id ?? 0);
                    return new JsonResponse().Success().For(new { userId = user.Id, roleId = user?.User?.RoleId, token = tokenString });
                }
                else
                {
                    return new JsonResponse().Error().Msg("Username/Pasword is incorrect");
                }
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpPost]
        public JsonResponse Register(AccountModel model)
        {
            try
            {
                var account = _accountService.FindAccount(model.Username!);
                if (account == null)
                {
                    var result = _accountService.Register(model);
                    return new JsonResponse().Success().Msg("Successfully registered");
                }
                else
                {
                    return new JsonResponse().Error().Msg("Username already exists");
                }
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public JsonResponse Validate()
        {
            try
            {
                string authorizationHeader = HttpContext.Request.Headers["Authorization"]!;

                if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                    var handler = new JwtSecurityTokenHandler();
                    var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
                    var idClaim = jsonToken?.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

                    if (idClaim != null)
                    {
                        var id = int.Parse(idClaim);
                        var user = _userService.GetUserById(id);
                        return new JsonResponse().Success().For(new { userId = user?.Id , roleId = user?.Role?.Id });
                    }

                    return new JsonResponse().Error().Msg("UserId not found!");
                }

                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }
    }
}

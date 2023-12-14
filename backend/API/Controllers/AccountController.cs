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
                var header = HttpContext.Request.Headers["Authorization"].ToString();
                var id = _accountService.GetUserIdFromToken(header);
                var user = _userService.GetUserById(id);
                return new JsonResponse().Success().For(new { userId = user?.Id, roleId = user?.Role?.Id });
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }
    }
}

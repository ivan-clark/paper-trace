using API.Models;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public JsonResponse Login(AccountModel model)
        {
            try
            {
                var user = _accountService.Login(model.Username!, model.Password!);

                if (user != null)
                {
                    var tokenString = _accountService.GenerateJSONWebToken();
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
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }
    }
}

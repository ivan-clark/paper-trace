using API.Models;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AccountService _accountService;

        public UserController(UserService userService, AccountService accountService)
        {
            _userService = userService;
            _accountService = accountService;
        }

        [HttpGet]
        public JsonResponse GetUserById(int id)
        {
            try
            {
                return new JsonResponse().Success().For(_userService.GetUserById(id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpGet]
        public JsonResponse GetUsers()
        {
            try
            {
                return new JsonResponse().Success().For(_userService.GetUsers());
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpPost]
        public JsonResponse CreateUser(UserModel model)
        {
            try
            {
                if (model.SendEmail ?? false)
                {
                    var header = HttpContext.Request.Headers["Authorization"].ToString();
                    var id = _accountService.GetUserIdFromToken(header);
                    model.Id = id;
                }
                
                _userService.CreateUser(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse DeleteUser(UserModel model)
        {
            try
            {
                _userService.DeleteUser(model.Id);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse UpdateUser(UserModel model)
        {
            try
            {
                _userService.UpdateUser(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }
    }
}
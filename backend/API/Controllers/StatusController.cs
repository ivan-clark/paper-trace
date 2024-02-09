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
    public class StatusController : ControllerBase
    {
        private readonly StatusService _statusService;

        public StatusController(StatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpGet]
        public JsonResponse GetStatusById(StatusModel model)
        {
            try
            {
                return new JsonResponse().Success().For(_statusService.GetStatusById(model.Id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpGet]
        public JsonResponse GetStatuses()
        {
            try
            {
                return new JsonResponse().Success().For(_statusService.GetStatuses());
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpPost]
        public JsonResponse CreateStatus(StatusModel model)
        {
            try
            {
                _statusService.CreateStatus(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse DeleteStatus(StatusModel model)
        {
            try
            {
                _statusService.DeleteStatus(model.Id);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse UpdateStatus(StatusModel model)
        {
            try
            {
                _statusService.UpdateStatus(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }
    }
}

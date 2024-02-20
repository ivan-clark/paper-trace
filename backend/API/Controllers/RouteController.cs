using API.Models;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RouteController : ControllerBase
    {
        private readonly RouteService _routeService;

        public RouteController(RouteService routeService)
        {
            _routeService = routeService;
        }

        [HttpGet]
        public JsonResponse GetRouteById(int id)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GetRouteById(id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpGet]
        public JsonResponse GetRoutes()
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GetRoutes());
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpPost]
        public JsonResponse CreateRoute(RouteModel model)
        {
            try
            {
                _routeService.CreateRoute(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse DeleteRoute(int id)
        {
            try
            {
                _routeService.DeleteRoute(id);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse UpdateRoute(RouteModel model)
        {
            try
            {
                _routeService.UpdateRoute(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse GetIncoming(int id)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GetIncoming(id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpGet]
        public JsonResponse GetOutgoing(int id)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GetOutgoing(id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }
    }
}


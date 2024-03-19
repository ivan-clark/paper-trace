using API.Models;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[Authorize]
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

        [HttpPost]
        public JsonResponse ForTestingDeleteRoute()
        {
            try
            {
                _routeService.ForTestingDeleteRoute();
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse CreateUserTransmittal(UserTransmitalModel request)
        {
            try
            {
                _routeService.CreateUserTransmittal(request.DocumentModel, request.TransactionModel, request.RouteModel);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse MulitipleCompose(MulitipleComposeModel request)
        {
            try
            {
                _routeService.MultipleCompose(request.DocumentModel, request.TransactionModel, request.RouteModel);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse AcceptDocument(int RouteId, int recievebyId)
        {
            try
            {
                _routeService.AcceptDocument(RouteId, recievebyId);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpPost]
        public JsonResponse DeclineDocument(int RouteId, int recievebyId, string note)
        {
            try
            {
                _routeService.DeclineDocument(RouteId, recievebyId, note);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse ApproveDocument(int RouteId, int recievebyId)
        {
            try
            {
                _routeService.ApproveDocument(RouteId, recievebyId);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse TrashDocument(int RouteId)
        {
            try
            {
                _routeService.TrashDocument(RouteId);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse GetAcceptedDocuments(int id)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GetAcceptedDocuments(id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse TrackingDocument(string uniId)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.TrackingDocument(uniId));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse GenerateReport(int uniId)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GenerateReport(uniId));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse GetRouteByTransactionId(int id)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GetRouteByTransactionId(id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse GetOutGoingImproved(int senderId)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.GetOutGoingImproved(senderId));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse SearchEngineGetOutgoing(string subject, int senderId)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.SearchEngineGetOutgoing(subject, senderId));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpGet]
        public JsonResponse SearchEngineGeIncoming(string subject, int recepientId)
        {
            try
            {
                return new JsonResponse().Success().For(_routeService.SearchEngineGeIncoming(subject, recepientId));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }
    }
}


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
    public class DocumentController : ControllerBase
    {
        private readonly DocumentService _documentService;
        public DocumentController(DocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpGet]
        public JsonResponse GetDocumentById(int id)
        {
            try
            {
                return new JsonResponse().Success().For(_documentService.GetDocumentById(id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpGet]
        public JsonResponse GetDocuments()
        {
            try
            {
                return new JsonResponse().Success().For(_documentService.GetDocuments());
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpPost]
        public JsonResponse CreateDocument(DocumentModel model)
        {
            try
            {
                _documentService.CreateDocument(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse DeleteDocument(DocumentModel model)
        {
            try
            {
                _documentService.DeleteDocument(model.Id);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse UpdateDocument(DocumentModel model)
        {
            try
            {
                _documentService.UpdateDocument(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }
    }
}

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
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentService _departmentService;

        public DepartmentController(DepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public JsonResponse GetDepartments()
        {
            try
            {
                return new JsonResponse().Success().For(_departmentService.GetDepartments());
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }
    }
}

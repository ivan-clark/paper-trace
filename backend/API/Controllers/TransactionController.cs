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
    
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _transactionService;

        public TransactionController(TransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public JsonResponse GetTransactionById(TransactionModel model)
        {
            try
            {
                return new JsonResponse().Success().For(_transactionService.GetTransactionById(model.Id));
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpGet]
        public JsonResponse GetTransactions()
        {
            try
            {
                var transactions = _transactionService.GetTransactions();
                return new JsonResponse().Success().For(transactions);
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);
            }
        }

        [HttpPost]
        public JsonResponse CreateTransaction(TransactionModel model)
        {
            try
            {
                _transactionService.CreateTransaction(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse DeleteTransaction(TransactionModel model)
        {
            try
            {
                _transactionService.DeleteTransaction(model.Id);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }

        [HttpPost]
        public JsonResponse UpdateTransaction(TransactionModel model)
        {
            try
            {
                _transactionService.UpdateTransaction(model);
                return new JsonResponse().Success();
            }
            catch (Exception ex)
            {
                return new JsonResponse().Error().Msg(ex.Message);

            }
        }
    }
}

using API.Models;
using API.Repositories;
using API.Repositories.Data;
using DataAccess.Entities;

namespace API.Services
{
    public class TransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IStatusRepository _statusRepository;
        private readonly IDocumentRepository _documentRepository;

        public TransactionService(ITransactionRepository transactionRepository, IStatusRepository statusRepository, IDocumentRepository documentRepository)
        {
            _transactionRepository = transactionRepository;
            _statusRepository = statusRepository;
            _documentRepository = documentRepository;
        }

        public TransactionModel GetTransactionById(int id)
        {
            var transaction = _transactionRepository.GetTransactionById(id);

            return new TransactionModel
            {
                Id = transaction?.Id ?? 0,
                Restricted = transaction?.Restricted ?? false,
                Document = _documentRepository.GetDocumentById(transaction?.DocumentId ?? 0),
                Status = _statusRepository.GetStatusById(transaction?.StatusId ?? 0),
                CreatedDate = transaction?.CreatedDate
            };
        }

        public List<TransactionModel> GetTransactions()
        {
            var result = new List<TransactionModel>();
            var transactions = _transactionRepository.GetTransactions();

            foreach (var transaction in transactions)
            {
                result.Add(new TransactionModel
                {
                    Id = transaction.Id,
                    Restricted = transaction.Restricted,
                    Document = _documentRepository.GetDocumentById(transaction.Id),
                    Status = _statusRepository.GetStatusById(transaction?.StatusId ?? 0),
                    CreatedDate = transaction?.CreatedDate
                });
            }

            return result;
        }
        
        public void CreateTransaction(TransactionModel model)
        {
            model.Status = new DataAccess.Entities.Status { Id = 1 };
            _transactionRepository.CreateTransaction(model);
        }

        public void DeleteTransaction(int transactionId)
        {
            _transactionRepository.DeleteTransaction(transactionId);
        }

        public void UpdateTransaction(TransactionModel model)
        {
            _transactionRepository.UpdateTransaction(model);
        }
    }
}

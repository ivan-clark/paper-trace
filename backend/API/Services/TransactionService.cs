using API.Models;
using API.Repositories;
using API.Repositories.Data;

namespace API.Services
{
    public class TransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public TransactionService(ITransactionRepository transactionRepository, IUserRepository userRepository, IDepartmentRepository departmentRepository)
        {
            _transactionRepository = transactionRepository;
            _userRepository = userRepository;
            _departmentRepository = departmentRepository;
        }

        public void CreateTransaction(TransactionModel model)
        {
            model.Status = new DataAccess.Entities.Status { Id = 1 };
            _transactionRepository.CreateTransaction(model);
        }

        public List<TransactionModel> GetTransactions(int? senderId, int? recepientId, int? statusId)
        {
            var result = new List<TransactionModel>();
            var transactions = _transactionRepository.GetTransactions().Where(t => t.StatusId == statusId);

            if (senderId != null)
                transactions = transactions.Where(t => t.SenderId == senderId).ToList();

            if (recepientId != null)
                transactions = transactions.Where(t => t.RecepientId == recepientId).ToList();

            foreach (var transaction in transactions)
            {
                result.Add(new TransactionModel
                {
                    Id = transaction.Id,
                    Sender = _userRepository.GetUserById(transaction.SenderId ?? 0),
                    Recepient = _departmentRepository.GetDepartmentById(transaction.RecepientId ?? 0),
                    Subject = transaction.Subject,
                    Message = transaction.Message,
                    ModifiedDate = transaction.ModifiedDate
                });
            }

            return result;
        }
    }
}

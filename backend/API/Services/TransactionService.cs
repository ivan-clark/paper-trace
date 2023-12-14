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
            _transactionRepository.CreateTransaction(model);
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
                    Sender = _userRepository.GetUserById(transaction.SenderId ?? 0),
                    Recepient = _departmentRepository.GetDepartmentById(transaction.RecepientId ?? 0),
                    Subject = transaction.Subject,
                    Message = transaction.Message
                });
            }

            return result;
        }
    }
}

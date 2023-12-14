using API.Models;
using DataAccess.Entities;

namespace API.Repositories
{
    public interface ITransactionRepository
    {
        void CreateTransaction(TransactionModel model);
        List<Transaction> GetTransactions();
    }
}

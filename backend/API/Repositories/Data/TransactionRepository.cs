using API.Models;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly PapertracedbContext _dbcontext;
        public TransactionRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void CreateTransaction(TransactionModel model) {
            var transaction = new Transaction
            {
                DocumentId = model.Document?.Id,
                StatusId = model.Status?.Id,
                Restricted = model.Restricted,
                CreatedDate = DateTime.Now
            };

            _dbcontext.Transactions.Add(transaction);
            _dbcontext.SaveChanges();
        }

        public List<Transaction> GetTransactions()
        {
            return _dbcontext.Transactions.ToList();
        }
    }
}

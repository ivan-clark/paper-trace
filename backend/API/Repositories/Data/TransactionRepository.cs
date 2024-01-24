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

        public Transaction? GetTransactionById(int id) 
        {
            return _dbcontext.Transactions.FirstOrDefault(u => u.Id == id);
        }

        public void DeleteTransaction(int id) 
        {
            var transaction = new Transaction { Id = id };

            _dbcontext.Transactions.Attach(transaction);
            _dbcontext.Transactions.Remove(transaction);
            _dbcontext.SaveChanges();
        }

        public void UpdateTransaction(TransactionModel model)
        {
            var transaction = _dbcontext.Transactions.SingleOrDefault(u => u.Id == model.Id);

            if (transaction != null)
            {
                
                transaction.Restricted = model.Restricted;
                transaction.DocumentId = model.Document?.Id;
                transaction.StatusId = model.Status?.Id;
                transaction.CreatedDate = model.CreatedDate;

                _dbcontext.SaveChanges();
            }
        }
    }
}

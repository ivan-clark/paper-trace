using API.Models;
using DataAccess.Entities;

namespace API.Repositories.Data
{
    public class AccountRepository : IAccountRepository
    {
        private readonly PapertracedbContext _dbcontext;

        public AccountRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void CreateAccount(AccountModel accountModel)
        {
            var account = new Account
            {
                Username = accountModel.Username,
                Password = accountModel.Password,
                UserId = accountModel.User?.Id
            };

            _dbcontext.Accounts.Add(account);

            _dbcontext.SaveChanges();
        }

        public List<Account> GetAccounts()
        {
            return _dbcontext.Accounts.ToList();
        }
    }
}

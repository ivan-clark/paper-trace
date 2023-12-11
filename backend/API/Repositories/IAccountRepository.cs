using API.Models;
using DataAccess.Entities;

namespace API.Repositories
{
    public interface IAccountRepository
    {
        List<Account> GetAccounts();
        void CreateAccount(AccountModel accountModel);
    }
}

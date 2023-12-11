using API.Models;
using API.Repositories;
using DataAccess.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace API.Services
{
    public class AccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;
        public AccountService(IAccountRepository accountRepository, IUserRepository userRepository)
        {
            _accountRepository = accountRepository;
            _userRepository = userRepository;
        }

        public AccountModel? FindAccount(string username)
        {
            var account = _accountRepository.GetAccounts().FirstOrDefault(a => a.Username == username);
            return account != null ? new AccountModel { Id = account.Id, Username=account?.Username } : null;
        }

        public AccountModel? Login(string username, string password)
        {
            var account = _accountRepository.GetAccounts().FirstOrDefault(a => a.Username == username && a.Password == password);
            return account != null ? new AccountModel { Id = account.Id, Username = account?.Username, User =  _userRepository.GetUserById(account?.UserId ?? 0)} : null;
        }

        public bool Register(AccountModel model)
        {
            try
            {
                _accountRepository.CreateAccount(model);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public string GenerateJSONWebToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(expires: DateTime.Now.AddMinutes(120), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

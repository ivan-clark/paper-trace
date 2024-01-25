using API.Models;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public interface IUserRepository
    {
        User? GetUserById(int id);
        List<User> GetUsers();
        void DeleteUser(int userId);
        int CreateUser(UserModel model);
        void UpdateUser(UserModel model);
    }
}

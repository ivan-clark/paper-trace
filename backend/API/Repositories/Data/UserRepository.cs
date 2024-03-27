using API.Models;
using DataAccess.Entities;

namespace API.Repositories.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly PapertracedbContext _dbcontext;

        public UserRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public User? GetUserById(int id)
        {
            return _dbcontext.Users.FirstOrDefault(u => u.Id == id);
        }

        public List<User> GetUsersByIds(params int[] ids)
        {
            return _dbcontext.Users.Where(u => ids.Contains(u.Id)).ToList();
        }

        public List<User> GetUsers()
        {
            return _dbcontext.Users.ToList();
        }

        public void DeleteUser(int userId)
        {
            var user = new User { Id = userId };

            _dbcontext.Users.Attach(user);
            _dbcontext.Users.Remove(user);
            _dbcontext.SaveChanges();
        }

        public int CreateUser(UserModel model)
        {
            var user = new User
            {
                Firstname = model.FirstName,
                Lastname = model.LastName,
                Email = model.Email,
                DepartmentId = model.Department?.Id,
                RoleId = model.Role?.Id,
                CreatedDate = DateTime.Now
            };

            var result = _dbcontext.Users.Add(user);
            _dbcontext.SaveChanges();

            return result.Entity.Id;
        }

        public void UpdateUser(UserModel model)
        {
            var user = _dbcontext.Users.SingleOrDefault(u => u.Id == model.Id);

            if (user != null)
            {
                user.Firstname = model.FirstName;
                user.Lastname = model.LastName;
                user.Email = model.Email;
                user.RoleId = model.Role?.Id;
                user.DepartmentId = model.Department?.Id;

                _dbcontext.SaveChanges();
            }
        }
    }
}

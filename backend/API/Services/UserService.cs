using API.Models;
using API.Repositories;
using API.Repositories.Data;
using DataAccess.Entities;

namespace API.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public UserService(IUserRepository userRepository, IRoleRepository roleRepository, IDepartmentRepository departmentRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _departmentRepository = departmentRepository;
        }

        public UserModel GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);
            
            return new UserModel { 
                Id = user?.Id ?? 0,
                Role = new Role { Id = user?.RoleId ?? 0 }
            };
        }

        public List<UserModel> GetUsers()
        {
            var result = new List<UserModel>();
            var users = _userRepository.GetUsers();

            foreach (var user in users)
            {
                result.Add(new UserModel { 
                    Id=user.Id,
                    FirstName = user.Firstname,
                    LastName = user.Lastname,
                    Email = user.Email,
                    CreatedDate = user.CreatedDate,
                    Role = _roleRepository.GetRoleById(user.RoleId ?? 0),
                    Department = _departmentRepository.GetDepartmentById(user.DepartmentId ?? 0)
                });
            }

            return result;
        }

        public void CreateUser(UserModel model)
        {
            _userRepository.CreateUser(model);
        }
    }
}

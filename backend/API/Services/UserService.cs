using API.Models;
using API.Repositories;
using API.Repositories.Data;
using API.Utils;
using DataAccess.Entities;

namespace API.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IAccountRepository _accountRepository;

        public UserService(IUserRepository userRepository, IRoleRepository roleRepository, IDepartmentRepository departmentRepository, IAccountRepository accountRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _departmentRepository = departmentRepository;
            _accountRepository = accountRepository;
        }

        public UserModel GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);

            return new UserModel
            {
                Id = user?.Id ?? 0,
                FirstName = user?.Firstname,
                LastName = user?.Lastname,
                Email = user?.Email,
                CreatedDate = user?.CreatedDate,
                Role = _roleRepository.GetRoleById(user?.RoleId ?? 0),
                Department = _departmentRepository.GetDepartmentById(user?.DepartmentId ?? 0)
            };
        }

        public List<UserModel> GetUsersByIds(params int[] ids)
        {
            List<UserModel> users = new List<UserModel>();

            foreach (int id in ids)
            {
                var user = _userRepository.GetUserById(id);
                if (user != null)
                {
                    users.Add(new UserModel
                    {
                        Id = user.Id,
                        FirstName = user.Firstname,
                        LastName = user.Lastname,
                        Email = user.Email,
                        CreatedDate = user.CreatedDate,
                        Role = _roleRepository.GetRoleById(user?.RoleId ?? 0),
                        Department = _departmentRepository.GetDepartmentById(user?.DepartmentId ?? 0)
                    });
                }
            }

            return users;
        }

        public List<UserModel> GetUsers()
        {
            var result = new List<UserModel>();
            var users = _userRepository.GetUsers();

            foreach (var user in users)
            {
                result.Add(new UserModel
                {
                    Id = user.Id,
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
            var id = _userRepository.CreateUser(model);
            _accountRepository.CreateAccount(new AccountModel
            {
                Username = model.FirstName?.Replace(" ", ""),
                Password = model.LastName?.Replace(" ", ""),
                User = new User { Id = id}
            });

            if (model.SendEmail ?? false)
            {
                var user = _userRepository.GetUserById(model.Id);

                EmailSender.Send(new Email {
                    SenderEmail = user?.Email,
                    SenderName = $"{user?.Firstname} {user?.Lastname}",
                    ReceiverEmail = model.Email,
                    ReceiverName = $"{model?.FirstName} {model?.LastName}",
                    Subject = "Paper Trace account creation",
                    Message = "http://localhost:3000/"
                });
            }
        }

        public void DeleteUser(int userId) 
        {
            _userRepository.DeleteUser(userId);
        }

        public void UpdateUser(UserModel model)
        {
            _userRepository.UpdateUser(model);
        }
    }
}

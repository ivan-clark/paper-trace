using API.Models;
using API.Repositories;
using API.Repositories.Data;
using DataAccess.Entities;

namespace API.Services
{
    public class DepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IUserRepository _userRepository;

        public DepartmentService(IDepartmentRepository departmentRepository, IUserRepository userRepository)
        {
            _departmentRepository = departmentRepository;
            _userRepository = userRepository;
        }

        public DepartmentModel GetDepartmentById(int id)
        {
            var department = _departmentRepository.GetDepartmentById(id);

            return new DepartmentModel
            {
                Id = department?.Id ?? 0,
                Name = department?.Name,
                HeadId = _userRepository.GetUserById(department?.HeadId ?? 0),
                CreatedDate = department?.CreatedDate
            };
        }

        public List<DepartmentModel> GetDepartments()
        {
            var result = new List<DepartmentModel>();
            var departments = _departmentRepository.GetDepartments();

            foreach (var department in departments)
            {
                result.Add(new DepartmentModel
                {
                    Id = department.Id,
                    Name = department.Name,
                    HeadId = _userRepository.GetUserById(department.HeadId ?? 0),
                    CreatedDate = department.CreatedDate
                });
            }

            return result;
        }

        public void CreateDepartment(DepartmentModel model)
        {
            _departmentRepository.CreateDepartment(model);
        }

        public void DeleteDepartment(int departmentId)
        {
            _departmentRepository.DeleteDepartment(departmentId);
        }

        public void UpdateDepartment(DepartmentModel model)
        {
            _departmentRepository.UpdateDepartment(model);
        }
    }
}

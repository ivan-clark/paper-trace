using API.Models;
using DataAccess.Entities;

namespace API.Repositories
{
    public interface IDepartmentRepository
    {
        Department? GetDepartmentById(DepartmentModel model);
        List<Department> GetDepartments();
        void DeleteDepartment(int departmentId);
        void CreateDepartment(DepartmentModel model);
        void UpdateDepartment(DepartmentModel model);
    }
}

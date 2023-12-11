using DataAccess.Entities;

namespace API.Repositories
{
    public interface IDepartmentRepository
    {
        Department? GetDepartmentById(int id);
        List<Department> GetDepartments();
    }
}

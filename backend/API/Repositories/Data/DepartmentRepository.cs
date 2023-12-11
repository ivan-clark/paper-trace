using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly PapertracedbContext _dbcontext;

        public DepartmentRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public Department? GetDepartmentById(int id)
        {
            return _dbcontext.Departments.FirstOrDefault(d => d.Id == id);
        }

        public List<Department> GetDepartments()
        {
            return _dbcontext.Departments.ToList();
        }
    }
}

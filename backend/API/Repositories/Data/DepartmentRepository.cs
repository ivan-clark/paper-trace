using API.Models;
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

        public void DeleteDepartment(int departmentId)
        {
            var department = new Department { Id = departmentId };

            _dbcontext.Departments.Attach(department);
            _dbcontext.Departments.Remove(department);
            _dbcontext.SaveChanges();
        }

        public void CreateDepartment(DepartmentModel model)
        {
            var department = new Department
            {
                Name = model.Name,
                HeadId = model.HeadId?.Id,
                CreatedDate = DateTime.Now
            };

            _dbcontext.Departments.Add(department);
            _dbcontext.SaveChanges();
        }

        public void UpdateDepartment(DepartmentModel model)
        {
            var department = _dbcontext.Departments.SingleOrDefault(u => u.Id == model.Id);
           
            if (department != null)
            {
                department.Name = model.Name;
                department.HeadId = model.HeadId?.Id;
                department.CreatedDate = DateTime.Now;

                _dbcontext.SaveChanges();
            }
        }
    }
}

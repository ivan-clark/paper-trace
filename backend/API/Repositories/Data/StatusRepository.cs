using API.Models;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data
{
    public class StatusRepository : IStatusRepository
    {
        private readonly PapertracedbContext _dbcontext;

        public StatusRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public Status? GetStatusById(int id) 
        {
            return _dbcontext.Statuses.FirstOrDefault(u => u.Id == id);
        }

        public List<Status> GetStatuses()
        {
            return _dbcontext.Statuses.ToList();
        }

        public void DeleteStatus(int StatusID)
        {
            var status = new Status { Id = StatusID };

            _dbcontext.Statuses.Attach(status);
            _dbcontext.Statuses.Remove(status);
            _dbcontext.SaveChanges();
        }

        public void CreateStatus(StatusModel model)
        {
            var status = new Status
            {
                Name = model.Name,
                Description = model.Description
            };

            _dbcontext.Statuses.Add(status);
            _dbcontext.SaveChanges();
            
        }

        public void UpdateStatus(StatusModel model)
        {
            var status = _dbcontext.Statuses.SingleOrDefault(u => u.Id == model.Id);

            if (status != null)
            {
                status.Name = model.Name;
                status.Description = model.Description;
             
                _dbcontext.SaveChanges();
            }
        }

    }

}

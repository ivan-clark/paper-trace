using API.Models;
using DataAccess.Entities;

namespace API.Repositories
{
    public interface IStatusRepository
    {
        Status? GetStatusById(int id);
        List<Status> GetStatuses();
        void DeleteStatus(int StatusID);
        void CreateStatus(StatusModel model);
        void UpdateStatus(StatusModel model);
    }
}

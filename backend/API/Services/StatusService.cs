using API.Models;
using API.Repositories;
using API.Repositories.Data;
using API.Utils;
using DataAccess.Entities;

namespace API.Services
{
    public class StatusService
    {
        private readonly IStatusRepository _statusRepository;

        public StatusService(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        public StatusModel GetStatusById(int id)
        {
            var status = _statusRepository.GetStatusById(id);

            return new StatusModel
            {
                Id = status?.Id ?? 0,
                Name = status?.Name,
                Description = status?.Description
            };
        }

        public List<StatusModel> GetStatuses()
        {
            var result = new List<StatusModel>();
            var statuses = _statusRepository.GetStatuses();

            foreach (var status in statuses)
            {
                result.Add(new StatusModel
                {
                    Id = status.Id,
                    Name = status.Name,
                    Description = status.Description
                });
            }

            return result;
        }

        public void CreateStatus(StatusModel model)
        {
            _statusRepository.CreateStatus(model);
        }

        public void DeleteStatus(int statusID)
        {
            _statusRepository.DeleteStatus(statusID);
        }

        public void UpdateStatus(StatusModel model)
        {
            _statusRepository.UpdateStatus(model);
        }
    }
}

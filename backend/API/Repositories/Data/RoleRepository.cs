using DataAccess.Entities;

namespace API.Repositories.Data
{
    public class RoleRepository : IRoleRepository
    {
        private readonly PapertracedbContext _dbcontext;

        public RoleRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public Role? GetRoleById(int id)
        {
            return _dbcontext.Roles.FirstOrDefault(r => r.Id == id);
        }
    }
}

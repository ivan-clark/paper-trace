using DataAccess.Entities;

namespace API.Repositories
{
    public interface IRoleRepository
    {
        Role? GetRoleById(int id);
    }
}

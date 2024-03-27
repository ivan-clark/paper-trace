using DataAccess.Entities;


namespace API.Models
{
    public class ReportItemModel
    {
        public RouteModel? Route { get; set; }
        public DocumentModel? Document { get; set; }
    }
}

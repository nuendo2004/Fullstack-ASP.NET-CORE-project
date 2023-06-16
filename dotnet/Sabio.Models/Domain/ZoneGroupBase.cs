using System.Collections.Generic;

namespace Sabio.Models.Domain
{
    public class ZoneGroupBase
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public List<ZoneBase> Zone { get; set; }

        public List<LookUp> EntityType { get; set; }

        public int GroupAdminId { get; set; }

        public bool IsDeleted { get; set; }

    }
}
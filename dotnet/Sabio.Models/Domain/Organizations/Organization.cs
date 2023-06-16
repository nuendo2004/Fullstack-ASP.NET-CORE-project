using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Organizations
{
    public class Organization : BaseOrganization
    {
        public string Description { get; set; }
        public string LogoUrl { get; set; }
        public string BusinessPhone { get; set; }
        public int PrimaryLocationId { get; set; }

        public int LocationTypeId { get; set; }
        public string LocationName { get; set;}
        public string LocationLineOne { get; set; }
        public string LocationLineTwo { get; set; }
        public string LocationCity { get; set; }
        public string LocationZip { get; set; }
        public int LocationStateId { get; set; }
        public double LocationLatitude { get; set; }
        public double LocationLongitude { get; set; }

        public string SiteUrl { get; set; }
        public bool IsDeleted { get; set; }
    }


}




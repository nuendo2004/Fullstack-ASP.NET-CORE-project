using Sabio.Models.Domain.Surveys.Details;
using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Instances
{
    public class SurveyInstanceDetails
    {
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public BaseUser CreatedBy { get; set; }

        public SurveyInstanceDetailsAnswer Survey { get; set; }
    }
}

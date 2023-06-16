using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Instances
{
    public class SurveysInstance
    {
        public int Id { get; set; }

        public BaseSurvey Survey { get; set; }

        public int AnswerId { get; set; }

        public int UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}

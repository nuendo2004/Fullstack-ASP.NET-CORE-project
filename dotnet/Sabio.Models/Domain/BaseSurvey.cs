﻿using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class BaseSurvey
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<BaseUser> AnsweredBy { get; set; }
    }
}

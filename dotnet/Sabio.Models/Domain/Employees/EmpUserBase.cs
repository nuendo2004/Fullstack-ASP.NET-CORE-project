﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Employees
{
    public class EmpUserBase 
    {
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }    

        public string Mi { get; set; }

        public string AvatarUrl { get; set; }

        public string Email { get; set; }
        
    }
}

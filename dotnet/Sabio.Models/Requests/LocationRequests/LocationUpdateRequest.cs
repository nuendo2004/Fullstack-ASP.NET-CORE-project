﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.LocationRequests
{
    public class LocationUpdateRequest : LocationAddRequest , IModelIdentifier
    {
        public int Id { get; set; }
    }
}

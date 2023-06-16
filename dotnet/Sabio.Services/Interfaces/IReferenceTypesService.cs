using Sabio.Models;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IReferenceTypesService
    {
        List<ReferenceType> SelectAll();
    }
}
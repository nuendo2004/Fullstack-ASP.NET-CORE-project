using Sabio.Models.Domain;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IZoneActorService
    {
        List<Zone> getAllZones();
    }
}
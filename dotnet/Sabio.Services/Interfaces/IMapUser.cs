using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IMapUser
    {
        BaseUser MapSingleUser(IDataReader reader, ref int index);
    }
}

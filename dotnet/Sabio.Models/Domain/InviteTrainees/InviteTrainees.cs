using Sabio.Models.Domain.Organizations;
using Sabio.Models.Domain.TrainingUnits;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.InviteTrainees
{
    public class InviteTrainees
    {
        public int Id { get; set; }
        public int TrainingUnitId { get; set; }
        public string Token { get; set; }
        public string FirstName { get; set; }
        public string lastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
    }
}

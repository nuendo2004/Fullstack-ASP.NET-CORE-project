using Microsoft.AspNetCore.Mvc;
using Sabio.Models.Domain;
using Sabio.Models.Requests.ExternalLink;
using System.Collections.Generic;
using System.Reflection;

namespace Sabio.Services.Interfaces
{
    public interface IExternalLinkService
    {
        List<ExternalLink> GetByCreated(int id);
        void DeleteById(int Id);

        void Update(ExternalLinkUpdateRequest model, int userId, int Id);
        int Add(ExternalLinkAddRequest model, int userId);
        void AddByBatch(ExternalLinkBatchAddRequest model, int userId);
    }
}

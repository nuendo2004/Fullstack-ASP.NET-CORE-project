using Microsoft.AspNetCore.Http;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Files;
using Sabio.Models.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IFilesService
    {
        public List<File> GetAll();
        public Paged<File> GetByDeletedAdmin(int pageIndex, int pageSize);
        public Paged<File> SearchPagination(int pageIndex, int pageSize, string query, int userId);
        public void Delete(int id);
        int Add(FileAddRequest model, int userId);
        public Task<List<FileUpload>> UploadFileAsync(IFormFile[] files,int userId);
        Paged<File> GetAllPaginated(int pageIndex, int pageSize);
        Paged<File> GetByCreatedBy(int pageIndex, int pageSize, int id);
        Paged<File> GetByFileTypeId(int pageIndex, int pageSize, int fileTypeId);
        void UpdateIsDeleted(int id);
        public Paged<File> GetByDeleted(int pageIndex, int pageSize, int userId);

    }

}
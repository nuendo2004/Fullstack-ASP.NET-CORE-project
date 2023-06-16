using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Files;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class FilesService : IFilesService
    {
        private AWSStorage _awsStorage = null;
        private IDataProvider _data = null;
        public FilesService(IOptions<AWSStorage> awsStorage, IDataProvider data)
        {
            _awsStorage = awsStorage.Value;
            _data = data;
        }

        enum typeFile : long
        {
            Image = 1,
            Pdf = 2
        };
        public List<File> GetAll()
        {
            List<File> list = null;
            string procName = "[dbo].[Files_SelectAllV2]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   int startingIndex = 0;
                   File file = MapSingleFile(reader, ref startingIndex);

                   if (list == null)
                   {
                       list = new List<File>();
                   }
                   list.Add(file);
               });

            return list;
        }

        public Paged<File> GetByDeletedAdmin(int pageIndex, int pageSize)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Files_Select_Deleted]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                File file = MapSingleFile(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<File>();
                }
                list.Add(file);
            });
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<File> SearchPagination(int pageIndex, int pageSize, string query, int userId)
        {
            string procName = "[dbo].[Files_SearchByFileName]";
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;
            _data.ExecuteCmd(
                procName, inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@userid", userId);
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Query", query);
                },

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    File file = MapSingleFile(reader, ref index);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (list == null)
                    {
                        list = new List<File>();
                    }
                    list.Add(file);
                });
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Files_Delete]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, returnParameters: null
            );
        }
        public async Task<List<FileUpload>> UploadFileAsync(IFormFile[] files, int userId)
        {
            List<FileUpload> fileNames = null;  
            var _s3Client = new AmazonS3Client(_awsStorage.AccessKey, _awsStorage.Secret, RegionEndpoint.USWest2);
            var fileTransferUtility = new TransferUtility(_s3Client);
            {
                if (files.Length > 0) { 
                    fileNames = new List<FileUpload>();
                    foreach (IFormFile file in files)
                    {
                            FileUpload newFile = new FileUpload();
                            string key = Guid.NewGuid().ToString();
                            string KeyName = $"immersed{key}/{file.FileName}";
                            var fileTransferUtilityRequest = new TransferUtilityUploadRequest
                            {
                                BucketName = "sabio-training",
                                Key = KeyName,
                                InputStream = file.OpenReadStream()
                            };
                            await fileTransferUtility.UploadAsync(fileTransferUtilityRequest);
                            string url = $"{_awsStorage.Domain}{KeyName}";
                            int id = 0;
                            string procName = "[dbo].[Files_Insert]";
                            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
                            {
                                col.AddWithValue("@Name", file.FileName);
                                col.AddWithValue("@Url", url);
                               if (file.FileName.Contains("pdf"))
                                {
                                col.AddWithValue("@FileTypeId", typeFile.Pdf);
                                }
                                else
                                {
                                    col.AddWithValue("@FileTypeId", typeFile.Image);
                                }
                                col.AddWithValue("@CreatedBy", userId);

                                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                                idOut.Direction = System.Data.ParameterDirection.Output;
                                col.Add(idOut);
                            }, returnParameters: delegate (SqlParameterCollection returnCollection)
                            {
                                object oId = returnCollection["@Id"].Value;
                                int.TryParse(oId.ToString(), out id);
                            });
                            newFile.Id = id;
                            newFile.Url = url;
                            fileNames.Add(newFile);
                    }                 
                }
            }
            return fileNames;
        }
        public int Add(FileAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Files_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, userId, col);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = System.Data.ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }
        public Paged<File> GetAllPaginated(int pageIndex, int pageSize)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Files_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                File file = MapSingleFile(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<File>();
                }
                list.Add(file);
            });
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<File> GetByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Files_SelectByCreatedBy]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@userid", userId);
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                File file = MapSingleFile(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<File>();
                }
                list.Add(file);
            });
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void UpdateIsDeleted(int id)
        {
            string procName = "[dbo].[Files_Update_IsDeleted_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            }, returnParameters: null);
        }
        public Paged<File> GetByFileTypeId(int pageIndex, int pageSize, int fileTypeId)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Files_SelectByFileTypeId]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", fileTypeId);
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                File file = MapSingleFile(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<File>();
                }
                list.Add(file);
            });
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<File> GetByDeleted(int pageIndex, int pageSize, int userId)
        {
            Paged<File> pagedList = null;
            List<File> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Files_SelectByIsDeleted]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@userid", userId);
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                File file = MapSingleFile(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<File>();
                }
                list.Add(file);
            });
            if (list != null)
            {
                pagedList = new Paged<File>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        private static void AddCommonParams(FileAddRequest model, int userId, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Url", model.Url);
            col.AddWithValue("@FileTypeId", model.FileTypeId);
            col.AddWithValue("@CreatedBy", userId);
        }
        private static File MapSingleFile(IDataReader reader, ref int startingIndex)
        {

            File file = new File();
            file.FileType = new LookUp();
            file.Id = reader.GetSafeInt32(startingIndex++);
            file.Name = reader.GetSafeString(startingIndex++);
            file.Url = reader.GetSafeString(startingIndex++);
            file.FileType.Id = reader.GetSafeInt32(startingIndex++);
            file.FileType.Name = reader.GetSafeString(startingIndex++);
            file.CreatedBy = reader.GetSafeInt32(startingIndex++);
            file.DateCreated = reader.GetSafeDateTime(startingIndex++);
            file.IsDeleted = reader.GetSafeBool(startingIndex++);
            return file;
        }
    }
    }
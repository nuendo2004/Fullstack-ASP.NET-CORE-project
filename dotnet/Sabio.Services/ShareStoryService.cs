using Amazon.Runtime.CredentialManagement;
using Microsoft.Extensions.Hosting;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.ShareStory;
using Sabio.Models.Requests.ShareStory;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class ShareStoryService : IShareStoryService
    {
        IDataProvider data = null;

        public ShareStoryService(IDataProvider data)
        {
            this.data = data;
        }

        public ShareStory GetById(int Id)
        {
            string procName = "[dbo].[ShareStory_SelectById]";
            ShareStory Story = null;
            data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", Id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Story = MapSingleStory(reader,ref startingIndex);
                

            });
            return Story;
        }

        public Paged<ShareStory> GetPaginated(int pageIndex, int pageSize,  bool isApproved)
        {
            Paged<ShareStory> pagedResult = null;

            List<ShareStory> result = null;

            int totalCount = 0;

            data.ExecuteCmd(
                "[dbo].[ShareStory_SelectAll]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@IsApproved", isApproved);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    ShareStory story = MapSingleStory(reader,ref startingIndex);
                   

                  
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<ShareStory>();
                    }

                    result.Add(story);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<ShareStory>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
      

        private static ShareStory MapSingleStory(IDataReader reader,ref int startingIndex)
        {
            
            ShareStory story = new ShareStory();


            story.Id = reader.GetSafeInt32(startingIndex++);
            story.Title = reader.GetSafeString(startingIndex++);
            story.Email = reader.GetSafeString(startingIndex++);
            story.Story = reader.GetSafeString(startingIndex++);
            story.CreatedByFirstName = reader.GetSafeString(startingIndex++);
            story.CreatedByLastName = reader.GetSafeString(startingIndex++);
            story.IsApproved = reader.GetSafeBool(startingIndex++);
            story.ApprovedBy = reader.GetSafeInt32(startingIndex++);
            story.Files = reader.DeserializeObject<List<ShareStories>>(startingIndex++);
            story.DateCreated=reader.GetSafeDateTime(startingIndex++);
            story.DateModified=reader.GetSafeDateTime(startingIndex++);
           

            return story;
        }
     
        
        public int AddStories( ShareStoryAddRequest mod, int userId )
        {

            int id = 0;
            DataTable storiesDataTable = null;

            if (mod.StoryFiles != null)
            {
                storiesDataTable = MapStoriesToTable(mod.StoryFiles);


            }


            data.ExecuteNonQuery("[dbo].[ShareStory_Insert]",
              inputParamMapper: delegate (SqlParameterCollection sqlParams)
              {

                  SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                  idOut.Direction = ParameterDirection.Output;

                  sqlParams.Add(idOut);

                  AddCommonParams(mod, userId, sqlParams, storiesDataTable);

              });

            return id;
        }

        

        public void UpdateStories(ShareStoryUpdateRequest mod, int userId)
        {
            
            DataTable storiesDataTable = null;

            if (mod.StoryFiles != null)
            {
                storiesDataTable = MapStoriesToTable(mod.StoryFiles);
            }
            data.ExecuteNonQuery("[dbo].[ShareStory_Update]",
              inputParamMapper: delegate (SqlParameterCollection sqlParams)
              {
                  AddCommonParams(mod, userId, sqlParams, storiesDataTable);

                  sqlParams.AddWithValue("@Id", mod.Id);
              }, returnParameters: null);

        }

        public void UpdateApproval(ShareStoryUpdateApprovalRequest mod,int userId)
        {

          
            data.ExecuteNonQuery("[dbo].[ShareStory_Update_Approval]",
              inputParamMapper: delegate (SqlParameterCollection sqlParams)
              {
                
                  sqlParams.AddWithValue("@IsApproved", mod.IsApproved);
                  sqlParams.AddWithValue("@ApprovedBy", userId);


                  sqlParams.AddWithValue("@Id", mod.Id);
              }, returnParameters: null);

        }

        private static void AddCommonParams(ShareStoryAddRequest mod, int userId, SqlParameterCollection sqlParams, DataTable myParamValue)
        {
            sqlParams.AddWithValue("@Title", mod.Title);
            sqlParams.AddWithValue("@Email", mod.Email);
            sqlParams.AddWithValue("@Story", mod.Story);
            sqlParams.AddWithValue("@CreatedBy", userId);
            sqlParams.AddWithValue("@IsApproved", mod.IsApproved);
            sqlParams.AddWithValue("@ApprovedBy", userId);
            sqlParams.AddWithValue("@batchStories", myParamValue);
        }
        private DataTable MapStoriesToTable(List<int>StoryFiles)
        {
            
            DataTable dt = new DataTable();


           
            dt.Columns.Add("FileId", typeof(int));


            foreach (int File in StoryFiles )
            {
               
                DataRow dr = dt.NewRow();
                int startingIndex = 0;
              

              
                dr.SetField(startingIndex++, File);



                dt.Rows.Add(dr);
            }


            return dt;

        }
        public void Delete(int Id)
        {
            string procName = "[dbo].[ShareStory_Delete]";
            data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                col.AddWithValue("@Id", Id);

            }
            );


        }

        public Paged<ShareStory> SearchPaginated(int pageIndex, int pageSize, string query)
        {
            Paged<ShareStory> pagedResult = null;

            List<ShareStory> result = null;

            int totalCount = 0;

            data.ExecuteCmd(
                "[dbo].[ShareStory_Search]",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                    paramCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
           
                {
                    int startingIndex = 0;
                    ShareStory story = MapSingleStory(reader, ref startingIndex);
                   


                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<ShareStory>();
                    }

                    result.Add(story);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<ShareStory>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
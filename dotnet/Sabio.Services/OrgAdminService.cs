using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Blogs;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class OrgAdminService : IOrgAdminService
    {
        private IDataProvider _dataProvider;

        public OrgAdminService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public OrgAdminData GetAdminDataFromOrgId(int orgId, int numberSelection)
        {
            string procName = "[dbo].[Organization_GetAdminData]";
            OrgAdminData orgAdminData = null;
            List<Blog> blogs = null;
            List<TrainingSchedule> trainingSchedules = null;
            int startingIndex = 0;

            _dataProvider.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@OrganizationId", orgId);
                    col.AddWithValue("@NumberSelection", numberSelection);
                },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                if (set == 0)
                {
                    orgAdminData = new OrgAdminData();
                    orgAdminData.EmployeeCount = reader.GetSafeInt32(0);
                }
                if (set == 1) 
                {
                    TrainingSchedule trainingSchedule = MapTrainingSchedule(reader, ref startingIndex);

                    if (trainingSchedules == null)
                    {
                        trainingSchedules= new List<TrainingSchedule>();
                    }
                    trainingSchedules.Add(trainingSchedule);
                    orgAdminData.Trainings = trainingSchedules;
                }
                if (set == 2)
                {
                    Blog blog = MapSingleBlog(reader, ref startingIndex);

                    if (blogs == null)
                    {
                        blogs = new List<Blog>();
                    }
                    blogs.Add(blog);
                    orgAdminData.Blogs = blogs;
                }
                if (set == 3)
                {
                    orgAdminData.TraineeCount = reader.GetSafeInt32(0);
                }
            }
            );
            return orgAdminData;
        }

        private static Blog MapSingleBlog(IDataReader reader, ref int startingIndex)
        {
            Blog blog = new Blog();

            startingIndex = 0;

            blog.Id = reader.GetSafeInt32(startingIndex++);
            blog.BlogType = reader.GetSafeString(startingIndex++);
            blog.Author = MapSingleUser(reader, ref startingIndex);
            blog.Title = reader.GetSafeString(startingIndex++);
            blog.Subject = reader.GetSafeString(startingIndex++);
            blog.Content = reader.GetSafeString(startingIndex++);
            blog.ImageUrl = reader.GetSafeString(startingIndex++);
            blog.IsApproved = reader.GetSafeBool(startingIndex++);
            blog.ApprovedBy= MapSingleUser(reader, ref startingIndex);
            blog.IsPublished = reader.GetSafeBool(startingIndex++);
            blog.DatePublished = reader.GetSafeDateTime(startingIndex++);
            blog.DateCreated = reader.GetSafeDateTime(startingIndex++);
            blog.DateModified = reader.GetSafeDateTime(startingIndex++);

            return blog;
        }

        private static UserNameAvatar MapSingleUser(IDataReader reader, ref int startingIndex)
        {
            UserNameAvatar user = new UserNameAvatar();

            user.FirstName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.AvatarUrl = reader.GetSafeString(startingIndex++);

            return user;
        }

        private static TrainingSchedule MapTrainingSchedule(IDataReader reader, ref int startingIndex)
        {
            TrainingSchedule trainingSchedule = new TrainingSchedule();
            startingIndex = 0;

            trainingSchedule.Id = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.Name = reader.GetSafeString(startingIndex++);
            trainingSchedule.TrainingUnitId = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.DaysOfWeekId = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.StartTime = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.EndTime = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.StartDate = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.EndDate = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.IsDeleted = reader.GetSafeBool(startingIndex++);
            trainingSchedule.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.CreatedBy = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            trainingSchedule.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
            return trainingSchedule;
        }
    }
}

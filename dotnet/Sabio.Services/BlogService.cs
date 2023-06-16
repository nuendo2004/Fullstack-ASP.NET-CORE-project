using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Blogs;
using Sabio.Models.Requests.Blogs;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class BlogService : IBlogService
    {
        IDataProvider _data = null;

        public BlogService(IDataProvider data)
        {
            _data = data;
        }



        public Paged<Blog> GetAll(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted)
        {
            string procName = "dbo.Blogs_SelectAll";

            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                    coll.AddWithValue("@IsApproved", isApproved);
                    coll.AddWithValue("@IsPublished", isPublished);
                    coll.AddWithValue("@IsDeleted", isDeleted);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Blog blog = MapSingleBlog(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<Blog>();
                    }
                    list.Add(blog);
                });
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Blog> GetByType(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted, int blogTypeId)
        {
            string procName = "dbo.Blogs_Select_ByBlogCategory";

            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                    coll.AddWithValue("@IsApproved", isApproved);
                    coll.AddWithValue("@IsPublished", isPublished);
                    coll.AddWithValue("@IsDeleted", isDeleted);
                    coll.AddWithValue("@BlogTypeId", blogTypeId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Blog blog = MapSingleBlog(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<Blog>();
                    }
                    list.Add(blog);
                });
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Blog> GetByAuthorId(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted, int authorId)
        {
            string procName = "[dbo].[Blogs_Select_ByAuthorId]";

            Paged<Blog> pagedList = null;
            List<Blog> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                    coll.AddWithValue("@IsApproved", isApproved);
                    coll.AddWithValue("@IsPublished", isPublished);
                    coll.AddWithValue("@IsDeleted", isDeleted);
                    coll.AddWithValue("@AuthorId", authorId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Blog blog = MapSingleBlog(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<Blog>();
                    }
                    list.Add(blog);
                });
            if (list != null)
            {
                pagedList = new Paged<Blog>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Blog GetById(int id)
        {
            string procName = "[dbo].[Blogs_Select_ById]";

            Blog blog = null;
            int i = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    blog = MapSingleBlog(reader, ref i);
                });
            return blog;
        }


        public int Create(BlogAddRequest model, int authId)

        {
            string procName = "[dbo].[Blogs_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(model, coll);

                    coll.AddWithValue("@AuthorId", authId);


                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnColl)
                {
                    object idObj = returnColl["@Id"].Value;

                    int.TryParse(idObj.ToString(), out id);
                }
                );
            return id;
        }

        public void Update(BlogUpdateRequest model)
        {
            string procName = "dbo.Blogs_Update";

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", model.Id);
                    AddCommonParams(model, coll);
                },
                returnParameters: null
                );
        }

        public void UpdateApproval(int id, bool isApproved, int userId)
        {
            string procName = "dbo.Blogs_UpdateApproval";

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                    coll.AddWithValue("@IsApproved", isApproved);
                    coll.AddWithValue("@ApprovedBy", userId);
                },
                returnParameters: null
                );
        }

        public void Delete(int id, int userId)
        {
            string procName = "dbo.Blogs_Delete";

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                    coll.AddWithValue("@DeletedBy", userId);
                },
                returnParameters: null);
        }

        private static Blog MapSingleBlog(IDataReader reader, ref int i)
        {
            Blog blog = new Blog();

            i = 0;

            blog.Id = reader.GetSafeInt32(i++);
            blog.BlogType = reader.GetSafeString(i++);
            blog.Author = MapSingleUser(reader, ref i);
            blog.Title = reader.GetSafeString(i++);
            blog.Subject = reader.GetSafeString(i++);
            blog.Content = reader.GetSafeString(i++);
            blog.ImageUrl = reader.GetSafeString(i++);
            blog.IsApproved = reader.GetSafeBool(i++);
            blog.ApprovedBy = MapSingleUser(reader, ref i);
            blog.IsPublished = reader.GetSafeBool(i++);
            blog.DatePublished = reader.GetSafeDateTime(i++);
            blog.DateCreated = reader.GetSafeDateTime(i++);
            blog.DateModified = reader.GetSafeDateTime(i++);

            return blog;
        }

        private static UserNameAvatar MapSingleUser(IDataReader reader, ref int i)
        {
            UserNameAvatar user = new UserNameAvatar();

            user.FirstName = reader.GetSafeString(i++);
            user.Mi = reader.GetSafeString(i++);
            user.LastName = reader.GetSafeString(i++);
            user.AvatarUrl = reader.GetSafeString(i++);

            return user;
        }

        private static void AddCommonParams(BlogAddRequest model, SqlParameterCollection coll)
        {
            coll.AddWithValue("@BlogTypeId", model.BlogTypeId);
            coll.AddWithValue("@Title", model.Title);
            coll.AddWithValue("@Subject", model.Subject);
            coll.AddWithValue("@Content", model.Content);
            coll.AddWithValue("@ImageUrl", model.ImageUrl);
            coll.AddWithValue("@IsPublished", model.IsPublished);
            coll.AddWithValue("@DatePublished", model.DatePublished);
        }

        private static void GetCommonParams(BlogGetRequest model, SqlParameterCollection coll)
        {
            coll.AddWithValue("@PageIndex", model.PageIndex);
            coll.AddWithValue("@PageSize", model.PageSize);
            coll.AddWithValue("@IsApproved", model.IsApproved);
            coll.AddWithValue("@IsPublished", model.IsPublished);
            coll.AddWithValue("@IsDeleted", model.IsDeleted);
        }

    }
}
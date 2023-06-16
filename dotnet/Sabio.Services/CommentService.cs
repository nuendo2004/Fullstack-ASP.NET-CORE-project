using Sabio.Models.Domain;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.Comments;
using Sabio.Models.Requests.Comments;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq;

namespace Sabio.Services
{
    public class CommentService : ICommentService
    {
        IDataProvider _data = null;
        IMapUser _mapUser = null;
        public CommentService(IDataProvider data, IMapUser mapUser)
        {
            _data = data;
            _mapUser = mapUser;
        }
        public List<Comment> GetByEntityId(int entityId, int entityTypeId)
        {
            List<Comment> comments = null;

            string procName = "dbo.Comments_Select_ByEntityId";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@EntityId", entityId);
                    paramCollection.AddWithValue("@EntityTypeId", entityTypeId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Comment comment = MapComment(reader, ref startingIndex);

                    if (comments == null)
                    {
                        comments = new List<Comment>();
                    }
                    comments.Add(comment);
                });
            return comments;
        }
        public List<Comment> GetNestedComments(int entityId, int entityTypeId)
        {
            List<Comment> comments = GetByEntityId(entityId, entityTypeId);
            List<Comment> outputList = new List<Comment>();
            Dictionary<int, Comment> _dictTopLevel = new Dictionary<int, Comment>();

            if (comments != null)
            {
                foreach (Comment comment in comments)
                {
                    if (comment.ParentId == 0)
                    {
                        _dictTopLevel.Add(comment.Id, comment);
                    }
                    if (comment.ParentId != 0)
                    {
                        foreach (Comment comment1 in comments)
                        {
                            if (comment.Id == comment1.ParentId)
                            {
                                comment.Replies ??= new List<Comment>();
                                comment.Replies.Add(comment1);
                            }
                        }
                        if (_dictTopLevel.ContainsKey(comment.ParentId))
                        {
                            _dictTopLevel[comment.ParentId].Replies ??= new List<Comment>();
                            _dictTopLevel[comment.ParentId].Replies.Add(comment);
                            _dictTopLevel[comment.ParentId].Replies.Reverse();
                        }
                    }
                }
            }
            outputList = _dictTopLevel.Select(item => item.Value).ToList();
            outputList.Reverse();
            return outputList;
        }

        public int Add(CommentAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Comments_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    CommonParams(model, col);
                    col.AddWithValue("@CreatedBy", userId);
                    col.AddWithValue("@ParentId", model.ParentId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                    Console.WriteLine("");
                });
            return id;
        }
        public void Update(CommentUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Comments_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    CommonParams(model, col);
                    col.AddWithValue("@CreatedBy", userId);

                },
                returnParameters: null);
        }
        private static void CommonParams(CommentAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Subject", model.Subject);
            col.AddWithValue("@Text", model.Text);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@EntityId", model.EntityId);
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Comments_Update_IsDeleted_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            });
        }

        public List<Comment> SelectByCreatedBy(int UserId)
        {
            List<Comment> comments = null;

            string procName = "[dbo].[Comments_Select_ByCreatedBy]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@UserId", UserId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Comment comment = MapComment(reader, ref startingIndex);

                    if (comments == null)
                    {
                        comments = new List<Comment>();
                    }
                    comments.Add(comment);
                });

            return comments;
        }
        public Comment MapComment(IDataReader reader, ref int startingIndex)
        {
            Comment comment = new Comment();

            comment.EntityType = new LookUp();

            comment.Id = reader.GetSafeInt32(startingIndex++);
            comment.Subject = reader.GetSafeString(startingIndex++);
            comment.Text = reader.GetSafeString(startingIndex++);
            comment.ParentId = reader.GetSafeInt32(startingIndex++);
            comment.EntityType.Id = reader.GetSafeInt32(startingIndex++);
            comment.EntityType.Name = reader.GetSafeString(startingIndex++);
            comment.EntityId = reader.GetSafeInt32(startingIndex++);
            comment.DateCreated = reader.GetSafeDateTime(startingIndex++);
            comment.DateModified = reader.GetSafeDateTime(startingIndex++);
            comment.CreatedBy = _mapUser.MapSingleUser(reader, ref startingIndex);

            return comment;
        }
    }
}
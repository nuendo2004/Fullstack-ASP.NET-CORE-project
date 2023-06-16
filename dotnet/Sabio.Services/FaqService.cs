using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Faqs;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class FaqService : IFaqService
    {
        IDataProvider _data = null;

        public FaqService(IDataProvider data)
        {
            _data = data;
        }

        public List<Faqs> GetAllFaqs()
        {
            List<Faqs> list = null;

            string procName = "[dbo].[FAQs_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Faqs faqs = FaqMapper(reader);

                    if (list == null)
                    {
                        list = new List<Faqs>();
                    }
                    list.Add(faqs);
                });
            return list;

        }

        public Faqs GetFaqByCatId(int CategoryId)
        {
            Faqs model = null;

            _data.ExecuteCmd(
                "[dbo].[FAQs_SelectByCategoryId]",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@CategoryId", CategoryId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = FaqMapper(reader);
                }
                );
            return model;
        }

        public int FaqAdd(FaqAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[FAQs_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);                

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            }
            , returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oldId = returnCollection["@Id"].Value;

                int.TryParse(oldId.ToString(), out id);
            });
            return id;
        }

        public void FaqUpdate(FaqUpdateRequest model, int userId)
        {
            string procName = "[dbo].[FAQs_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);
                },
                    returnParameters: null);
        }

        public void FaqDeleteById(int Id)
        {
            string procName = "[dbo].[FAQs_DeleteById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", Id);
                },
                returnParameters: null);
        }

        private static Faqs FaqMapper(IDataReader reader)
        {
            Faqs model = new Faqs();
            model.Category = new LookUp();

            int index = 0;
            model.Id = reader.GetSafeInt32(index++);
            model.Question = reader.GetSafeString(index++);
            model.Answer = reader.GetSafeString(index++);
            model.Category.Id = reader.GetSafeInt32(index++);
            model.Category.Name = reader.GetSafeString(index++);
            model.SortOrder = reader.GetSafeInt32(index++);

            return model;
        }

        private static void AddCommonParams(FaqAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Question", model.Question);
            col.AddWithValue("@Answer", model.Answer);
            col.AddWithValue("@FAQCategoriesId", model.FAQCategoriesId);
            col.AddWithValue("@SortOrder", model.SortOrder);
            col.AddWithValue("@UserId", userId);
        }
    }
}

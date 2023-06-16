using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using Sabio.Models.Requests.ZoneTokens;
using Sabio.Data;
using Sabio.Services.Interfaces;
using Sabio.Models;

namespace Sabio.Services
{
    public class ZoneTokenService : IZoneTokenService
    {
        IDataProvider _data = null;
        public ZoneTokenService(IDataProvider data)
        {
            _data = data;
        }

        public string Add(ZoneTokenAddRequest model, int userId)
        {
            string token = "";

            string procName = "[dbo].[ZoneTokens_Insert_V2]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                SqlParameter tokenOut = new SqlParameter("@Token", SqlDbType.VarChar, 200);
                tokenOut.Direction = ParameterDirection.Output;
                col.Add(tokenOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oToken = returnCollection["@Token"].Value;
                oToken.ToString();
                token = oToken.ToString();
            });
            return token;
        }

        public void Update(ZoneTokenUpdateRequest model, int userId)
        {

            string procName = "[dbo].[ZoneToken_Update_Qty]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Token", model.Token);
            },
            returnParameters: null);
        }

        public ZoneToken GetByToken(string token)
        {
            string procName = "[dbo].[ZoneTokens_Select_ByToken]";
            ZoneToken zoneToken = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Token", token);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                zoneToken = MapSingleZoneToken(reader, ref startingIndex);
            });
            return zoneToken;
        }

        public Paged<ZoneToken> GetByTokenTypeId(int typeId, int pageIndex, int pageSize)
        {
            Paged<ZoneToken> pagedResult = null;
            List<ZoneToken> list = null;
            int totalCount = 0;
            string procName = "[dbo].[ZoneTokens_SelectByZoneTokenTypeId_Paginated]";
            
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@ZoneTokenTypeId", typeId);
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ZoneToken zoneToken = MapSingleZoneToken(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex++);
                if (list == null)
                {
                    list = new List<ZoneToken>();
                }
                list.Add(zoneToken);               
            });
            if (list != null)
            {
                pagedResult = new Paged<ZoneToken>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public void DeleteZoneToken(string token)
        {

            string procName = "[dbo].[ZoneTokens_DeleteById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Token", token);
            },
            returnParameters: null);
        }

        public List<ZoneToken> GetByZoneAndZoneTokenTypeId(int zoneId, int zoneTokenTypeId)
        {
            List<ZoneToken> list = null;
            string procName = "[dbo].[ZoneTokens_Select_ByZoneIdAndZoneTokenTypeId]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@zoneId", zoneId);
                paramCollection.AddWithValue("@zoneTokenTypeId", zoneTokenTypeId);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ZoneToken zoneTokens = MapSingleZoneToken(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<ZoneToken>();
                }

                list.Add(zoneTokens);
            }
            );
            return list;
        }

        private static void AddCommonParams(ZoneTokenAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@ZoneId", model.ZoneId);
            col.AddWithValue("@ZoneTokenTypeId", model.ZoneTokenTypeId);
            col.AddWithValue("@EntityId", model.EntityId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@TraineeId", model.TraineeId);
            col.AddWithValue("@Quantity", model.Quantity);
            col.AddWithValue("@TrainingUnitId", model.Quantity);
        }

        private static ZoneToken MapSingleZoneToken(IDataReader reader, ref int startingIndex)
        {
            ZoneToken zoneToken = new ZoneToken();

            zoneToken.Token = reader.GetSafeString(startingIndex++);
            zoneToken.ZoneId = reader.GetSafeInt32(startingIndex++);
            zoneToken.ZoneTokenTypeId = reader.GetSafeInt32(startingIndex++);
            zoneToken.EntityId = reader.GetSafeInt32(startingIndex++);
            zoneToken.Name = reader.GetSafeString(startingIndex++);
            zoneToken.CreatedBy = reader.GetSafeInt32(startingIndex++);
            zoneToken.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            zoneToken.DateCreated = reader.GetSafeDateTime(startingIndex++);
            zoneToken.DateModified = reader.GetSafeDateTime(startingIndex++);
            zoneToken.TraineeId = reader.GetSafeInt32(startingIndex++);
            zoneToken.Quantity = reader.GetSafeInt32(startingIndex++);
            zoneToken.TrainingUnitId = reader.GetSafeInt32(startingIndex++);

            return zoneToken;
        }
    }
}

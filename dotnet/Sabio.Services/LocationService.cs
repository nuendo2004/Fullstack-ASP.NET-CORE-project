using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests.LocationRequests;
using Sabio.Services.Interfaces;
using Stripe.Terminal;
using Location = Sabio.Models.Domain.Location;


namespace Sabio.Services
{
    public class LocationService : ILocationService 
    {
        IDataProvider _data = null;

        public LocationService(IDataProvider data)
        {
            _data = data;

        }

        public int Add(LocationAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Locations_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });
            return id; 
        }

        public void Update(LocationUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Locations_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);
                }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Locations_DeleteById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }, returnParameters: null);
        }

        public List<Location> Get(int id)
        {
            string procName = "[dbo].[Locations_SelectByCreatedBy]";

            List<Location> locationList = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@CreatedBy", id);
            }, delegate (IDataReader reader, short set)
            {

                Location location = MapAddress(reader);

                if(locationList == null)
                {
                    locationList = new List<Location>();
                }

                locationList.Add(location);

            });

            return locationList; 
        }

        public static Location MapAddress(IDataReader reader)
        {
            Location location = new Location();

            int startingIndex = 0;

            location.Id = reader.GetSafeInt32(startingIndex++);
            location.lookUpLocationTypeInfo = reader.DeserializeObject<List<LookUp>>(startingIndex++);
            location.LineOne = reader.GetSafeString(startingIndex++);
            location.LineTwo = reader.GetSafeString(startingIndex++);
            location.City = reader.GetSafeString(startingIndex++);
            location.Zip = reader.GetSafeString(startingIndex++);
            location.lookUpStateInfo = reader.DeserializeObject<List<LookUp>>(startingIndex++);
            location.Latitude = reader.GetSafeDouble(startingIndex++);
            location.Longitude = reader.GetSafeDouble(startingIndex++);
            location.CreatedBy = reader.GetSafeInt32(startingIndex++);
            location.ModifiedBy = reader.GetSafeInt32(startingIndex++);


            return location;
        }

        public static void AddCommonParams(LocationAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@LocationTypeId", model.LocationTypeId);
            col.AddWithValue("@LineOne", model.LineOne);
            col.AddWithValue("@LineTwo", model.LineTwo);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@Zip", model.Zip);
            col.AddWithValue("@StateId", model.StateId);
            col.AddWithValue("@Latitude", model.Latitude);
            col.AddWithValue("@Longitude", model.Longitude);
            col.AddWithValue("@CreatedBy",userId);
            col.AddWithValue("@ModifiedBy", userId);
        }
    }
}

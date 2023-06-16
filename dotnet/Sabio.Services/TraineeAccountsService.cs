using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Domain.TraineeAccounts;
using Sabio.Models.Domain.Trainees;
using Sabio.Models.Domain.TrainingUnits;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.TraineeAccounts;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class TraineeAccountsService : ITraineeAccountsService
    {
        IDataProvider _data = null;

        public TraineeAccountsService(IDataProvider data)
        {
            _data = data;
        }

        public List<TraineeAccounts> GetAll()
        {
            List<TraineeAccounts> list = null;

            string procName = "[dbo].[TraineeAccounts_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    TraineeAccounts traineeAccounts = Mapper(reader, ref index);

                    if (list == null)
                    {
                        list = new List<TraineeAccounts>();
                    }
                    list.Add(traineeAccounts);
                });
            return list;

        }

        public bool TraineeAccountLogIn(string username, string password,int zoneId)
        {
            TraineeAccountAuth authTrainee = null;
            string procName = "[dbo].[TraineeAccounts_AuthData]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Username", username);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                authTrainee = new TraineeAccountAuth();
                authTrainee.Id = reader.GetSafeInt32(index++);
                authTrainee.Username = reader.GetSafeString(index++);
                authTrainee.Password = reader.GetSafeString(index++);
                authTrainee.AvatarUrl = reader.GetSafeString(index++);
                authTrainee.ZoneId = reader.GetSafeInt32(index++);
                authTrainee.TraineeId = reader.GetSafeInt32(index++);

            });
            
            bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, authTrainee.Password);
            bool isSuccessful = zoneId == authTrainee.ZoneId;
            if (isValidCredentials&& isSuccessful)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public List<TraineeAccounts> GetDropdowns()
        {
            List<TraineeAccounts> list = null;

            string procName = "[dbo].[TraineeAccounts_Select_Dropdowns]";
            _data.ExecuteCmd(procName, inputParamMapper: null

      , singleRecordMapper: delegate (IDataReader reader, short set)
      {
          int index = 0;
          TraineeAccounts traineeAccounts = DropdownMapper(reader, ref index);

          if (list == null)
          {
              list = new List<TraineeAccounts>();
          }
          list.Add(traineeAccounts);
      });
            return list;

        }

        public TraineeAccounts GetById(int id)
        {
            TraineeAccounts model = null;

            _data.ExecuteCmd(
                "[dbo].[TraineeAccounts_SelectById]",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    model = Mapper(reader, ref index);
                }
                );
            return model;
        }

        public Paged<TraineeAccounts> GetByTraineeId(int pageIndex, int pageSize, int traineeId)
        {
            Paged<TraineeAccounts> pagedList = null;
            List<TraineeAccounts> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[TraineeAccounts_SelectByTraineeId_Paginated]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@TraineeId", traineeId);
                },
                (reader, recordSetIndex) =>
                {
                    int index = 0;
                    TraineeAccounts traineeAccounts = Mapper(reader, ref index);
                    totalCount = reader.GetSafeInt32(index++);

                    if (list == null)
                    {
                        list = new List<TraineeAccounts>();
                    }
                    list.Add(traineeAccounts);
                });
            if (list != null)
            {
                pagedList = new Paged<TraineeAccounts>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<TraineeAccounts> GetByTraineeIdandZoneId(int traineeId, int zoneId)
        {
            string procName = "[dbo].[TraineeAccounts_SelectByTraineeId_and_ZoneId]";
            List<TraineeAccounts> list = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@TraineeId", traineeId);
                    param.AddWithValue("@ZoneId", zoneId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    TraineeAccounts traineeAccounts = Mapper(reader, ref index);
                    if (list == null)
                    {
                        list = new List<TraineeAccounts>();
                    }
                    list.Add(traineeAccounts);
                });
            return list;
        }

        public Paged<TraineeAccounts> GetByZoneIdPaged(int pageIndex, int pageSize, int zoneId)
        {
            Paged<TraineeAccounts> pagedList = null;
            List<TraineeAccounts> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[TraineeAccounts_SelectByZoneId_Paginated]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@ZoneId", zoneId);
                },
                (reader, recordSetIndex) =>
                {
                    int index = 0;
                    TraineeAccounts traineeAccounts = Mapper(reader, ref index);
                    totalCount = reader.GetSafeInt32(index++);

                    if (list == null)
                    {
                        list = new List<TraineeAccounts>();
                    }
                    list.Add(traineeAccounts);
                });
            if (list != null)
            {
                pagedList = new Paged<TraineeAccounts>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<TraineeAccounts> GetByZoneId(int zoneId)
        {
            string procName = "[dbo].[TraineeAccounts_SelectByZoneId]";
            List<TraineeAccounts> list = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@ZoneId", zoneId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    TraineeAccounts traineeAccounts = Mapper(reader, ref index);
                    if (list == null)
                    {
                        list = new List<TraineeAccounts>();
                    }
                    list.Add(traineeAccounts);
                });
            return list;
        }

        public Paged<TraineeAccounts> PaginatedSearch(int pageIndex, int pageSize, string query)
        {
            Paged<TraineeAccounts> pagedList = null;
            List<TraineeAccounts> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[TraineeAccounts_Search_Pagination]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                },
                (reader, recordSetIndex) =>
                {
                    int index = 0;
                    TraineeAccounts traineeAccounts = Mapper(reader, ref index);
                    totalCount = reader.GetSafeInt32(index++);

                    if (list == null)
                    {
                        list = new List<TraineeAccounts>();
                    }
                    list.Add(traineeAccounts);
                });
            if (list != null)
            {
                pagedList = new Paged<TraineeAccounts>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public int Create(TraineeAccountsAddRequest model, int userId)
        {
            int id = 0;
            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            string procName = "[dbo].[TraineeAccounts_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId, hashedPassword);
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

        public void UpdateUsername(TraineeAccountsUsernameUpdateRequest model, int userId)
        {
            string procName = "[dbo].[TraineeAccounts_Update_Username]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Username", model.Username);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Id", model.Id);
                },
                    returnParameters: null);
        }

        public void UpdateStatus(TraineeAccountsStatusUpdateRequest model, int userId)
        {
            string procName = "[dbo].[TraineeAccounts_Update_Status]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@AccountStatusId", model.AccountStatusId);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Id", model.Id);
                },
                    returnParameters: null);
        }

        public void UpdateAvatar(TraineeAccountsAvatarUpdate model, int userId)
        {
            string procName = "[dbo].[TraineeAccounts_Update_Avatar]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@AvatarUrl", model.AvatarUrl);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Id", model.Id);
                },
                    returnParameters: null);
        }

        public bool PasswordMatch(int id, string currentPassword)
        {
            TraineeAccountAuth model = null;

            _data.ExecuteCmd(
                "[dbo].[TraineeAccounts_Select_AuthData]",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    model = AuthDataMapper(reader, ref index);
                }
                );
            bool isPasswardConfirmed = BCrypt.BCryptHelper.CheckPassword(currentPassword, model.Password);
            return isPasswardConfirmed;
        }

        public void UpdatePassword(TraineeAccountsPasswordUpdate model, int userId)
        {
            string password = model.NewPassword;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            string procName = "[dbo].[TraineeAccounts_Update_Password]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Password", hashedPassword);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Id", model.TraineeAccountId);
                },
                returnParameters: null);
        }

        public BaseTraineeAccount GetTraineeAccountByUserIdAndZoneId(int userId, int zoneId)
        {
            string procName = "dbo.TraineeAccounts_SelectByUserIdAndZoneId";
            BaseTraineeAccount data = new BaseTraineeAccount();

            _data.ExecuteCmd(
                procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@ZoneId", zoneId);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    data.UserId = reader.GetSafeInt32(startingIndex++);
                    data.TraineeId = reader.GetSafeInt32(startingIndex++);
                    data.TraineeAccountId = reader.GetSafeInt32(startingIndex++);
                    data.TraineeAccountUserName = reader.GetSafeString(startingIndex++);
                    data.TraineeAcccountZoneId = reader.GetSafeInt32(startingIndex++);
                }
                );
            return data;
        }

        private static TraineeAccounts Mapper(IDataReader reader, ref int index)
        {
            TraineeAccounts model = new TraineeAccounts();

            model.AccountStatus = new LookUp();
            model.ZoneType = new LookUp();
            model.ZoneStatus = new LookUp();
            model.Zone = new Zone();
            model.Trainee = new Trainee();
            model.TraineeStatus = new LookUp();
            model.TrainingUnit = new TrainingUnit();

            model.Id = reader.GetSafeInt32(index++);
            model.Username = reader.GetSafeString(index++);
            model.AvatarUrl = reader.GetSafeString(index++);
            model.Zone.Id = reader.GetSafeInt32(index++);
            model.Zone.Name = reader.GetSafeString(index++);
            model.Zone.Description = reader.GetSafeString(index++);
            model.ZoneType.Id = reader.GetSafeInt32(index++);
            model.ZoneType.Name = reader.GetSafeString(index++);
            model.ZoneStatus.Id = reader.GetSafeInt32(index++);
            model.ZoneStatus.Name = reader.GetSafeString(index++);
            model.Zone.IsDeleted = reader.GetSafeBool(index++);
            model.Trainee.Id = reader.GetSafeInt32(index++);
            model.Trainee.UserId = reader.GetSafeInt32(index++);
            model.TrainingUnit.Id = reader.GetSafeInt32(index++);
            model.TraineeStatus.Id = reader.GetSafeInt32(index++);
            model.TraineeStatus.Name = reader.GetSafeString(index++);
            model.Trainee.IsDeleted = reader.GetSafeBool(index++);
            model.AccountStatus.Id = reader.GetSafeInt32(index++);
            model.AccountStatus.Name = reader.GetSafeString(index++);

            return model;
        }

        private static TraineeAccounts DropdownMapper(IDataReader reader, ref int index)
        {
            TraineeAccounts model = new TraineeAccounts();

            model.AccountStatus = new LookUp();
            model.ZoneType = new LookUp();
            model.ZoneStatus = new LookUp();
            model.Zone = new Zone();
            model.Trainee = new Trainee();
            model.TraineeStatus = new LookUp();
            model.TrainingUnit = new TrainingUnit();
            model.Organization = new Organization();
            model.User = new User();

            model.Id = reader.GetSafeInt32(index++);
            model.Username = reader.GetSafeString(index++);
            model.AvatarUrl = reader.GetSafeString(index++);
            model.Zone.Id = reader.GetSafeInt32(index++);
            model.Zone.Name = reader.GetSafeString(index++);
            model.Zone.Description = reader.GetSafeString(index++);
            model.ZoneType.Id = reader.GetSafeInt32(index++);
            model.ZoneType.Name = reader.GetSafeString(index++);
            model.ZoneStatus.Id = reader.GetSafeInt32(index++);
            model.ZoneStatus.Name = reader.GetSafeString(index++);
            model.Zone.IsDeleted = reader.GetSafeBool(index++);
            model.Trainee.Id = reader.GetSafeInt32(index++);
            model.Trainee.UserId = reader.GetSafeInt32(index++);
            model.TrainingUnit.Id = reader.GetSafeInt32(index++);
            model.TraineeStatus.Id = reader.GetSafeInt32(index++);
            model.TraineeStatus.Name = reader.GetSafeString(index++);
            model.Trainee.IsDeleted = reader.GetSafeBool(index++);
            model.AccountStatus.Id = reader.GetSafeInt32(index++);
            model.AccountStatus.Name = reader.GetSafeString(index++);

            model.Organization.Id = reader.GetSafeInt32(index++);

            model.User.Id = reader.GetSafeInt32(index++);
            model.User.Email = reader.GetSafeString(index++);
            model.User.FirstName = reader.GetSafeString(index++);
            model.User.LastName = reader.GetSafeString(index++);
            model.User.Mi = reader.GetSafeString(index++);

            return model;
        }

        private static TraineeAccountAuth AuthDataMapper(IDataReader reader, ref int index)
        {
            TraineeAccountAuth model = new TraineeAccountAuth();

            model.Id = reader.GetSafeInt32(index++);
            model.Username = reader.GetSafeString(index++);
            model.Password = reader.GetSafeString(index++);

            return model;
        }

        private static void AddCommonParams(TraineeAccountsAddRequest model
            , SqlParameterCollection col, int userId, string password)
        {
            col.AddWithValue("@Username", model.Username);
            col.AddWithValue("@Password", password);
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);
            col.AddWithValue("@ZoneId", model.ZoneId);
            col.AddWithValue("@TraineeId", model.TraineeId);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@ModifiedBy", userId);
        }

    }
}

using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Hosting.Server;
using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Trainees;
using Sabio.Models.Domain.Users;
using Sabio.Models.Enums;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.NetworkInformation;
using System.Security.Claims;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class UserService : IUserService, IMapUser
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authService, IDataProvider dataProvider)
        {
            _authenticationService = authService;
            _dataProvider = dataProvider;
        }
        public List<UserV2> GetAllUsers()
        {
           
            List<UserV2> list = null;
            string procName = "[dbo].[Users_SelectAll]";
            _dataProvider.ExecuteCmd(procName, inputParamMapper: null,
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   int startingIndex = 0;
                   UserV2 user = MapAllUsers(reader, ref startingIndex);

                   if (list == null)
                   {
                       list = new List<UserV2>();
                   }
                   list.Add(user);
               });

            return list;
        }
        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = GetCurrent(email, password);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }

        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }

        public int Create(UserAddRequest model, int statusTypeId)
        {
            int userId = 0;
            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            string procName = "[dbo].[Users_Insert]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, hashedPassword);
                    col.AddWithValue("@statusTypeId", statusTypeId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out userId);
            }
            );

            return userId;
        }
        public int CreateInvitedMember(UserAddRequest model, int statusTypeId)
        {
            int userId = 0;
            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            string procName = "[dbo].[Users_Insert_InvitedMember]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, hashedPassword);
                    col.AddWithValue("@statusTypeId", statusTypeId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out userId);
            }
            );

            return userId;
        }

        public IUserAuthData GetCurrent(string email, string password)
        {
            string procName = "[dbo].[Users_Select_AuthDataV3]";
            UserBase user = null;
            AuthUser authUser = null;
            List<AuthOrganization> orgsWithRoles = null;
            List<Trainee> trainees = null;

            _dataProvider.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {

                int i = 0;

                authUser = new AuthUser();
                user = new UserBase();

                authUser.Id = reader.GetSafeInt32(i++);
                authUser.Email = reader.GetSafeString(i++);
                authUser.Password = reader.GetSafeString(i++);

                string orgsAsString = reader.GetSafeString(i++);

                if (!string.IsNullOrEmpty(orgsAsString))
                {
                    orgsWithRoles = JsonConvert.DeserializeObject<List<AuthOrganization>>(orgsAsString);
                }

                trainees = reader.DeserializeObject<List<Trainee>>(i++);

                authUser.Organizations = GetOrganizations(orgsWithRoles);
                authUser.CurrentOrg = authUser.Organizations[0];
                authUser.Roles = GetRoles(orgsWithRoles);
                authUser.Trainees = GetTrainees(trainees);
                authUser.CurrentTrainee = authUser.Trainees[0];

            }
            );
            bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, authUser.Password);

            if (isValidCredentials)
            {
                user.Id = authUser.Id;
                user.Name = authUser.Email;
                user.TenantId = "Immersed";
                user.Organizations = authUser.Organizations;
                user.CurrentOrgId = authUser.CurrentOrg;
                user.Roles = authUser.Roles;
                user.Trainees = authUser.Trainees;
                user.CurrentTraineeId = authUser.CurrentTrainee;
            }

            return user;
        }

        public BaseUser GetById(int id)
        {
            string procName = "[dbo].[Users_Select_ById]";
            BaseUser baseUser = null;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                baseUser = MapSingleUser(reader, ref startingIndex);
            }
            );

            return baseUser;
        }

        public List<BaseUser> GetMostRecentTrainees()
        {
            string procName = "[dbo].[Users_SelectMostRecentTrainees]";
            List<BaseUser> list = new List<BaseUser>();
            BaseUser user = new();

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    user = MapSingleUser(reader, ref startingIndex);
                    list.Add(user);

                });
            return list;
        }

        public int GetIdByEmail(string email)
        {
            string procName = "[dbo].[Users_SelectId_ByEmail]";
            int baseUserId = 0;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                baseUserId = reader.GetSafeInt32(startingIndex++);
            });

            return baseUserId;
        }

        public void AddUserToken(string token, int userId, int tokenTypeId)
        {
            string procName = "[dbo].[UserTokens_Insert]";

            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@TokenTypeId", tokenTypeId);
                }
                );
        }

        public void AddUserOrgAndRole(int userId, int roleId, int orgId)
        {
            string procName = "[dbo].[UserOrgRoles_Insert]";

            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@RoleId", roleId);
                    col.AddWithValue("@OrgId", orgId);
                }
                );
        }

        public void ConfirmUser(string token, string email)
        {
            string procName = "[dbo].[Users_Confirm]";

            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Email", email);
                    col.AddWithValue("@Token", token);
                }
                );
        }

        public int GetUserFromToken(int tokenTypeId, string token)
        {
            int userId = 0;

            string procName = "[dbo].[UserTokens_Select_ByTokenAndTokenTypeId]";

            _dataProvider.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@TokenTypeId", tokenTypeId);
                    col.AddWithValue("@Token", token);
                },
                delegate (IDataReader reader, short set)
                {
                    userId = reader.GetSafeInt32(0);
                }
                );
            return userId;
        }

        public void UpdateUserPassword(string password, int userId)
        {
            string procName = "[dbo].[Users_Update_Password]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Password", password);
                    col.AddWithValue("@Id", userId);
                }, returnParameters: null);
        }

        public void DeleteUserToken(string token)
        {
            string procName = "[dbo].[UserTokens_Delete_ByToken]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                }, returnParameters: null);
        }

        public async Task<bool> ChangeCurrentOrg(IUserAuthData currentUser, int orgId)
        {
            string procName = "dbo.UserOrgRoles_GetRolesByUserIdAndOrgId";
            UserBase user = null;
            List<string> roles = null;
            bool isSuccessful = false;

            _dataProvider.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@UserId", currentUser.Id);
                    coll.AddWithValue("@OrgId", orgId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int i = 0;
                    string role = reader.GetSafeString(i);
                    if (roles == null)
                    {
                        roles = new List<string>();
                    }
                    roles.Add(role);
                });
            if (user == null)
            {
                user = new UserBase();
                user.Id = currentUser.Id;
                user.Name = currentUser.Name;
                user.TenantId = currentUser.TenantId;
                user.Trainees = currentUser.Trainees;
                user.CurrentTraineeId = currentUser.CurrentTraineeId;
                user.Organizations = currentUser.Organizations;
                user.CurrentOrgId = orgId;
                user.Roles = roles;
            }
            if (user != null)
            {
                await _authenticationService.LogInAsync(user);
                isSuccessful = true;
            }
            return isSuccessful;
        }

        public async Task<bool> ChangeCurrentTrainee(IUserAuthData currentUser, int traineeId)
        {
            string procName = "[dbo].[Trainees_GetTraineesByUserId]";
            UserBase user = null;
            List<int> trainees = null;
            bool isSuccessful = false;

            _dataProvider.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", currentUser.Id);
                col.AddWithValue("@TraineeId", traineeId);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                switch (set)
                {
                    case 0:
                        int index = 0;
                        int checkedTraineeId = reader.GetSafeInt32(index++);
                        break;

                    case 1:
                        int startingIndex = 0;
                        int trainee = reader.GetSafeInt32(startingIndex++);
                        if (trainees == null)
                        {
                            trainees = new List<int>();
                        }
                        trainees.Add(trainee);
                        break;
                }

            });
            if (user == null)
            {
                user = new UserBase();
                user.Id = currentUser.Id;
                user.Name = currentUser.Name;
                user.TenantId = currentUser.TenantId;
                user.Trainees = trainees;
                user.CurrentTraineeId = traineeId;
                user.Organizations = currentUser.Organizations;
                user.CurrentOrgId = currentUser.CurrentOrgId;
                user.Roles = currentUser.Roles;
            }
            if (user != null)
            {
                await _authenticationService.LogInAsync(user);
                isSuccessful = true;
            }
            return isSuccessful;

        }

        public UserStatusReqId GetUserStatusTotals(int id)
        {
            string procName = "[dbo].[Users_Select_StatusTotals]";
            UserStatusReqId user = null;

            _dataProvider.ExecuteCmd
                (
                    storedProc: procName,
                    inputParamMapper: delegate (SqlParameterCollection sqlParams)
                    {
                        sqlParams.AddWithValue("@Id", id);
                    },
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int columnIndex = 0;
                        user = new UserStatusReqId();
                        user.Id = reader.GetSafeInt32(columnIndex++);
                        user.Active = reader.GetSafeInt32(columnIndex++);
                        user.Inactive = reader.GetSafeInt32(columnIndex++);
                        user.Pending = reader.GetSafeInt32(columnIndex++);
                        user.Flagged = reader.GetSafeInt32(columnIndex++);
                        user.Removed = reader.GetSafeInt32(columnIndex++);
                        user.Total = reader.GetSafeInt32(columnIndex++);
                    }
                );
            return user;
        }

        public List<UserStatus> GetUserStatusOverTime()
        {
            string procName = "[dbo].[Users_Select_StatusPerMonthYear]";
            List<UserStatus> dataList = null;

            _dataProvider.ExecuteCmd
                (
                    storedProc: procName,
                    inputParamMapper: null,
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int columnIndex = 0;
                        UserStatus data = new UserStatus();
                        data.DateModified = reader.GetSafeDateTime(columnIndex++);
                        data.Active = reader.GetSafeInt32(columnIndex++);
                        data.Inactive = reader.GetSafeInt32(columnIndex++);
                        data.Flagged = reader.GetSafeInt32(columnIndex++);
                        data.Removed = reader.GetSafeInt32(columnIndex++);
                        data.Total = reader.GetSafeInt32(columnIndex++);

                        if (dataList == null)
                        {
                            dataList = new List<UserStatus>();
                        }
                        dataList.Add(data);
                    }
                );
            return dataList;
        }

            public BaseUser MapSingleUser(IDataReader reader, ref int startingIndex)
        {
            BaseUser aUser = new BaseUser();

            aUser.Id = reader.GetSafeInt32(startingIndex++);
            aUser.Email = reader.GetSafeString(startingIndex++);
            aUser.FirstName = reader.GetSafeString(startingIndex++);
            aUser.LastName = reader.GetSafeString(startingIndex++);
            aUser.Mi = reader.GetSafeString(startingIndex++);
            aUser.AvatarUrl = reader.GetSafeString(startingIndex++);

            return aUser;
        }

        public UserV2 MapAllUsers(IDataReader reader, ref int startingIndex)
        {
            UserV2 aUser = new UserV2();

            aUser.Id = reader.GetSafeInt32(startingIndex++);
            aUser.Email = reader.GetSafeString(startingIndex++);
            aUser.FirstName = reader.GetSafeString(startingIndex++);
            aUser.LastName = reader.GetSafeString(startingIndex++);
            aUser.Mi = reader.GetSafeString(startingIndex++);
            aUser.AvatarUrl = reader.GetSafeString(startingIndex++);
            aUser.IsConfirmed = reader.GetSafeBool(startingIndex++);
            aUser.StatusTypeId = reader.GetSafeInt32(startingIndex++);
            aUser.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aUser.DateModifed = reader.GetSafeDateTime(startingIndex++);

            return aUser;
        }

        private static void AddCommonParams(UserAddRequest model, SqlParameterCollection col, string password)
        {
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@FirstName", model.FirstName == null ? DBNull.Value : model.FirstName);
            col.AddWithValue("@LastName", model.LastName == null ? DBNull.Value : model.LastName);
            col.AddWithValue("@Mi", model.Mi == null ? DBNull.Value : model.Mi);
            col.AddWithValue("@AvatarUrl", model.AvatarUrl == null ? DBNull.Value : model.AvatarUrl);
            col.AddWithValue("@Password", password);
        }

        private static List<int> GetOrganizations(List<AuthOrganization> orgsWithRoles)
        {
            List<int> orgs = new List<int>();

            foreach (AuthOrganization org in orgsWithRoles)
            {
                orgs.Add(org.Id);
            }
            return orgs;
        }

        private static List<int> GetTrainees(List<Trainee> traineeList)
        {
            List<int> traineeId = new List<int>();

            if (traineeList != null && traineeList.Count > 0)
            {
                foreach (Trainee trainee in traineeList)
                {
                    traineeId.Add(trainee.Id);
                }
                return traineeId;
            }
            else
            {
                traineeId.Add(0);
                return traineeId;
            }

        }

        private static List<string> GetRoles(List<AuthOrganization> orgsWithRoles)
        {
            List<string> roles = new List<string>();

            foreach (AuthRole role in orgsWithRoles.First().Roles)
            {
                roles.Add(role.Name);
            }
            return roles;
        }
    }
}

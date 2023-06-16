using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.InviteTrainees;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Domain.Trainees;
using Sabio.Models.Domain.TrainingUnits;
using Sabio.Models.Requests.InviteTrainees;
using Sabio.Models.Requests.Trainees;
using Sabio.Services.Security;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class TraineeService : ITraineeService
    {
        IDataProvider _data = null;
        public TraineeService(IDataProvider data)
        {
            _data = data;
        }

        public Trainee Get(int id)
        {
            string procName = "[dbo].[Trainees_Select_ByIdV2]";

            Trainee trainee = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                trainee = SingleTraineeMapper(reader, ref startingIndex);
            });
            return trainee;
        }

        public List<Trainee> GetByTrainingUnitId1(int trainingUnitId)
        {
            string procName = "[dbo].[Trainees_Select_ByTrainingUnitIdV3]";

            List<Trainee> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@TrainingUnitId", trainingUnitId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                Trainee trainee = SingleTraineeMapper(reader, ref startingIndex);
                if (list == null)
                {
                    list = new List<Trainee>();
                }
                list.Add(trainee);


            });
            return list;
        }

        public List<TraineeGroupMember> GetByZoneGroupId(int zoneGroupId) //Required for Group Chats in Zone Groups
        {
            string procName = "dbo.Trainees_GetByZoneGroupId";
            List<TraineeGroupMember> list = null;
            TraineeGroupMember trainee = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@ZoneGroupId", zoneGroupId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    trainee = TraineeGroupMemberMapper(reader);
                    if (list == null)
                    {
                        list = new List<TraineeGroupMember>();
                    }
                    list.Add(trainee);
                });
            return list;
        }

        public Paged<Trainee> GetByOrganizationIdPaged(int pageIndex, int pageSize, int organizationId)
        {
            Paged<Trainee> pagedList = null;
            List<Trainee> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Trainee_Select_ByOrganizationId_Paged]";


            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@OrganizationId", organizationId);
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);

            }, delegate (IDataReader reader, short set)
            {

                int startingIndex = 0;

                Trainee trainee = SingleTraineeMapper(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }
                if (list == null)
                {
                    list = new List<Trainee>();
                }
                list.Add(trainee);
            }
                );
            if (list != null)
            {
                pagedList = new Paged<Trainee>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<Trainee> GetTraineesByUserId(int userId)
        {
            List<Trainee> list = null;
            string procName = "[dbo].[Trainees_Select_ByUserId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@UserId", userId);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Trainee trainee = SingleTraineeMapper(reader, ref startingIndex);
                if (list == null)
                {
                    list = new List<Trainee>();
                }
                list.Add(trainee);
            });
            return list;
        }
        public Trainee GetByUserId(int userId)
        {
            string procName = "[dbo].[Trainees_Select_ByUserId]";

            Trainee trainee = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@UserId", userId);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                trainee = SingleTraineeMapper(reader, ref startingIndex);
            });
            return trainee;
        }
        public List<TraineesV2> GetByTrainingUnitId(int TrainingUnitId)
        {
            string procName = "[dbo].[Trainees_Select_ByTrainingUnitId]";

            List<TraineesV2> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@TrainingUnitId", TrainingUnitId);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                TraineesV2 trainee = SingleTraineeMapperV2(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<TraineesV2>();
                }

                list.Add(trainee);
            }
            );
            return list;
        }

        public List<TraineeV3> GetByTrainingUnitIdV2(int trainingUnitId)
        {
            string procName = "[dbo].[Trainees_Select_ByTrainingUnitIdV2]";

            List<TraineeV3> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@TrainingUnitId", trainingUnitId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                TraineeV3 trainee = SingleTraineeMapperV3(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<TraineeV3>();
                }

                list.Add(trainee);
            }
            );

            return list;
        }

        public InviteTrainees GetByToken(int userId)
        {
            string procName = "[dbo].[InviteTrainees_Select_ByToken]";

            InviteTrainees inviteTrainees = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@UserId", userId);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                inviteTrainees = SingleInviteTraineeMapper(reader, ref startingIndex);
            });
            return inviteTrainees;
        }

        public int Add(TraineeAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Trainee_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsMapper(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;

        }

        public int AddV2(InviteTraineeAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[InviteTrainees_insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsMapperV2(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;

        }

        public void UpdateTrainee(TraineeUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Trainees_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsMapper(model, col, userId);
                col.AddWithValue("@Id", model.Id);

            },
            returnParameters: null);
        }

        public void Delete(int Id, int userId)
        {
            string procName = "[dbo].[Trainees_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Id", Id);

            },
            returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[InviteTrainees_Delete]";

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

        public Paged<Trainee> Pagination(int pageIndex, int pageSize)
        {
            Paged<Trainee> pagedList = null;
            List<Trainee> list = null;
            int totalCount = 0;  
            _data.ExecuteCmd(
                "[dbo].[Trainee_Select_Paged]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;

                    Trainee trainee = SingleTraineeMapper(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Trainee>();
                    }
                    list.Add(trainee);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Trainee>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        private static Trainee SingleTraineeMapper(IDataReader reader, ref int startingIndex)
        {
            Trainee trainee = new Trainee();
            trainee.TraineeStatus = new LookUp();
            trainee.TrainingUnits = new TrainingUnit();
            trainee.TrainingUnits.TrainingStatusId = new LookUp();
            trainee.TrainingUnits.Organization = new OrganizationTrainingUnit();
            trainee.TrainingUnits.PrimaryTrainerId = new TrainingUnitPrimaryTrainer();
            trainee.Organization = new Organization();
            trainee.Organization.OrganizationType = new LookUp();
            trainee.User = new User();

            trainee.Id = reader.GetSafeInt32(startingIndex++);
            trainee.UserId = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnitId = reader.GetSafeInt32(startingIndex++);
            trainee.TraineeStatus.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TraineeStatus.Name = reader.GetSafeString(startingIndex++);
            trainee.IsDeleted = reader.GetSafeBool(startingIndex++);
            trainee.CreatedBy = reader.GetSafeInt32(startingIndex++);
            trainee.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            trainee.DateCreated = reader.GetSafeDateTime(startingIndex++);
            trainee.DateModified = reader.GetSafeDateTime(startingIndex++);

            trainee.TrainingUnits.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.Name = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.Description = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.Organization.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.TrainingStatusId.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.PrimaryTrainerId.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.PrimaryTrainerId.FirstName = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.PrimaryTrainerId.LastName = reader.GetSafeString(startingIndex++);


            trainee.Organization.Id = reader.GetSafeInt32(startingIndex++);
            trainee.Organization.OrganizationType.Id = reader.GetSafeInt32(startingIndex++);
            trainee.Organization.Name = reader.GetSafeString(startingIndex++);
            trainee.Organization.Description = reader.GetSafeString(startingIndex++);
            trainee.Organization.LogoUrl = reader.GetSafeString(startingIndex++);
            trainee.Organization.BusinessPhone = reader.GetSafeString(startingIndex++);
            trainee.Organization.SiteUrl = reader.GetSafeString(startingIndex++);
            trainee.Organization.IsDeleted = reader.GetSafeBool(startingIndex++);

            trainee.User.Id = reader.GetSafeInt32(startingIndex++);
            trainee.User.Email = reader.GetSafeString(startingIndex++);
            trainee.User.FirstName = reader.GetSafeString(startingIndex++);
            trainee.User.LastName = reader.GetSafeString(startingIndex++);
            trainee.User.Mi = reader.GetSafeString(startingIndex++);
            trainee.User.AvatarUrl = reader.GetSafeString(startingIndex++);

            return trainee;
        }
        private static TraineesV2 SingleTraineeMapperV2(IDataReader reader, ref int startingIndex)
        {
            TraineesV2 trainee = new TraineesV2();
            trainee.TraineeStatus = new LookUp();
            trainee.TrainingUnits = new TrainingUnit();
            trainee.TrainingUnits.TrainingStatusId = new LookUp();
            trainee.TrainingUnits.Organization = new OrganizationTrainingUnit();
            trainee.TrainingUnits.PrimaryTrainerId = new TrainingUnitPrimaryTrainer();
            trainee.User = new User();

            trainee.Id = reader.GetSafeInt32(startingIndex++);
            trainee.UserId = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnitId = reader.GetSafeInt32(startingIndex++);
            trainee.TraineeStatus.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TraineeStatus.Name = reader.GetSafeString(startingIndex++);
            trainee.IsDeleted = reader.GetSafeBool(startingIndex++);

            trainee.TrainingUnits.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.Name = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.Description = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.Organization.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.Organization.Name = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.Organization.LogoUrl = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.TrainingStatusId.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.TrainingStatusId.Name = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.PrimaryTrainerId.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.PrimaryTrainerId.FirstName = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.PrimaryTrainerId.LastName = reader.GetSafeString(startingIndex++);
            trainee.TrainingUnits.CreatedBy = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnits.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            trainee.User.Id = reader.GetSafeInt32(startingIndex++);
            trainee.User.Email = reader.GetSafeString(startingIndex++);
            trainee.User.FirstName = reader.GetSafeString(startingIndex++);
            trainee.User.LastName = reader.GetSafeString(startingIndex++);
            trainee.User.Mi = reader.GetSafeString(startingIndex++);
            trainee.User.AvatarUrl = reader.GetSafeString(startingIndex++);

            return trainee;
        }

        private static TraineeV3 SingleTraineeMapperV3(IDataReader reader, ref int startingIndex)
        {
            TraineeV3 trainee = new TraineeV3();
            trainee.TraineeStatus = new LookUp();
            trainee.User = new User();

            trainee.Id = reader.GetSafeInt32(startingIndex++);
            trainee.UserId = reader.GetSafeInt32(startingIndex++);
            trainee.TrainingUnitId = reader.GetSafeInt32(startingIndex++);
            trainee.TraineeStatus.Id = reader.GetSafeInt32(startingIndex++);
            trainee.TraineeStatus.Name = reader.GetSafeString(startingIndex++);

            trainee.User.Email = reader.GetSafeString(startingIndex++);
            trainee.User.FirstName = reader.GetSafeString(startingIndex++);
            trainee.User.LastName = reader.GetSafeString(startingIndex++);
            trainee.User.Mi = reader.GetSafeString(startingIndex++);
            trainee.User.AvatarUrl = reader.GetSafeString(startingIndex++);

            return trainee;
        }

        private static InviteTrainees SingleInviteTraineeMapper(IDataReader reader, ref int startingIndex)
        {
            InviteTrainees inviteTrainees = new InviteTrainees();

            inviteTrainees.TrainingUnitId = reader.GetSafeInt32(startingIndex++);
            inviteTrainees.Token = reader.GetSafeString(startingIndex++);
            inviteTrainees.FirstName = reader.GetSafeString(startingIndex++);
            inviteTrainees.lastName = reader.GetSafeString(startingIndex++);
            inviteTrainees.Email = reader.GetSafeString(startingIndex++);
            inviteTrainees.Username = reader.GetSafeString(startingIndex++);
            inviteTrainees.AvatarUrl = reader.GetSafeString(startingIndex++);
            inviteTrainees.ExpirationDate = reader.GetSafeDateTime(startingIndex++);
            inviteTrainees.CreatedBy = reader.GetSafeInt32(startingIndex++);
            inviteTrainees.DateCreated = reader.GetSafeDateTime(startingIndex++);


            return inviteTrainees;
        }
        private static TraineeGroupMember TraineeGroupMemberMapper(IDataReader reader)
        {
            int i = 0;
            TraineeGroupMember trainee = new TraineeGroupMember();
            trainee.Id = reader.GetSafeInt32(i++);
            trainee.Username = reader.GetSafeString(i++);
            trainee.AvatarUrl = reader.GetSafeString(i++);
            trainee.ZoneGroupName = reader.GetSafeString(i++);
            trainee.TrainingUnitId = reader.GetSafeInt32(i++);
            trainee.TraineeStatusId = reader.GetSafeInt32(i++);
            trainee.IsConfirmed = reader.GetSafeBool(i++);

            return trainee;
        }
        private static void AddCommonParamsMapper(TraineeAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@UserId", userId);
            col.AddWithValue("@TrainingUnitId", model.TrainingUnitId);
            col.AddWithValue("@TraineeStatusId", model.TraineeStatusId);
        }
        private static void AddCommonParamsMapperV2(InviteTraineeAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@TrainingUnitId", model.TrainingUnitId);
            col.AddWithValue("@Token", model.Token);
            col.AddWithValue("@FirstName", model.FirstName);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@Username", model.Username);
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);
            col.AddWithValue("@UserId", userId);
        }

        public void ConfirmTrainee(string token)
        {
            string procName = "[dbo].[Trainees_Confirm]";

            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {

                    col.AddWithValue("@Token", token);
                }
                );

        }


    }


}


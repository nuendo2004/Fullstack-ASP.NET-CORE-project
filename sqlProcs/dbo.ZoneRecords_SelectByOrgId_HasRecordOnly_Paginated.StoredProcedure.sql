USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneRecords_SelectByOrgId_HasRecordOnly_Paginated]    Script Date: 4/3/2023 5:42:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Wen Xue>
-- Create date: <04/03/2023>
-- Description:	<Select Trainees have accessed zones by organization id with pagination>
-- Code Reviewer:<William Chung>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ZoneRecords_SelectByOrgId_HasRecordOnly_Paginated]
				@PageIndex int,
				@PageSize int,
				@OrgId int
as
/*

	exec [dbo].[ZoneRecords_SelectByOrgId_HasRecordOnly_Paginated] 0, 200, 27
*/


begin
		declare @offset int = @PageIndex * @PageSize
		select
				t.Id as TraineeId,
				t.TrainingUnitId,
				[User] = (
					select u.Id,
						u.Email,
						u.firstName,
						u.Mi,
						u.LastName,
						u.AvatarUrl
					from dbo.Users as u
					where u.Id = t.UserId
					for json auto, without_array_wrapper
				),					
				Record = (
					select top 20
						al.Id, 
						al.DateCreated as TimeAccessed,		
						Device = (
							select dt.[Name]
							from dbo.DeviceTypes as dt
							where dt.Id = al.DeviceTypeId),
						json_query((
								select z.[Id]
								,z.[Name]
								,z.[Description] 
								,z.ImageUrl,
								ZoneType = (
									select zt.[Name]
									from dbo.ZoneTypes as zt
									where z.ZoneTypeId = zt.Id
								),
								ZoneStatus = (
									select zs.[Name]
									from dbo.ZoneStatus as zs
									where z.ZoneStatusId = zs.Id
								)
								FROM dbo.Zones AS z
								Where z.Id = al.ZoneId AND z.IsDeleted = 0
								for json auto, without_array_wrapper))
								as [Zone]								
						from dbo.AccessLogs as al
						where al.EntityId = t.Id and al.zoneId is not null
						order by al.DateCreated desc
						for json auto
				),
				TotalCount = count(1) over()
		from dbo.Trainees as t
		where t.TrainingUnitId in (
			select tu.Id
			from dbo.TrainingUnits as tu
			where tu.OrganizationId = @OrgId) and t.Id in (
			select 
			al.EntityId from dbo.AccessLogs as al
			where
			al.EntityId = t.Id and al.zoneId is not null)

		order by t.Id
		offset @offset rows
		fetch next @PageSize rows only


end



GO

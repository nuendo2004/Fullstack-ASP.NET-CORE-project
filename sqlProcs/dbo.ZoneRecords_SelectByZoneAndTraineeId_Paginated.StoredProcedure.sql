USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneRecords_SelectByZoneAndTraineeId_Paginated]    Script Date: 4/3/2023 5:42:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Wen Xue>
-- Create date: <04/03/2023>
-- Description:	<Select accessed log in specific zone by trainee id with pagination>
-- Code Reviewer:Code Reviewer:<William Chung>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ZoneRecords_SelectByZoneAndTraineeId_Paginated]
				@PageIndex int,
				@PageSize int,
				@ZoneId int,
				@TraineeId int
as
/*

	exec [dbo].[ZoneRecords_SelectByZoneAndTraineeId_Paginated] 0, 10, 7, 127
	
	*/


begin
		declare @offset int = @PageIndex * @PageSize				
		select 
			al.Id, 
			al.DateCreated as TimeAccessed,	
			Device = (
				select dt.[Name]
				from dbo.DeviceTypes as dt
				where dt.Id = al.DeviceTypeId),
			[Zone] = json_query((
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
					for json auto, without_array_wrapper)),
					
			TotalCount = count(1) over()
			from dbo.AccessLogs as al
			where al.EntityId = @TraineeId and al.ZoneId = @ZoneId
			order by al.DateCreated desc
			offset @offset rows
			fetch next @PageSize rows only
			
end



GO

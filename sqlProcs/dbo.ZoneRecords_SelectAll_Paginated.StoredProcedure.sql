USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneRecords_SelectAll_Paginated]    Script Date: 4/3/2023 5:42:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Wen Xue>
-- Create date: <04/03/2023>
-- Description:	<Select accessed log with pagination>
-- Code Reviewer:<William Chung>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc [dbo].[ZoneRecords_SelectAll_Paginated]
				@PageIndex int,
				@PageSize int
as
/*
	exec [dbo].[ZoneRecords_SelectAll_Paginated] 0, 200
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
						zr.Id, 
						zr.DateCreated as TimeAccessed,					
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
								Where z.Id = zr.ZoneId AND z.IsDeleted = 0
								for json auto, without_array_wrapper))
								as [Zone]								
						from dbo.ZoneRecords as zr
						where zr.TraineeId = t.Id
						order by zr.DateCreated desc
						for json auto
				),
				TotalCount = (select count(UserId) from dbo.Trainees)
		from dbo.Trainees as t
		order by t.Id
		offset @offset rows
		fetch next @PageSize rows only


end



GO

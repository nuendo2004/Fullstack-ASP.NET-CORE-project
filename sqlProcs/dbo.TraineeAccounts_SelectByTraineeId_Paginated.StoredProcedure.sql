USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_SelectByTraineeId_Paginated]    Script Date: 11/7/2022 12:20:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <10/23/2022>
-- Description: <Returns paginated results for TraineeAccounts by TraineeId.>
-- Code Reviewer: Michael Valdez

-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 11/7/2022
-- Code Reviewer: Thinzar Soe
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_SelectByTraineeId_Paginated]
					@PageIndex int
					,@PageSize int
					,@TraineeId int
					
as

/* ----- Test Code -----

	Declare @PageIndex int = 0
		,@PageSize int = 10
		,@TraineeId int = 7

	Execute [dbo].[TraineeAccounts_SelectByTraineeId_Paginated] 
		@PageIndex
		,@PageSize
		,@TraineeId

*/

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT ta.Id
			,ta.Username		  
			,ta.AvatarUrl
			,z.Id as ZoneId
			,z.[Name] as ZoneName
			,z.[Description] as ZoneDescription
			,zt.Id as ZoneTypeId
			,zt.[Name] as ZoneTypeName
			,zs.Id as ZoneStatusId
			,zs.[Name] as ZoneStatusName
			,z.IsDeleted
			,t.Id as TraineeId
			,t.UserId as TraineeUserId
			,tu.Id as TrainingUnitId
			,ts.Id as TraineeStatusId
			,ts.[Name] as TraineeStatusName
			,t.IsDeleted
			,a.Id as AccountStatusId
			,a.[Name] as AccountStatusName
		  ,TotalCount = COUNT(1) OVER ()

	FROM [dbo].[TraineeAccounts] as ta JOIN dbo.Zones as z
			ON ta.ZoneId = z.Id
			JOIN dbo.ZoneTypes as zt
			ON z.ZoneTypeId = zt.Id
			JOIN dbo.ZoneStatus as zs
			ON z.ZoneStatusId = zs.Id
			JOIN dbo.Trainees as t
			ON ta.TraineeId = t.Id
			JOIN dbo.TrainingUnits as tu
			ON t.TrainingUnitId = tu.Id
			JOIN dbo.TraineeStatus as ts
			ON t.TraineeStatusId = ts.Id
			JOIN dbo.AccountStatus as a
			ON ta.AccountStatusId = a.Id
	WHERE ta.TraineeId = @TraineeId
	ORDER BY ta.TraineeId

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
GO

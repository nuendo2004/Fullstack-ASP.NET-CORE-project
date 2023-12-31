USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_SelectById]    Script Date: 10/29/2022 7:11:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <10/23/2022>
-- Description: <Selects TraineeAccounts by Id.>
-- Code Reviewer: Michael Valdez

-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 10/28/2022
-- Code Reviewer: Miyah Robinson
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_SelectById]
				@Id int

as

/* ----- Test Code -----

	Declare @Id int = 3;

	Execute [dbo].[TraineeAccounts_SelectById] @Id
	
*/


BEGIN

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

	WHERE ta.Id = @Id

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_Select_Dropdowns]    Script Date: 12/1/2022 10:34:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <12/1/2022>
-- Description: <Selects all data needed for TraineeAccounts dropdowns.>
-- Code Reviewer: Thinzar Soe

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_Select_Dropdowns]				

as

/* ----- Test Code -----
	
	Execute [dbo].[TraineeAccounts_Select_Dropdowns]
	
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

			,o.Id as OrganizationId

			,u.Id as UsersId
			,u.Email as UsersEmail
			,u.FirstName as UsersFirstName
			,u.LastName as UsersLastName
			,u.Mi as UsersMi
			
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

			inner join dbo.Organizations as o
			ON tu.OrganizationId = o.Id
			inner join dbo.Users as u
			ON t.UserId = u.Id			
			
	WHERE (a.Id = 1)
	AND (t.IsDeleted= 0)
	AND (tu.OrganizationId = o.Id);	

END
GO

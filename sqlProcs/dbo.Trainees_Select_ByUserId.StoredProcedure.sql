USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Trainees_Select_ByUserId]    Script Date: 12/12/2022 3:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Miyah R.>
-- Create date: <10/26/2022>
-- Description: <Insert of Trainee>
-- Code Reviewer:Micheal

-- MODIFIED BY: Andrew Ramirez
-- MODIFIED DATE:12/12/2022
-- Code Reviewer:
-- Note:
-- =============================================


CREATE PROC [dbo].[Trainees_Select_ByUserId]
	@UserId int

/*
	
	DECLARE @Id int = 20
	
	EXECUTE [dbo].[Trainees_Select_ByUserId]
			@Id
	
*/

AS

BEGIN

	SELECT t.Id
		,t.UserId as Trainees
		,t.TrainingUnitId
		,t.TraineeStatusId
		,ts.[Name]
		,t.IsDeleted
		,t.CreatedBy
		,t.ModifiedBy
		,t.DateCreated
		,t.DateModified
		,tu.Id
		,tu.[Name] as TrainingUnits
		,tu.[Description]
		,tu.OrganizationId
		,tu.TrainingStatusId
		,tu.PrimaryTrainerId
		,pTrainer.FirstName as pTrainerFirstName
		,pTrainer.LastName as pTrainerLastName
		,o.Id as Organizations
		,o.OrganizationTypeId
		,o.[Name]
		,o.[Description]
		,o.LogoUrl
		,o.BusinessPhone
		,O.SiteUrl
		,o.IsDeleted
		,U.Id as Users
		,U.Email
		,U.FirstName
		,U.LastName
		,U.Mi
		,U.AvatarUrl
		,TotalCount = Count(1) Over()
		
	FROM dbo.Trainees as t INNER JOIN TrainingUnits as tu
		ON t.TrainingUnitId = tu.Id
			INNER JOIN dbo.Users as pTrainer
				ON tu.PrimaryTrainerId = pTrainer.Id
		INNER JOIN dbo.Organizations as o
			ON tu.OrganizationId = o.Id
		INNER JOIN dbo.Users as u
			ON t.UserId = u.Id
		INNER JOIN TraineeStatus as ts
			ON t.TraineeStatusId = ts.Id

  WHERE	(
			t.[IsDeleted] = 0
			AND
			t.[UserId] = @UserId
			)
END





	
		

GO

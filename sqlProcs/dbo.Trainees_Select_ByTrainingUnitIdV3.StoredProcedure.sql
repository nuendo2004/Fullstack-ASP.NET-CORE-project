USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Trainees_Select_ByTrainingUnitIdV3]    Script Date: 12/12/2022 3:38:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Ramirez, Andrew>
-- Create date: <12/12/2022>
-- Description: <Updated .NET mapper, modified procs to match>
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE PROC [dbo].[Trainees_Select_ByTrainingUnitIdV3]
		@TrainingUnitId int

/*
	
	DECLARE @TrainingUnitId int = 1
	
	EXECUTE [dbo].[Trainees_Select_ByTrainingUnitIdV3]
			@TrainingUnitId
	
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
		,o.SiteUrl
		,o.IsDeleted
		,U.Id as Users
		,U.Email
		,U.FirstName
		,U.LastName
		,U.Mi
		,U.AvatarUrl

		
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
		t.[TrainingUnitId] = @TrainingUnitId
		)
END
GO

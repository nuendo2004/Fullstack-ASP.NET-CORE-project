USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Trainees_Select_ByTrainingUnitIdV2]    Script Date: 12/12/2022 2:58:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Jacob Helton>
-- Create date: <12/8/2022>
-- Description: <Selects all trainees from a training unit by id>
-- Code Reviewer: Erin Dupree

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE PROC [dbo].[Trainees_Select_ByTrainingUnitIdV2]
	@TrainingUnitId int

/*
	
	DECLARE @TrainingUnitId int = 1
	
	EXECUTE [dbo].[Trainees_Select_ByTrainingUnitIdV2]
			@TrainingUnitId
	
*/

AS

BEGIN

SELECT t.Id
		,t.UserId as TraineeUserId
		,t.TrainingUnitId
		,t.TraineeStatusId
		,ts.[Name] as TraineeStatus
		,U.Email as UserEmail
		,U.FirstName
		,U.LastName
		,U.Mi
		,U.AvatarUrl
		
	FROM dbo.Trainees as t inner join TrainingUnits as tu
		ON t.TrainingUnitId = tu.Id
	inner join dbo.Users as u
		ON t.UserId = u.Id
    inner join TraineeStatus as ts
		ON t.TraineeStatusId = ts.Id

  WHERE	(
			t.[IsDeleted] = 0
			AND
			ts.[Name] = 'Active'
			AND
			t.[TrainingUnitId] = @TrainingUnitId
			)
END





	
		

GO

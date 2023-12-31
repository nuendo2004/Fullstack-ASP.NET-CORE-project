USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_SelectAllV2]    Script Date: 11/22/2022 5:21:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/21/2022>
-- Description: < Training Unit Select All>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[TrainingUnits_SelectAllV2]

AS

/*
	select * 
	from dbo.TrainingUnits

Execute [dbo].[TrainingUnits_SelectAllV2]


*/

BEGIN

	SELECT t.Id
			,t.[Name]
			,t.[Description]
			,o.[Id] as OrganizationId
			,o.[Name] as Organizaton
			,o.[LogoUrl] 
			,ts.[Id] as TrainingStatusId
			,ts.[Name] as TrainingStatus
			,u.[Id] as PrimaryTrainerId
			,u.[FirstName]
			,u.[LastName]
			,t.[CreatedBy]
			,t.[ModifiedBy]
			,t.[DateCreated]
			,t.[DateModified]

	FROM dbo.TrainingUnits as t inner join Organizations as o
	ON t.OrganizationId = o.Id
	inner join TrainingStatus as ts
	on t.TrainingStatusId = ts.Id
	inner join Users as u
	ON t.PrimaryTrainerId = u.Id
END
GO

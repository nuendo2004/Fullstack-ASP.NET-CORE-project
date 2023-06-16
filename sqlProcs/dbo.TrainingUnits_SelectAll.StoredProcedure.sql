USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_SelectAll]    Script Date: 10/27/2022 3:54:34 PM ******/
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

CREATE PROC [dbo].[TrainingUnits_SelectAll]

AS

/*
	select * 
	from dbo.TrainingUnits

Execute [dbo].[TrainingUnits_SelectAll]


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
			,t.[PrimaryTrainerId]
			,t.[CreatedBy]
			,t.[ModifiedBy]

	FROM dbo.TrainingUnits as t inner join Organizations as o
	ON t.OrganizationId = o.Id
	inner join TrainingStatus as ts
	on t.TrainingStatusId = ts.Id
END
GO

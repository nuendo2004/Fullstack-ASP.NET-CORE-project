USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_Select_ByIdV2]    Script Date: 11/22/2022 5:21:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/21/2022>
-- Description: < Training Unit Select by Id>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[TrainingUnits_Select_ByIdV2]
	 @Id int
AS

/*
	Declare @Id int = 3;
Execute [dbo].[TrainingUnits_Select_ByIdV2] @Id
			

select * from dbo.TrainingUnits
*/

BEGIN

	SELECT t.Id
			,t.[Name]
			,t.[Description]
			,o.Id as OrganizationId
			,o.[Name] as Organizaton
			,o.[LogoUrl] 
			,ts.Id as TrainingStatusId
			,ts.[Name] as TrainingStatus
			,u.[Id] as PrimaryTrainerId
			,u.[FirstName]
			,u.[LastName]
			,t.[CreatedBy]
			,t.[ModifiedBy]
			
	FROM dbo.TrainingUnits as t inner join Organizations as o
	ON t.OrganizationId = o.Id
	inner join TrainingStatus as ts
	ON t.TrainingStatusId = ts.Id
	inner join Users as u
	ON t.PrimaryTrainerId = u.Id

	where t.Id = @Id
END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_Select_ByOrgId]    Script Date: 11/15/2022 12:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/21/2022>
-- Description: <Select Training Unit by Org Id and filter by Status >
-- Code Reviewer:Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[TrainingUnits_Select_ByOrgId]
		 
		 @PageIndex int
		 ,@PageSize int
		 ,@OrganizationId int
		 ,@Query int
AS

/*
	declare	@PageIndex int = 0
		   ,@PageSize int = 10
		   ,@OrganizationId int = 14
		   ,@Query int = 1

EXEC [dbo].[TrainingUnits_Select_ByOrgId] 
			@PageIndex 
			,@PageSize 
			,@OrganizationId
			,@Query

select*
from dbo.TrainingUnits
*/

BEGIN
	
	Declare @offset int = @PageIndex * @PageSize
	
	SELECT t.Id
			,t.[Name]
			,t.[Description]
			,o.[Id] as OrganizationId
			,o.[Name] as OrganizatonName
			,o.[LogoUrl] 
			,ts.[Id] as TrainingStatusId
			,ts.[Name] as TrainingStatus
			,t.[PrimaryTrainerId]
			,t.[CreatedBy]
			,t.[ModifiedBy]
			

	,TotalCount = COUNT(1) OVER()

	FROM dbo.TrainingUnits as t 
	inner join Organizations as o
	ON t.OrganizationId = o.Id
	inner join TrainingStatus as ts
	on t.TrainingStatusId = ts.Id

	WHERE (ts.[Id] = @Query and o.Id = @OrganizationId)
	 ORDER BY t.Id

		OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO

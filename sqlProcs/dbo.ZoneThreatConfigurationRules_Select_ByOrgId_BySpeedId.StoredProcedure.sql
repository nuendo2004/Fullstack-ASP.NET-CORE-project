USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneThreatConfigurationRules_Select_ByOrgId_BySpeedId]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Rana>
-- Create date: <10-21-2022,,>
-- Description: <	select by organization and speedCategory Id proc,,>
-- Code Reviewer:pablo

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[ZoneThreatConfigurationRules_Select_ByOrgId_BySpeedId]
    @PageIndex Int
   ,@PageSize Int
   ,@OrganizationId Int
   ,@SpeedCategoryId Int

as
/*
Declare @PageIndex int =0
        ,@PageSize int = 5
		 ,@OrganizationId int = 13
		,@SpeedCategoryId int= 1

Execute [dbo].[ZoneThreatConfigurationRules_Select_ByOrgId_BySpeedId]
@PageIndex
,@PageSize
,@OrganizationId
,@SpeedCategoryId


*/


BEGIN
Declare @offset int = @PageIndex * @PageSize

SELECT z.[Id]
       ,z.[Name]
       ,z.[Description]
       ,z.[OrganizationId]
       ,z.[SpreadLevelId]
       ,z.[SpeedCategoryId]
       ,z.[IsDeleted]
       ,z.[CreatedBy]
       ,z.[ModifiedBy]
       ,z.[DateCreated]
       ,z.[DateModified]
	   ,s.[Id]
	   ,s.[Name]
	   ,l.[Id]
	   ,l.[Name]
	   ,l.Description
	   ,o.Id
	   ,o.Name
	   ,[TotalCount]= COUNT(1) OVER()

	From dbo.ZoneThreatConfigurationRules as z INNER JOIN dbo.SpeedCategories as s
	ON z.SpeedCategoryId = s.Id
	INNER JOIN dbo.SpreadLevels l
	ON z.SpreadLevelId= l.Id
	inner join dbo.Organizations o
	ON z.OrganizationId= o.Id

	where (z.IsDeleted=0 AND z.OrganizationId=@OrganizationId AND z.SpeedCategoryId=@SpeedCategoryId)
	ORDER BY z.DateCreated

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

End
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneThreatConfigurationRules_Select_ById]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Author,,Rana>
-- Create date: <10-21-2022,,>
-- Description: <	Select proc by Id,,>
-- Code Reviewer:Brenda

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================



CREATE proc [dbo].[ZoneThreatConfigurationRules_Select_ById]
@Id int

as
/*

Declare  @Id int =1
Execute dbo.ZoneThreatConfigurationRules_Select_ById
@Id



*/

BEGIN
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

	From dbo.ZoneThreatConfigurationRules as z INNER JOIN dbo.SpeedCategories as s
	ON z.SpeedCategoryId = s.Id
	INNER JOIN dbo.SpreadLevels l
	ON z.SpreadLevelId= l.Id
	inner join dbo.Organizations o
	ON z.OrganizationId= o.Id

	WHERE z.Id =@Id
	ORDER BY z.Id

END
GO

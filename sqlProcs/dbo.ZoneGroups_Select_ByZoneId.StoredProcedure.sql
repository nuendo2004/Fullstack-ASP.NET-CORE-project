USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneGroups_Select_ByZoneId]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	< Rey Villasenor >
-- Create date: < 10/25/2022 >
-- Description:	< ZoneGroups_Select_ByZoneId (Paginated) (Filtered by isDeleted) Joins Zones, ZoneStatus, EntityTypes, and the Table described by Entity Types >
-- Code Reviewer: Justin Nguyen


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[ZoneGroups_Select_ByZoneId]
			@PageIndex int
			,@PageSize int
			,@ZoneId int
			
AS

/* --- TEST CODE :) ---

	DECLARE @PageIndex int = 0
			,@PageSize int = 10
			,@ZoneId int = 2

	EXECUTE [dbo].[ZoneGroups_Select_ByZoneId]
			@PageIndex
			,@PageSize
			,@ZoneId

	SELECT * FROM [dbo].[EntityTypes]
	SELECT * FROM [dbo].[Users]
	SELECT * FROM [dbo].[Zones]

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT zg.[Id]
		  ,zg.[Name]
		  ,zg.[Description]
		  ,zg.[ImageUrl]
		  ,ZoneBase = (SELECT [Id]
							  ,[Name]
							  ,[ZoneType] = (SELECT [Id]
													,[Name]
													FROM [dbo].[ZoneTypes]
													WHERE Id = z.ZoneTypeId
													FOR JSON AUTO)

							  ,[ZoneStatus] = (SELECT [Id]
														,[Name]
														FROM [dbo].[ZoneStatus]
														WHERE Id = z.ZoneStatusId
														FOR JSON AUTO)
							  ,[IsDeleted]
							  FROM [dbo].[Zones]
							  WHERE Id = zg.ZoneId
							  FOR JSON AUTO)

		  ,EntityType = (SELECT [Id]
								,[Name]
								FROM [dbo].[EntityTypes]
								WHERE Id = zg.EntityTypeId
								FOR JSON AUTO)
		  ,zg.[GroupAdminId]
		  ,zg.[IsDeleted]
		  ,zg.[DateCreated]
		  ,zg.[DateModified]
		  ,zg.[CreatedBy]
		  ,zg.[ModifiedBy]
		  ,COUNT(1) OVER() TotalCount

	FROM [dbo].[ZoneGroups] AS zg INNER JOIN [dbo].[Zones] AS z
		ON zg.ZoneId = z.Id
		INNER JOIN [dbo].[ZoneStatus] AS zs
		ON z.ZoneStatusId = zs.Id
		INNER JOIN [dbo].[EntityTypes] AS et
		ON zg.EntityTypeId = et.Id
		INNER JOIN [dbo].[ZoneTypes] AS zt
		ON z.ZoneTypeId = zt.Id

	WHERE	(
			zg.[IsDeleted] = 0
			AND
			zg.[ZoneId] = @ZoneId
			)
	ORDER BY zg.[Id]
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END

GO

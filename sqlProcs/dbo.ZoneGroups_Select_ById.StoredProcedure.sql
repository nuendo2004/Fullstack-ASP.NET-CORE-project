USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneGroups_Select_ById]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	< Rey Villasenor >
-- Create date: < 10/25/2022 >
-- Description:	< ZoneGroups_Select_ById Joins Zones, ZoneStatus, EntityTypes and the Table described by Entity Types >
-- Code Reviewer: Justin Nguyen


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[ZoneGroups_Select_ById]
			@Id int OUTPUT
			
AS

/* --- TEST CODE :) ---

	DECLARE @Id int = 7

	SELECT *
	FROM [dbo].[ZoneGroups]
	Where Id = @Id

	EXECUTE [dbo].[ZoneGroups_Select_ById]
			@Id

	SELECT * FROM [dbo].[EntityTypes]
	SELECT * FROM [dbo].[Users]
	SELECT * FROM [dbo].[Zones]

*/

BEGIN

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

	FROM [dbo].[ZoneGroups] AS zg INNER JOIN [dbo].[Zones] AS z
		ON zg.ZoneId = z.Id
		INNER JOIN [dbo].[ZoneStatus] AS zs
		ON z.ZoneStatusId = zs.Id
		INNER JOIN [dbo].[EntityTypes] AS et
		ON zg.EntityTypeId = et.Id
		INNER JOIN [dbo].[ZoneTypes] AS zt
		ON z.ZoneTypeId = zt.Id

	WHERE zg.Id = @Id

END

GO

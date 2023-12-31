USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneGroups_Update]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	< Rey Villasenor >
-- Create date: < 10/25/2022 >
-- Description:	< ZoneGroups_Update >
-- Code Reviewer: Justin Nguyen


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[ZoneGroups_Update]
			@Name nvarchar(200)
			,@Description nvarchar(200)
			,@ImageUrl nvarchar(255)
			,@ZoneId int
			,@EntityTypeId int
			,@GroupAdminId int
			,@ModifiedBy int
			,@Id int OUTPUT
			
AS

/* --- TEST CODE :) ---

	DECLARE @Id int = 4
			,@Name nvarchar(200) = '456 update testName'
			,@Description nvarchar(200) = 'update testDescription'
			,@ImageUrl nvarchar(255) = 'update testImageUrl'
			,@ZoneId int = 2
			,@EntityTypeId int = 3
			,@GroupAdminId int = 8
			,@ModifiedBy int = 17

	SELECT *
	FROM [dbo].[ZoneGroups]
	Where Id = @Id

	EXECUTE [dbo].[ZoneGroups_Update]
			@Name
			,@Description
			,@ImageUrl
			,@ZoneId
			,@EntityTypeId
			,@GroupAdminId
			,@ModifiedBy
			,@Id

	SELECT *
	FROM [dbo].[ZoneGroups]
	Where Id = @Id

	SELECT * FROM [dbo].[EntityTypes]
	SELECT * FROM [dbo].[Users]
	SELECT * FROM [dbo].[Zones]

*/

BEGIN

	DECLARE @dateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].[ZoneGroups]

	SET [Name] = @Name
      ,[Description] = @Description
      ,[ImageUrl] = @ImageUrl
      ,[ZoneId] = @ZoneId
      ,[EntityTypeId] = @EntityTypeId
      ,[GroupAdminId] = @GroupAdminId
      ,[DateModified] = @dateNow
      ,[ModifiedBy] = @ModifiedBy

	WHERE Id = @Id

END

GO

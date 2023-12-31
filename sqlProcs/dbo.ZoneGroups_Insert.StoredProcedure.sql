USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneGroups_Insert]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	< Rey Villasenor >
-- Create date: < 10/24/2022 >
-- Description:	< ZoneGroups_Insert >
-- Code Reviewer: Justin Nguyen


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[ZoneGroups_Insert]
			@Name nvarchar(200)
			,@Description nvarchar(200)
			,@ImageUrl nvarchar(255)
			,@ZoneId int
			,@EntityTypeId int
			,@GroupAdminId int
			,@CreatedBy int
			,@Id int OUTPUT
			
AS

/* --- TEST CODE :) ---

	DECLARE @Name nvarchar(200) = 'testName'
			,@Description nvarchar(200) = 'testDescription'
			,@ImageUrl nvarchar(255) = 'testImageUrl'
			,@ZoneId int = 2
			,@EntityTypeId int = 3
			,@GroupAdminId int = 8
			,@CreatedBy int = 8
			,@Id int = 0

	EXECUTE [dbo].[ZoneGroups_Insert]
			@Name
			,@Description
			,@ImageUrl
			,@ZoneId
			,@EntityTypeId
			,@GroupAdminId
			,@CreatedBy
			,@Id OUTPUT

	SELECT *
	FROM [dbo].[ZoneGroups]
	Where Id = @Id

	SELECT * FROM dbo.EntityTypes
	SELECT * FROM dbo.Users
	SELECT * FROM dbo.Zones


*/

BEGIN

	INSERT INTO [dbo].[ZoneGroups]
           ([Name]
           ,[Description]
           ,[ImageUrl]
           ,[ZoneId]
           ,[EntityTypeId]
           ,[GroupAdminId]
           ,[CreatedBy]
           ,[ModifiedBy])
     
	VALUES	(@Name
			,@Description
			,@ImageUrl
			,@ZoneId
			,@EntityTypeId
			,@GroupAdminId
			,@CreatedBy
			,@CreatedBy)

		SET @Id = SCOPE_IDENTITY()

END

GO

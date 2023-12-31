USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneGroups_Update_IsDeleted_ById]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	< Rey Villasenor >
-- Create date: < 10/25/2022 >
-- Description:	< (Delete) ZoneGroups_Update_IsDeleted_ById (Not a true delete - updates isDeleted to 1 >
-- Code Reviewer: Justin Nguyen


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[ZoneGroups_Update_IsDeleted_ById]
			@ModifiedBy int
			, @Id int OUTPUT
			
AS

/* --- TEST CODE :) ---

	DECLARE @ModifiedBy int = 17
			, @Id int = 8
			
	SELECT *
	FROM [dbo].[ZoneGroups]
	Where Id = @Id

	EXECUTE [dbo].[ZoneGroups_Update_IsDeleted_ById]
			@ModifiedBy
			,@Id

	SELECT *
	FROM [dbo].[ZoneGroups]
	Where Id = @Id

*/

BEGIN

	DECLARE @dateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].[ZoneGroups]

	SET [IsDeleted] = 1
      ,[DateModified] = @dateNow
	  ,[ModifiedBy] = @ModifiedBy

	WHERE Id = @Id

END

GO

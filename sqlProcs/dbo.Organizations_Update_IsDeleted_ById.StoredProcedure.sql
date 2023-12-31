USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Update_IsDeleted_ById]    Script Date: 25/10/2022 00:10:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <10/19/2022>
-- Description: <Delete Organization By Id procedure. Sets [isDeleted] to 1.>
-- Code Reviewer: Patrick Hangartner

-- MODIFIED BY: author
-- MODIFIED DATE: 12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Organizations_Update_IsDeleted_ById]
	@Id int
	,@UserId int

/*
	DECLARE @Id int = 32
			,@UserId int = 17
	
	EXECUTE [dbo].[Organizations_Update_IsDeleted_ById]
			@Id
			,@UserId
	
	SELECT * 
	FROM [dbo].[Organizations]
	WHERE [Id] = @Id

*/

AS

BEGIN
	
	DECLARE @utcDateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].[Organizations]
	SET		[IsDeleted] = 1
			,[ModifiedBy] = @UserId
			,[DateModified] = @utcDateNow
	WHERE	[Id] = @Id

END
GO

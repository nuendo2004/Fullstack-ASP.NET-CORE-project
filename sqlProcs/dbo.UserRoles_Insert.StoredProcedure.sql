USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[UserRoles_Insert]    Script Date: 10/26/2022 6:25:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/25/2022>
-- Description: <Updates User Confirmed column to true. To be used after confirming email of User>
-- Code Reviewer: Patrick Hangartner

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[UserRoles_Insert]
	@UserId int
	,@RoleId int

AS

/*
	DECLARE @UserId int = 22
			,@RoleId int = 1
	
	EXECUTE dbo.UserRoles_Insert
			@UserId
		   ,@RoleId

	SELECT *
	FROM dbo.UserRoles
*/

BEGIN

	INSERT INTO [dbo].[UserRoles]
			   ([UserId]
			   ,[RoleId])
	VALUES
           (@UserId
		   ,@RoleId)

END
GO

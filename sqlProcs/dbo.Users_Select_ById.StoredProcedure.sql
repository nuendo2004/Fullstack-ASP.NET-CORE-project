USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_ById]    Script Date: 10/26/2022 6:25:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/19/2022>
-- Description: <Selects User by Id>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[Users_Select_ById]
	@Id int
AS

/*
	DECLARE @Id int = 17
	EXECUTE dbo.Users_Select_ById @Id
*/

BEGIN

	SELECT [Id]
		  ,[Email]
		  ,[FirstName]
		  ,[LastName]
		  ,[Mi]
		  ,[AvatarUrl]
		  ,[IsConfirmed]
		  ,[StatusTypeId]
		  ,[DateCreated]
		  ,[DateModified]
	  FROM [dbo].[Users]
	  WHERE Id = @Id

END


GO

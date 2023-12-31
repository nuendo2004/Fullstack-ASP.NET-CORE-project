USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 3/30/2023 3:59:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Thad Szyplik>
-- Create date: <03/22/2022>
-- Description: <Selects all>
-- Code Reviewer: Andy Garcia

-- MODIFIED BY: Thad Szyplik
-- MODIFIED DATE: 03/22/2023
-- Code Reviewer: Andy Garcia
-- Note:
-- =============================================
CREATE PROC [dbo].[Users_SelectAll]


AS

/*

	EXECUTE dbo.Users_SelectAll 

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
		,COUNT(1) OVER() TotalCount
	FROM [dbo].[Users]

	ORDER BY Id

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Select_ByTokenTypeId]    Script Date: 10/26/2022 6:25:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/19/2022>
-- Description: <Selects UserTokens by TokenTypeId>
-- Code Reviewer: Pablo Alberto Pantaleo Demaldé

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[UserTokens_Select_ByTokenTypeId]
	@TokenTypeId int

AS

/*
	DECLARE @TokenTypeId int = 1

	EXECUTE dbo.UserTokens_Select_ByTokenTypeId @TokenTypeId
*/

BEGIN

	SELECT [Token]
			,[UserId]
			,[TokenTypeId]
	FROM [dbo].[UserTokens]
	WHERE TokenTypeId = @TokenTypeId

END


GO

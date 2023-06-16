USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Messages_Delete_ById]    Script Date: 10/31/2022 22:13:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Joe Medina>
-- Create date: <10/30/2022>
-- Description: <Delete Message>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE: <10/30/2022>
-- Code Reviewer: Damian Stella
-- Note:
-- =============================================
CREATE proc [dbo].[Messages_Delete_ById]
	@Id int

AS

/*

DECLARE @Id int = 10

EXECUTE dbo.Messages_Delete_ById
	@Id

*/

BEGIN

	UPDATE	dbo.Messages
	SET		IsDeleted = 1
	WHERE	Id = @Id

END
GO

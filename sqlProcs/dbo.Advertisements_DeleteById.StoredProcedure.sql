USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Advertisements_DeleteById]    Script Date: 14/11/2022 16:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <11/10/2022>
-- Description: <Advertisements delete by id. It sets the isDisabled flag to 1>
-- Code Reviewer: <Damian Stella>

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Advertisements_DeleteById]
		@Id int
		,@UserId int

/*
	
	DECLARE	@id int = 4
			,@userId int = 20
			
	EXECUTE dbo.Advertisements_SelectById @id

	EXECUTE dbo.Advertisements_DeleteById	@id
											,@userId

	EXECUTE dbo.Advertisements_SelectById @id

*/

AS

BEGIN
	
	DECLARE @utcDateNow datetime2 = GETUTCDATE()

	UPDATE dbo.Advertisements
	SET IsDisabled = 1
		,ModifiedBy = @UserId
		,DateModified = @utcDateNow
	WHERE	(
			Id = @Id
			AND
			IsDisabled = 0
			)

END

GO

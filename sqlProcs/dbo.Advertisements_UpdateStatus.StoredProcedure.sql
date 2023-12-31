USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Advertisements_UpdateStatus]    Script Date: 14/11/2022 16:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <11/14/2022>
-- Description: <Advertisements update status. Sets or clears the IsDisabled bit at provided Id>
-- Code Reviewer: <Damian Stella>

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Advertisements_UpdateStatus]
		@Status bit
		,@UserId int
		,@Id int

/*
	
	DECLARE	@isDisabled bit = 1
			,@userId int = 20
			,@id int = 15
	
	SELECT *
	FROM dbo.Advertisements
	WHERE Id = @id

	EXECUTE dbo.Advertisements_UpdateStatus
			@isDisabled
			,@userId
			,@id

	SELECT *
	FROM dbo.Advertisements
	WHERE Id = @id

*/

AS

BEGIN
	
	DECLARE @utcTimeNow datetime2 = GETUTCDATE()

	UPDATE dbo.Advertisements
	SET IsDisabled = @Status
		,ModifiedBy = @UserId
		,DateModified = @utcTimeNow
	WHERE Id = @Id

END
GO

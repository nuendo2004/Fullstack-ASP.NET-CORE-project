USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_Delete_ById]    Script Date: 3/10/2023 2:07:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<David Phan>
-- Create date: <02/23/2023>
-- Description:	<Delete record for Surveys>
-- Code Reviewer: Ricky Damazio

-- MODIFIED BY: David Phan
-- MODIFIED DATE: 03/07/2023
-- Code Reviewer:
-- Note: Instructor didn't want a hard delete
-- =============================================
CREATE PROCEDURE [dbo].[Surveys_Delete_ById] 
		@Id int
		,@ModifiedBy int
AS

/*  Test Script

	Declare @Id int = 1
			,@ModifiedBy int = 91
			
	EXECUTE [dbo].[Surveys_Delete_ById] 
				@Id
				,@ModifiedBy

	SELECT * FROM dbo.Surveys
*/

BEGIN

	UPDATE [dbo].[Surveys]
	SET [StatusId] = 2
		,[ModifiedBy] = @ModifiedBy
		,[DateModified] = GETUTCDATE()
	WHERE Id = @Id

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_Update]    Script Date: 3/10/2023 2:07:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<David Phan>
-- Create date: <02/23/2023>
-- Description:	<Update record for Surveys>
-- Code Reviewer: Ricky Damazio

-- MODIFIED BY: David Phan
-- MODIFIED DATE: 03/09/2023
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[Surveys_Update] 
	 @Name nvarchar(100)
	,@Description nvarchar(2000)
	,@StatusId int
	,@SurveyTypeId int
	,@ModifiedBy int
	,@Id int

AS

/*  Test Script

	Declare @Name nvarchar(100) = 'TestNameUpdated'
			,@Description nvarchar(2000) = 'TestDescriptionUpdated'
			,@StatusId int = 1
			,@SurveyTypeId int = 2
			,@ModifiedBy int = 91
			,@Id int = 3;

	EXECUTE [dbo].[Surveys_Update]
		@Name
		,@Description
		,@StatusId
		,@SurveyTypeId
		,@ModifiedBy
		,@Id

		SELECT * FROM dbo.Surveys
*/

BEGIN

	UPDATE [dbo].[Surveys]
	SET [Name] = @Name
		,[Description] = @Description 
		,[StatusId] = @StatusId
		,[SurveyTypeId] = @SurveyTypeId
		,[ModifiedBy] = @ModifiedBy
		,[DateModified] = GETUTCDATE()
	WHERE Id = @Id

END
GO

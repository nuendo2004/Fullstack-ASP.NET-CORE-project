USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestions_Update]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/23/2023>
-- Description:	<Update record for SurveyQuestions>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestions_Update] 
	         @CreatedBy int
			,@ModifiedBy int
			,@Question nvarchar(500)
			,@HelpText nvarchar(255)
			,@IsRequired bit
			,@isMultipleAllowed bit
			,@QuestionTypeId int
			,@SurveyId int
			,@StatusId int 
			,@SortOrder int
			,@Id int 

AS

/*  Test Script

		Declare  @ModifiedBy int = 23
				,@Question nvarchar(500) = 'TestQuestionUpdate'
				,@HelpText nvarchar(255) = 'TestHelpTextUpdate'
				,@IsRequired bit = 0
				,@isMultipleAllowed bit = 0
				,@QuestionTypeId int = 1
				,@SurveyId int = 1
				,@StatusId int = 1 
				,@SortOrder int = 1
				,@Id int = 13

	EXECUTE [dbo].[SurveyQuestions_Update]
	             @ModifiedBy
				,@Question
				,@HelpText
				,@IsRequired
				,@isMultipleAllowed
				,@QuestionTypeId
				,@SurveyId
				,@StatusId
				,@SortOrder
			    ,@Id 

*/

BEGIN

	UPDATE [dbo].[SurveyQuestions]

	SET 	     [ModifiedBy] = @ModifiedBy
				,[Question] = @Question
				,[HelpText] = @HelpText
				,[IsRequired] = @IsRequired
				,[isMultipleAllowed] = @isMultipleAllowed
				,[QuestionTypeId] = @QuestionTypeId
				,[SurveyId] = @SurveyId
				,[StatusId] = @StatusId
				,[SortOrder] = @SortOrder
				,[DateModified] = GETUTCDATE()

	WHERE Id = @Id

END
GO

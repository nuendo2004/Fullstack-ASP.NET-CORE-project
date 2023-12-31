USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestions_Insert]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/23/2023>
-- Description:	<Create record for SurveyQuestions>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestions_Insert] 
			 @CreatedBy int
			,@ModifiedBy int
			,@Question nvarchar(500)
			,@HelpText nvarchar(255)
			,@IsRequired bit
			,@IsMultipleAllowed bit
			,@QuestionTypeId int
			,@SurveyId int
			,@StatusId int 
			,@SortOrder int
			,@Id int OUTPUT

AS

/*  Test Script

		Declare  @CreatedBy int = 23
				,@ModifiedBy int  = 23
				,@Question nvarchar(500) = 'TestQuestion'
				,@HelpText nvarchar(255) = 'TestHelpText'
				,@IsRequired bit = 0
				,@IsMultipleAllowed bit = 0
				,@QuestionTypeId int = 1
				,@SurveyId int = 1
				,@StatusId int = 1 
				,@SortOrder int = 1
				,@Id int = 0;

	EXECUTE dbo.SurveyQuestions_Insert
			     @CreatedBy 
				,@ModifiedBy 
				,@Question
				,@HelpText
				,@IsRequired
				,@IsMultipleAllowed
				,@QuestionTypeId
				,@SurveyId
				,@StatusId
				,@SortOrder
			    ,@Id OUTPUT

	Select * 
	From dbo.SurveyQuestions

*/

BEGIN

	INSERT INTO [dbo].[SurveyQuestions]
				([CreatedBy]
				,[ModifiedBy]
				,[Question]
				,[HelpText]
				,[IsRequired]
				,[IsMultipleAllowed]
				,[QuestionTypeId]
				,[SurveyId]
				,[StatusId]
				,[SortOrder])
	VALUES
				(@CreatedBy
				,@ModifiedBy
				,@Question
				,@HelpText
				,@IsRequired
				,@IsMultipleAllowed
				,@QuestionTypeId
				,@SurveyId
				,@StatusId
				,@SortOrder)

	SET @Id = SCOPE_IDENTITY();

END
GO

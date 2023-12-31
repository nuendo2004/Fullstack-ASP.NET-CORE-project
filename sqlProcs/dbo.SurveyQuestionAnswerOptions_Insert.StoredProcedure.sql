USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestionAnswerOptions_Insert]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/24/2023>
-- Description:	<Create record for SurveyQuestionAnswerOptions>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestionAnswerOptions_Insert] 
			 
			 @QuestionId int
			,@Text nvarchar(500)
			,@Value nvarchar(100)
			,@AdditionalInfo  nvarchar(200)
			,@CreatedBy int
			,@ModifiedBy int
			,@Id int OUTPUT

AS

/*  Test Script



	Declare      @QuestionId int = 11
				,@Text nvarchar(500) = 'TestText'
				,@Value nvarchar(100) = 'TestText'
				,@AdditionalInfo  nvarchar(200) = 'TestText'
				,@CreatedBy int = 17
				,@ModifiedBy int = 17
				,@Id int = 0

	EXECUTE dbo.SurveyQuestionAnswerOptions_Insert
			     @QuestionId 
				,@Text
				,@Value 
				,@AdditionalInfo 
				,@CreatedBy
				,@ModifiedBy 
			    ,@Id 

	Select * 
	From dbo.SurveyQuestions



*/

BEGIN

	INSERT INTO [dbo].[SurveyQuestionAnswerOptions]
				([QuestionId]
				,[Text]
				,[Value]
				,[AdditionalInfo]
				,[CreatedBy]
				,[ModifiedBy])
	VALUES
				(@QuestionId
				,@Text
				,@Value
				,@AdditionalInfo
				,@CreatedBy
				,@ModifiedBy)

	SET @Id = SCOPE_IDENTITY();

END
GO

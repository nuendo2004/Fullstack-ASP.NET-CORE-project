USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestionAnswerOptions_Update]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/24/2023>
-- Description:	<Update record for SurveyQuestionAnswerOptions>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestionAnswerOptions_Update] 
	      	 @QuestionId int
			,@Text nvarchar(500)
			,@Value nvarchar(100)
			,@AdditionalInfo  nvarchar(200)
			,@CreatedBy int
			,@ModifiedBy int
			,@Id int 

AS

/*  Test Script

Select *
From dbo.SurveyQuestionAnswerOptions

	Declare      @QuestionId int = 11
				,@Text nvarchar(500) = 'TestTextUpdate1111'
				,@Value nvarchar(100) = 'TestTextUpdate1111'
				,@AdditionalInfo  nvarchar(200) = 'TestTextUpdate1111'
			    ,@CreatedBy int = 8
				,@ModifiedBy int = 8
				,@Id int = 20

	EXECUTE [dbo].[SurveyQuestionAnswerOptions_Update]
	             @QuestionId 
				,@Text
				,@Value 
				,@AdditionalInfo 
				,@CreatedBy
				,@ModifiedBy
			    ,@Id 

Select *
From dbo.SurveyQuestionAnswerOptions

*/

BEGIN

	UPDATE [dbo].[SurveyQuestionAnswerOptions]

	SET 	     [QuestionId] = @QuestionId
				,[Text] = @Text
				,[Value] = @Value
				,[AdditionalInfo] = @AdditionalInfo
				,[ModifiedBy] = @ModifiedBy
				,[DateModified] = GETUTCDATE()

	WHERE Id = @Id

END
GO

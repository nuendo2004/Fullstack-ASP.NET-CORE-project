USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_Batch_Insert]    Script Date: 4/3/2023 3:38:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
-- Author:		David Phan
-- Create date: <04/01/2023>
-- Description:	<Create multiple records for SurveyAnswers>
-- Code Reviewer: Ricky Damazio

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

 
CREATE proc [dbo].[SurveyAnswers_Batch_Insert]
			@BatchInsertSurveyAnswers dbo.BatchInsertSurveyAnswers READONLY
			,@Id int OUTPUT

as


/*
---------------TEST CODE---------------

DECLARE @batchInsertSurveyAnswers dbo.BatchInsertSurveyAnswers;

INSERT INTO @batchInsertSurveyAnswers (SurveyId, QuestionId, AnswerOptionId, Answer, AnswerNumber, UserId)
VALUES
    (20, 195, 34, 'test', NULL, NULL),
    (20, 324, 70, 'test2', NULL, NULL),
    (20, 325, 68, NULL, NULL, NULL),
    (20, 326, 66, NULL, NULL, NULL),
    (20, 327, 65, NULL, NULL, NULL);

DECLARE @Id INT;
EXEC [dbo].[SurveyAnswers_Batch_Insert] @batchInsertSurveyAnswers, @Id OUTPUT;

*/


BEGIN

	DECLARE @InstanceId int = 0

	INSERT INTO [dbo].[SurveysInstances]
			([SurveyId]
			,[UserId])

	(SELECT DISTINCT b.SurveyId
		   ,b.UserId					   
	 FROM @BatchInsertSurveyAnswers as b)

	SET @InstanceId = SCOPE_IDENTITY();

	INSERT INTO [dbo].[SurveyAnswers]
			([InstanceId]
			,[QuestionId]
			,[AnswerOptionId]
			,[Answer]
			,[AnswerNumber])

     (SELECT @InstanceId
			,b.QuestionId
			,b.AnswerOptionId
			,b.Answer
			,b.AnswerNumber				   
	 FROM @BatchInsertSurveyAnswers as b)

	SET @Id = Scope_Identity()


END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_Update]    Script Date: 2/27/2023 10:14:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Update record for SurveyAnswers>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

 
CREATE proc [dbo].[SurveyAnswers_Update]
			@SurveyId int
			,@QuestionId int
			,@AnswerOptionId int = NULL
			,@Answer nvarchar(500) = NULL
			,@AnswerNumber int = NULL
			,@UserId int = NULL
			,@Id int
 




as


/*
---------------TEST CODE---------------
Declare @Id int= 25;
	
	Declare
			@SurveyId int = 6
			,@QuestionId int = 1
			,@AnswerOptionId int = 1
			,@Answer nvarchar(500) = 'changed answer'
			,@AnswerNumber int = 1
			,@UserId int = 91

	Execute dbo.SurveyAnswers_Update
							--@InstanceId
							@SurveyId
							,@QuestionId
							,@AnswerOptionId
							,@Answer
							,@AnswerNumber
							,@UserId
							,@Id


	Select *
	From dbo.SurveyAnswers
	

	Select *
	From dbo.SurveysInstances

		select *
	FROM dbo.Surveys

	select *
	FROM dbo.SurveyQuestions
	
	select *
	FROM dbo.QuestionTypes

*/


BEGIN

	UPDATE [dbo].[SurveysInstances]
			SET [SurveyId] = @SurveyId
				,[UserId] = @UserId
				,[DateModified] = GETUTCDATE()

			WHERE Id = (
				Select sa.InstanceId
				FROM dbo.SurveyAnswers as sa
				WHERE sa.Id = @Id
				)


	UPDATE [dbo].[SurveyAnswers]
			SET [InstanceId] = (
				Select sa.InstanceId
				FROM dbo.SurveyAnswers as sa
				WHERE sa.Id = @Id
				)
			,[QuestionId] = @QuestionId
			,[AnswerOptionId] = @AnswerOptionId
			,[Answer] = @Answer
			,[AnswerNumber] = @AnswerNumber
			,[DateModified] = GETUTCDATE()

			WHERE @Id = Id

END
GO

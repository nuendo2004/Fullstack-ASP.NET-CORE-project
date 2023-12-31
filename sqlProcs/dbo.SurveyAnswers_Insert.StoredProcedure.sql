USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_Insert]    Script Date: 2/27/2023 10:14:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Create record for SurveyAnswers>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

 
CREATE proc [dbo].[SurveyAnswers_Insert]
			@SurveyId int
			,@QuestionId int
			,@AnswerOptionId int = NULL
			,@Answer nvarchar(500) = NULL
			,@AnswerNumber int = NULL
			,@UserId int = NULL
			,@Id int OUTPUT

as


/*
---------------TEST CODE---------------
Declare @Id int=0;
	
	Declare
			@SurveyId int =6
			,@QuestionId int = 12
			,@AnswerOptionId int = 6
			,@Answer nvarchar(500) = 'this is'
			,@AnswerNumber int = 1
			,@UserId int = 91

	Execute dbo.SurveyAnswers_Insert
							@SurveyId
							,@QuestionId
							,@AnswerOptionId
							,@Answer
							,@AnswerNumber
							,@UserId
							,@Id OUTPUT

	Select *
	From dbo.SurveyAnswers

	select *
	from dbo.SurveysInstances

	select *
	FROM dbo.Surveys

	select *
	FROM dbo.SurveyQuestions
	
	select *
	FROM dbo.QuestionTypes
	
	Select *
	From dbo.SurveyAnswers

	select *
	FROM dbo.SurveyQuestionAnswerOptions

	select * 
	From dbo.Users


	select * from dbo.AnswerOptions

*/


BEGIN

	DECLARE @InstanceId int = 0

	INSERT INTO [dbo].[SurveysInstances]
			([SurveyId]
			,[UserId])
     VALUES
			(@SurveyId
			,@UserId)

	SET @InstanceId = SCOPE_IDENTITY();

	INSERT INTO [dbo].[SurveyAnswers]
			([InstanceId]
			,[QuestionId]
			,[AnswerOptionId]
			,[Answer]
			,[AnswerNumber])
     VALUES
			(@InstanceId
			,@QuestionId
			,@AnswerOptionId
			,@Answer
			,@AnswerNumber)

	SET @Id = Scope_Identity()


END
GO

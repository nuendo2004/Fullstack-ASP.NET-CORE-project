USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_SelectAll]    Script Date: 2/27/2023 10:14:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Select all records from SurveyAnswers>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================


CREATE proc [dbo].[SurveyAnswers_SelectAll]
					@PageIndex int
					,@PageSize int
/*
----------TEST CODE--------------

	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE  [dbo].[SurveyAnswers_SelectAll] @PageIndex, @PageSize

	select *
	FROM dbo.SurveyAnswers

	select *
	from dbo.SurveysInstances

	select *
	FROM dbo.Surveys

*/

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT
			sa.Id
			,sa.InstanceId
			,si.SurveyId
			,s.[Name] as SurveyName
			,s.[Description] as [Description]
			,sa.QuestionId
			,sq.Question
			,sq.HelpText
			,sq.SortOrder
			,qt.Id as QuestionTypeId
			,qt.[Name] QuestionType
			,sa.AnswerOptionId
			,sqo.[Text] as [Text]
			,sqo.[Value] as [Value]
			,sa.AnswerNumber
			,sa.Answer
			,si.UserId
			,sa.DateCreated
			,sa.DateModified
			,[TotalCount] = COUNT(1) OVER()
	FROM dbo.SurveyAnswers as sa inner join dbo.SurveysInstances as si
			on sa.InstanceId = si.Id
			inner join dbo.Surveys as s
				on s.Id = si.SurveyId
					inner join dbo.SurveyQuestions as sq
					on sa.QuestionId = sq.Id
					inner join dbo.SurveyQuestionAnswerOptions as sqo
						on sa.AnswerOptionId = sqo.Id
						inner join dbo.QuestionTypes as qt
							on sq.QuestionTypeId = qt.Id

	ORDER BY Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	

END
GO

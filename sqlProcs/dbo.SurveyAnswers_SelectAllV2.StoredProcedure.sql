USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_SelectAllV2]    Script Date: 3/8/2023 10:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <03/04/2023>
-- Description:	<Select all records from SurveyAnswers V2>
-- Code Reviewer: Nathan Ro

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================


CREATE proc [dbo].[SurveyAnswers_SelectAllV2]
					@PageIndex int
					,@PageSize int
/*
----------TEST CODE--------------

	DECLARE @PageIndex int = 0
			,@PageSize int = 20

	EXECUTE  [dbo].[SurveyAnswers_SelectAllV2] @PageIndex, @PageSize

	select *
	FROM dbo.SurveyAnswers

	select *
	from dbo.SurveysInstances

	select *
	FROM dbo.Surveys

	select *
	FROM dbo.SurveyQuestions

	select *
	FROM dbo.QuestionTypes

	select *
	FROM dbo.SurveyQuestionAnswerOptions

*/

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT
			sa.Id
			,si.Id as InstanceId
			,si.SurveyId
			,s.[Name] as SurveyName
			,s.[Description] as [Description]
			,s.StatusId
			,st.[Name]
			,s.SurveyTypeId
			,sut.[Name]
			,questionDetails = (
					SELECT  sq.[Id]
						  ,sq.[Question]
						  ,sq.[HelpText]
						  ,sq.[IsRequired]
						  ,sq.[IsMultipleAllowed]
						  ,qt.[Id] 'questionType.id'
						  ,qt.[Name] 'questionType.name'
						  ,stp.[Id] 'statusType.id'
						  ,stp.[Name] 'statusType.name'
						  ,sq.[SortOrder]
					  FROM [dbo].[SurveyQuestions] as sq
						join dbo.SurveyAnswers sa
							on sa.QuestionId = sq.Id
								join dbo.QuestionTypes as qt
									on qt.Id = sq.QuestionTypeId
									inner join dbo.StatusTypes as stp
										on stp.Id = sq.StatusId
					  WHERE EXISTS
									(
									SELECT sq.Id
									FROM dbo.SurveyAnswers
									WHERE si.Id = sa.InstanceId
									
									)

					 for json path
			),
			answerOptionIdDetails = (
					SELECT  sqao.[Id]
						  ,sqao.[QuestionId]
						  ,[Text]
						  ,[Value]
						  ,[AdditionalInfo]
					 FROM dbo.SurveyQuestionAnswerOptions as sqao
							join dbo.SurveyAnswers as sa
							on sqao.Id = sa.AnswerOptionId

					 WHERE EXISTS
									(
									SELECT sa.AnswerOptionId
									FROM dbo.SurveyAnswers
									WHERE si.Id = sa.InstanceId
									
									)

					for json path
			)
			,sa.AnswerNumber as AnswerNumber
			,sa.Answer as Answer
			,si.UserId
			,sa.DateCreated
			,sa.DateModified
			,[TotalCount] = COUNT(1) OVER()
	FROM dbo.SurveysInstances as si 
	inner join dbo.Surveys as s on s.Id = si.SurveyId
		inner join dbo.SurveyAnswers as sa
			on si.Id = sa.InstanceId
			inner join dbo.StatusTypes as st
				on s.StatusId = st.Id
				inner join dbo.SurveyTypes as sut
					on s.SurveyTypeId = sut.Id

	ORDER BY Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_Select_BySurveyInstanceIdV2]    Script Date: 3/8/2023 10:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <03/04/2023>
-- Description:	<Select record by SurveyInstanceId from SurveyAnswers V2>
-- Code Reviewer: Nathan Ro

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================


CREATE proc [dbo].[SurveyAnswers_Select_BySurveyInstanceIdV2]
					@InstanceId int
/*
----------TEST CODE--------------
	DECLARE @InstanceId int = 48

	EXECUTE [dbo].[SurveyAnswers_Select_BySurveyInstanceIdV2] @InstanceId

	select *
	FROM dbo.SurveyAnswers
	
	select *
	FROM dbo.SurveyQuestions

	select *
	FROM dbo.SurveyQuestionAnswerOptions

	select *
	from dbo.SurveysInstances

	select *
	FROM dbo.Surveys

	select *
	FROM dbo.QuestionTypes


*/

AS

BEGIN


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
						  ,[Question]
						  ,[HelpText]
						  ,[IsRequired]
						  ,[IsMultipleAllowed]
						  ,[QuestionTypeId] 'questionType.id'
						  ,qt.[Name] 'questionType.name'
						  ,[StatusId] 'statusType.id'
						  ,st.[Name] 'statusType.name'
						  ,sq.[SortOrder]
					  FROM [dbo].[SurveyQuestions] as sq
						join dbo.SurveyAnswers sa
							on sa.QuestionId = sq.id
								join dbo.QuestionTypes as qt
									on qt.Id = sq.QuestionTypeId
									inner join dbo.StatusTypes as st
										on sq.StatusId = st.Id
					  WHERE sa.InstanceId = @InstanceId

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
					 WHERE sa.InstanceId = @InstanceId

					for json path
			)
			,sa.AnswerNumber as AnswerNumber
			,sa.Answer as Answer
			,si.UserId
			,sa.DateCreated
			,sa.DateModified
	FROM dbo.SurveysInstances as si 
	inner join dbo.Surveys as s on s.Id = si.SurveyId
		inner join dbo.SurveyAnswers as sa
			on si.Id = sa.InstanceId
			inner join dbo.StatusTypes as st
				on s.StatusId = st.Id
				inner join dbo.SurveyTypes as sut
					on s.SurveyTypeId = sut.Id
	

	WHERE @InstanceId = sa.InstanceId
	

END
GO

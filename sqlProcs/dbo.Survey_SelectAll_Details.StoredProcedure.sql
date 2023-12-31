USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Survey_SelectAll_Details]    Script Date: 3/18/2023 7:14:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<David Phan>
-- Create date: <03/18/2023>
-- Description:	<Return all survey with user information
--				and a JSON of Questions related to the survey 
--              and a JSON of Question Answer Options related
--              to Questions>
-- Code Reviewer: Sabrina Salgado
-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[Survey_SelectAll_Details] 
	@PageIndex int
	,@PageSize int

AS

/*  Test Script

DECLARE @PageIndex int = 0
		,@PageSize int = 100

EXEC [dbo].[Survey_SelectAll_Details] 
	@PageIndex
	,@PageSize

SELECT * FROM dbo.Surveys

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT	s.[Id]
			,s.[Name]
			,s.[Description]
			,s.[StatusId]
			,ss.[Name]
			,s.[SurveyTypeId]
			,st.[Name]
			,s.[CreatedBy]
			,u.[Email]
			,u.[FirstName]
			,u.[LastName]
			,u.[Mi]
			,u.[AvatarUrl]
			,s.[ModifiedBy]
			,s.[DateCreated]
			,s.[DateModified]
		
			,[Questions] = (SELECT	q.[Id]
									,q.[CreatedBy]
									,q.[ModifiedBy]
									,q.[Question]
									,q.[HelpText]
									,q.[IsRequired]
									,q.[IsMultipleAllowed]
									,qt.[Id] as 'QuestionType.Id'
									,qt.[Name] as 'QuestionType.Name'
									,q.[SurveyId]
									,ss.[Id] as 'Status.Id'
									,ss.[Name] as 'Status.Name'
									,q.[SortOrder]
									,q.[DateCreated]
									,q.[DateModified]
									,[QuestionAnswerOptions] =	(	SELECT	qao.[Id]
																			,qao.[QuestionId]
																			,qao.[Text]
																			,qao.[Value]
																			,qao.[AdditionalInfo]
																	FROM [dbo].[SurveyQuestionAnswerOptions] as qao
																	WHERE q.Id = qao.QuestionId
																	FOR JSON PATH
																)
							FROM [dbo].[SurveyQuestions] as q
							JOIN [dbo].[QuestionTypes] as qt
							ON q.QuestionTypeId = qt.Id
							JOIN [dbo].[SurveyStatus] as ss
							ON q.StatusId = ss.Id
							WHERE s.Id = q.SurveyId
							FOR JSON PATH
							)
			,COUNT(1) OVER() TotalCount
	FROM [dbo].[Surveys] as s
	JOIN [dbo].[SurveyStatus] as ss
		ON s.StatusId = ss.Id
	JOIN [dbo].[SurveyTypes] as st
		ON s.SurveyTypeId = st.Id
	JOIN [dbo].[Users] as u
		ON s.CreatedBy = u.Id
	ORDER BY S.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO

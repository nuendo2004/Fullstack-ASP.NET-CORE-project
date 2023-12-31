USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveysInstances_Select_ByCreatedByV2]    Script Date: 3/6/2023 6:12:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <03/04/2023>
-- Description:	<Select record by CreatedBy from SurveysInstances V2>
-- Code Reviewer: Nathan Ro

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

CREATE proc [dbo].[SurveysInstances_Select_ByCreatedByV2]
					@PageIndex int
					,@PageSize int
					,@CreatedBy int
/*
----------TEST CODE--------------
	DECLARE @CreatedBy int = 8
	
	DECLARE @PageIndex int = 0
			,@PageSize int = 10

	EXECUTE [dbo].[SurveysInstances_Select_ByCreatedByV2] @PageIndex, @PageSize, @CreatedBy

	select *
	FROM dbo.SurveysInstances

	select *
	FROM dbo.Surveys

*/

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT
			si.Id
			,si.SurveyId as SurveyId
			,s.[Name] as SurveyName
			,s.[Description] as SurveyDescription
			,answeredBy = (
				SELECT u.Id
					,u.Email
					,u.FirstName
					,u.LastName
					,u.Mi
					,u.AvatarUrl
				FROM dbo.Users as u
				WHERE EXISTS (
					SELECT si.UserId
					FROM dbo.SurveysInstances as si
					WHERE u.Id = @CreatedBy
					)

				for json path
			)
			,sa.Id as AnswerId
			,si.UserId as UserId
			,si.DateCreated
			,si.DateModified
			,[TotalCount] = COUNT(1) OVER()
	FROM dbo.SurveysInstances as si inner join dbo.Surveys as s
			on si.SurveyId = s.Id
			inner join dbo.SurveyAnswers as sa
				on sa.InstanceId = si.Id


	WHERE @CreatedBy = si.UserId

	ORDER BY si.Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	

END
GO

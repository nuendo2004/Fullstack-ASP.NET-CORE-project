USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveysInstances_Select_ByCreatedBy]    Script Date: 3/1/2023 7:26:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Select record by CreatedBy from SurveysInstances>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

CREATE proc [dbo].[SurveysInstances_Select_ByCreatedBy]
					@PageIndex int
					,@PageSize int
					,@CreatedBy int
/*
----------TEST CODE--------------
	DECLARE @CreatedBy int = 90
	
	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE [dbo].[SurveysInstances_Select_ByCreatedBy] @PageIndex, @PageSize, @CreatedBy

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
			,u.Id
			,u.Email
			,u.FirstName
			,u.LastName
			,u.Mi
			,u.AvatarUrl
			,si.UserId as UserId
			,si.DateCreated
			,si.DateModified
			,[TotalCount] = COUNT(1) OVER()
	FROM dbo.SurveysInstances as si inner join dbo.Surveys as s
			on si.SurveyId = s.Id
			inner join dbo.Users as u
				on u.Id = si.UserId

	WHERE @CreatedBy = si.UserId

	ORDER BY si.Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveysInstances_SelectAll]    Script Date: 3/1/2023 7:26:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Select all records from SurveysInstances>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

CREATE proc [dbo].[SurveysInstances_SelectAll]
					@PageIndex int
					,@PageSize int
/*
----------TEST CODE--------------
	
	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE [dbo].[SurveysInstances_SelectAll] @PageIndex, @PageSize

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

	ORDER BY si.Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	

END
GO

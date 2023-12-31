USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_SelectAll]    Script Date: 2/28/2023 3:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<David Phan>
-- Create date: <02/23/2023>
-- Description:	<Paginated Return of all records>
-- Code Reviewer: Mackenzie Williams

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[Surveys_SelectAll] 
	@PageIndex int
	,@PageSize int
AS

/*  Test Script

	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE [dbo].[Surveys_SelectAll]  
		@PageIndex
		,@PageSize
*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT	s.[Id]
			,s.[Name]
			,s.[Description]
			,s.[StatusId]
			,stt.[Name]
			,s.[SurveyTypeId]
			,sut.[Name]
			,s.[DateCreated]
			,s.[DateModified]
			,s.[CreatedBy]
			,s.[ModifiedBy]
			,COUNT(1) OVER() TotalCount
	FROM [dbo].[Surveys] as s
		JOIN [dbo].[SurveyTypes] as sut
		ON s.SurveyTypeId = sut.Id
		JOIN [dbo].[StatusTypes] as stt
		ON s.StatusId = stt.Id
	ORDER BY S.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO

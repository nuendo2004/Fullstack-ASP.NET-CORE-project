USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_Search]    Script Date: 3/10/2023 2:07:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<David Phan>
-- Create date: <02/23/2023>
-- Description:	<Paginated Return of all records based on UDTT and Query>
-- Code Reviewer: William Chung

-- MODIFIED BY: David Phan
-- MODIFIED DATE: 03/07/2023
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[Surveys_Search] 
		@PageIndex int
		,@PageSize int
		,@StatusTypes SurveyStatusId READONLY
		,@SurveyTypes SurveyTypeId READONLY
		,@Query nvarchar(100) = NULL
AS

/*  Test Script

DECLARE @PageIndex int = 0
DECLARE @PageSize int = 20
DECLARE @StatusTypes SurveyStatusId
DECLARE @SurveyTypes SurveyTypeId
DECLARE @Query nvarchar(100) = 'Paw'

INSERT INTO @StatusTypes (StatusId) VALUES (1), (2), (3), (4)
INSERT INTO @SurveyTypes (TypeId) VALUES (1), (2)

EXEC dbo.Surveys_Search  @PageIndex, @PageSize, @StatusTypes, @SurveyTypes, @Query

SELECT * FROM dbo.Surveys

*/


DECLARE @offset int = @PageIndex * @PageSize

BEGIN
	
	SELECT	s.[Id]
			,s.[Name]
			,s.[Description]
			,s.[StatusId]
			,ss.[Name]
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
		JOIN [dbo].[SurveyStatus] as ss
		ON s.StatusId = ss.Id
	WHERE (@Query IS NULL OR ((s.[Name] LIKE '%' + @Query + '%') OR (s.[Description] LIKE '%' + @Query + '%')))
		AND ((SELECT COUNT(*) FROM @StatusTypes) = 0 OR (s.[StatusId] IN (SELECT StatusId FROM @StatusTypes)))
		AND ((SELECT COUNT(*) FROM @SurveyTypes) = 0 OR (s.[SurveyTypeId] IN (SELECT TypeId FROM @SurveyTypes)))
	ORDER BY S.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
GO

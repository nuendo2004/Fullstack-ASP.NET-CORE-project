USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestions_SelectAll]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/23/2023>
-- Description:	<Paginated Return of all records>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestions_SelectAll] 
	@PageIndex int
	,@PageSize int
AS

/*  Test Script

	DECLARE  @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE [dbo].[SurveyQuestions_SelectAll]  
			 @PageIndex
			,@PageSize
*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT	 sq.[Id] as RecordId
			,u.[Id] as UserId
			,u.[Email]
			,u.[FirstName]
			,u.[LastName]
			,u.[Mi]
			,u.[AvatarUrl]
			,sq.ModifiedBy
			,sq.[Question]
			,sq.[HelpText]
			,sq.[IsRequired]
			,sq.[IsMultipleAllowed]
			,qt.[Id]
			,qt.[Name]
			,sq.[SurveyId]
			,ss.[Id]
			,ss.[Name]
			,sq.[SortOrder]
			,sq.[DateCreated]
			,sq.[DateModified]
			,[TotalCount] = COUNT(1) OVER()

	FROM [dbo].[SurveyQuestions] as sq

	JOIN [dbo].[QuestionTypes] as qt
		ON sq.QuestionTypeId = qt.Id

	JOIN [dbo].[SurveyStatus] as ss
		ON ss.Id = sq.StatusId

	Join [dbo].[Users] as  u
		on u.Id = sq.CreatedBy

	ORDER BY sq.Id

	OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS ONLY

END
GO

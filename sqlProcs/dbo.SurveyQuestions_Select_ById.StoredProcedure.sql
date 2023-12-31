USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestions_Select_ById]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/23/2023>
-- Description:	<Return all record based on Id>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note: 
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestions_Select_ById] 
	@Id int

AS

/*  Test Script

	Declare @Id int = 13;

	EXECUTE dbo.SurveyQuestions_Select_ById @Id
*/

BEGIN

	SELECT	 sq.[Id] as RecordId
			,u.[Id] as UserId
			,u.[Email]
			,u.[FirstName]
			,u.[LastName]
			,u.[Mi]
			,u.[AvatarUrl]
			,sq.[ModifiedBy]
			,sq.[Question]
			,sq.[HelpText]
			,sq.[IsRequired]
			,sq.[isMultipleAllowed]
			,qt.[Id]
			,qt.[Name]
			,sq.[SurveyId]
			,ss.[Id]
			,ss.[Name]
			,sq.[SortOrder]
			,sq.[DateCreated]
			,sq.[DateModified]

	FROM [dbo].[SurveyQuestions] as sq

	JOIN [dbo].[QuestionTypes] as qt
		ON sq.QuestionTypeId = qt.Id

	JOIN [dbo].[SurveyStatus] as ss
		ON ss.Id = sq.StatusId

	Join [dbo].[Users] as  u
		on u.Id = sq.CreatedBy

	WHERE sq.Id = @Id

END
GO

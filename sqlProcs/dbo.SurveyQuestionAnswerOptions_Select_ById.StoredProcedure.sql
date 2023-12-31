USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestionAnswerOptions_Select_ById]    Script Date: 2/27/2023 9:42:51 PM ******/
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
CREATE PROCEDURE [dbo].[SurveyQuestionAnswerOptions_Select_ById] 
	@Id int

AS

/*  Test Script

	Declare @Id int = 20

	EXECUTE dbo.SurveyQuestionAnswerOptions_Select_ById @Id
*/

BEGIN

	
SELECT		 s.[Id] as RecordId
			,u.[Id] as CreatedBy
			,u.[Email]
			,u.[FirstName]
			,u.[LastName]
			,u.[Mi]
			,u.[AvatarUrl]
			,s.[ModifiedBy]
			,sq.[Id] as SurveyQuestionId
			,s.[Text]
			,s.[Value]
			,s.[AdditionalInfo]
			,s.[DateCreated]
			,s.[DateModified]
	

	FROM [dbo].[SurveyQuestionAnswerOptions] as s

	JOIN [dbo].[SurveyQuestions] as sq
		ON sq.Id = s.QuestionId

	JOIN [dbo].[Users] as u
		ON u.Id = s.CreatedBy

	WHERE s.Id = @Id

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestionAnswerOptions_Delete_ById]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/23/2023>
-- Description:	<Create record for SurveyQuestionAnswerOptions>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestionAnswerOptions_Delete_ById] 
		@Id int
AS

/*  Test Script
	
	Select *
	From dbo.SurveyQuestionAnswerOptions

	Declare @Id int = 21;

	EXECUTE [dbo].[SurveyQuestionAnswerOptions_Delete_ById] @Id

	Select *
	From dbo.SurveyQuestionAnswerOptions

*/

BEGIN

	DELETE
	FROM [dbo].[SurveyQuestionAnswerOptions]
	WHERE Id = @Id

END
GO

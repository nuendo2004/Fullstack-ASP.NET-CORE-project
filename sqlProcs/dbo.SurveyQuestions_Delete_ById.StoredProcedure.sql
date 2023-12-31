USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestions_Delete_ById]    Script Date: 3/29/2023 7:53:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/23/2023>
-- Description:	<Delete record for SurveyQuestions>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestions_Delete_ById] 
		@Id int
AS

/*  Test Script
	
	Select *
	From dbo.SurveyQuestions
	Select *
	From dbo.SurveyQuestionAnswerOptions



	Declare @Id int = 439;

	EXECUTE [dbo].[SurveyQuestions_Delete_ById] @Id

	Select *
	From dbo.SurveyQuestions

*/

BEGIN
	
	
	/*Declare @DeleteSuveyQuestionAnswerOptionId int = (Select Id
												From SurveyQuestionAnswerOptions as sqao	
												Where sqao.QuestionId = @Id)
												*/

	DELETE
	FROM [dbo].[SurveyQuestionAnswerOptions]
	WHERE QuestionId = @Id

	DELETE
	FROM [dbo].[SurveyQuestions]
	WHERE Id = @Id

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestionAnswerOptions_Batch_Insert]    Script Date: 3/29/2023 7:53:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ricky Damazio>
-- Create date: <03/22/2023>
-- Description:	<Create record for SurveyQuestionAnswerOptions>
-- Code Reviewer: 


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[SurveyQuestionAnswerOptions_Batch_Insert] 
			 
			 @BatchSurveyQuestionAnswerOptions dbo.BatchSurveyQuestionAnswerOptions READONLY
			,@Id int OUTPUT	
AS

/*  Test Script

	Declare @newValues dbo.BatchSurveyQuestionAnswerOptions
	
	Insert Into @newValues (QuestionId,Text,Value,AdditionalInfo, CreatedBy, ModifiedBy)

	Values (115, 'TestText1', 'TestValue1', 'testadditionalinfo1', 90, 90), (115, 'TestText2', 'TestValue2', 'testadditionalinfo2', 90, 90), (115, 'TestText3', 'TestValue3', 'testadditionalinfo3', 90, 90), (115, 'TestText4', 'TestValue4', 'testadditionalinfo4', 90, 90) 

	Declare  @Id int = 0


	EXECUTE dbo.SurveyQuestionAnswerOptions_Batch_Insert
			     @newValues
			    ,@Id 

	Select * 
	From dbo.SurveyQuestionAnswerOptions
	


*/

BEGIN

	INSERT INTO [dbo].[SurveyQuestionAnswerOptions]
				([QuestionId]
				,[Text]
				,[Value]
				,[AdditionalInfo]
				,[CreatedBy]
				,[ModifiedBy]
)
	
	(select bs.QuestionId
		   ,bs.Text
		   ,bs.Value
		   ,bs.AdditionalInfo
		   ,bs.CreatedBy
		   ,bs.ModifiedBy

					   
	 from @BatchSurveyQuestionAnswerOptions as bs
	 )

	SET @Id = SCOPE_IDENTITY();

END
GO

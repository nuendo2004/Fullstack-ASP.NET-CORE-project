USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyQuestionAnswerOptions_Select_ByCreatedBy]    Script Date: 2/27/2023 9:42:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Ricky Damazio>
-- Create date: <02/23/2023>
-- Description:	<Select record by CreatedBy from SurveyQuestionAnswerOptions>
-- Code Reviewer: Andrew Phothisen


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================


CREATE proc [dbo].[SurveyQuestionAnswerOptions_Select_ByCreatedBy]
					 @CreatedBy int
					,@PageIndex int
					,@PageSize int
					
				
/*
----------TEST CODE--------------
	DECLARE @CreatedBy int = 8

	DECLARE @PageIndex int = 0
			,@PageSize int = 20

	EXECUTE  [dbo].[SurveyQuestionAnswerOptions_Select_ByCreatedBy] 
			 @CreatedBy
			,@PageIndex
			,@PageSize
			



	select *
	FROM dbo.[SurveyQuestionAnswerOptions]




*/

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize


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
		    ,[TotalCount] = COUNT(1) OVER()

	FROM [dbo].[SurveyQuestionAnswerOptions] as s

	JOIN [dbo].[SurveyQuestions] as sq
		ON sq.Id = s.QuestionId

	JOIN [dbo].[Users] as u
		ON u.Id = s.CreatedBy

	WHERE @CreatedBy =  u.Id 

	ORDER BY s.Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	

END
GO

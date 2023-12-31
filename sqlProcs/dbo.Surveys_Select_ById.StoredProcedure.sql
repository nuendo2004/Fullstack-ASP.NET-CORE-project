USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_Select_ById]    Script Date: 2/28/2023 3:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<David Phan>
-- Create date: <02/23/2023>
-- Description:	<Return all record based on Id>
-- Code Reviewer: Mackenzie Williams

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[Surveys_Select_ById] 
	@Id int

AS

/*  Test Script

	Declare @Id int = 1;

	EXECUTE dbo.Surveys_Select_ById @Id

*/

BEGIN

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
	FROM [dbo].[Surveys] as s
		JOIN [dbo].[SurveyTypes] as sut
		ON s.SurveyTypeId = sut.Id
		JOIN [dbo].[StatusTypes] as stt
		ON s.StatusId = stt.Id
	WHERE s.Id = @Id

END
GO

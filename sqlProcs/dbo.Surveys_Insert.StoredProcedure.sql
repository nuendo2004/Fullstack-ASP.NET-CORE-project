USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_Insert]    Script Date: 2/24/2023 8:29:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<David Phan>
-- Create date: <02/23/2023>
-- Description:	<Create record for Surveys>
-- Code Reviewer: Ricky Damazio

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROCEDURE [dbo].[Surveys_Insert] 
	@Name nvarchar(100)
	,@Description nvarchar(2000)
	,@StatusId int
	,@SurveyTypeId int
	,@CreatedBy int
	,@ModifiedBy int
	,@Id int OUTPUT

AS

/*  Test Script

	Declare @Name nvarchar(100) = 'TestName'
			,@Description nvarchar(2000) = 'TestDescription'
			,@StatusId int = 1
			,@SurveyTypeId int = 2
			,@CreatedBy int = 91
			,@ModifiedBy int = 91
			,@Id int = 0;

	EXECUTE dbo.Surveys_Insert
			@Name
			,@Description
			,@StatusId
			,@SurveyTypeId
			,@CreatedBy
			,@ModifiedBy
			,@Id OUTPUT
*/

BEGIN

	INSERT INTO [dbo].[Surveys]
				([Name]
				,[Description]
				,[StatusId]
				,[SurveyTypeId]
				,[CreatedBy]
				,[ModifiedBy])
	VALUES
			(@Name
			,@Description
			,@StatusId
			,@SurveyTypeId
			,@CreatedBy
			,@ModifiedBy)
	SET @Id = SCOPE_IDENTITY();

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveysInstances_Insert]    Script Date: 2/27/2023 10:14:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Create record for SurveysInstances>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

 
CREATE proc [dbo].[SurveysInstances_Insert]
			@SurveyId int
			,@UserId int = NULL
			,@Id int OUTPUT
 
as


/*
---------------TEST CODE---------------
Declare @Id int=0;
	
	Declare	@SurveyId int = 2
			,@UserId int = 91

	Execute dbo.SurveysInstances_Insert
							@SurveyId
							,@UserId
							,@Id OUTPUT

	Select *
	From dbo.SurveysInstances
	Where Id = @Id

	Select *
	FROM dbo.Surveys

*/


BEGIN 

	INSERT INTO [dbo].[SurveysInstances]
			([SurveyId]
			,[UserId])
     VALUES
			(@SurveyId,
			@UserId)

	SET @Id = Scope_Identity()


END
GO

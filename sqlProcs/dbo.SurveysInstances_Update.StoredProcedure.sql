USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveysInstances_Update]    Script Date: 2/27/2023 10:14:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Update record for SurveysInstances>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

 
CREATE proc [dbo].[SurveysInstances_Update]
			@SurveyId int
			,@UserId int = NULL
			,@Id int
 
as


/*
---------------TEST CODE---------------
Declare @Id int= 12;
	
	Declare	@SurveyId int = 2
			,@UserId int = 8

	Execute dbo.SurveysInstances_Update
							@SurveyId
							,@UserId
							,@Id


	Select *
	From dbo.SurveysInstances
	--Where Id = @Id

	Select *
	FROM dbo.Surveys

	select * 
	From dbo.Users

*/


BEGIN

	UPDATE [dbo].[SurveysInstances]
			SET [SurveyId] = @SurveyId
				,[UserId] = @UserId
				,[DateModified] = GETUTCDATE()

			WHERE @Id = Id


END
GO

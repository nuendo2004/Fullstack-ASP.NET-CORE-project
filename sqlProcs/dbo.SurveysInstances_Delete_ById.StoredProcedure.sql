USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveysInstances_Delete_ById]    Script Date: 2/26/2023 2:39:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Delete by Id for SurveysInstances>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:

CREATE proc [dbo].[SurveysInstances_Delete_ById]
				@Id int

as

/*
---------- TEST CODE ---------------

	Declare @Id int = 12
		Execute [dbo].[SurveysInstances_Delete_ById]
						@Id 

	select *
	FROM dbo.SurveysInstances

	select* 
	FROM dbo.SurveyAnswers

*/

BEGIN

	DELETE
	FROM dbo.SurveyAnswers
	WHERE @Id = dbo.SurveyAnswers.InstanceId

	DELETE
	FROM [dbo].[SurveysInstances]
    WHERE @Id = Id
END
GO

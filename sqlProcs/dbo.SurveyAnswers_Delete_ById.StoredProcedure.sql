USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveyAnswers_Delete_ById]    Script Date: 2/26/2023 2:39:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Author:		<Sabrina Salgado>
-- Create date: <02/23/2023>
-- Description:	<Deleye by Id for SurveyAnswers>
-- Code Reviewer: David Phan

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:

CREATE proc [dbo].[SurveyAnswers_Delete_ById]
				@Id int

as

/*
---------- TEST CODE ---------------

	Declare @Id int = 19
		Execute [dbo].[SurveyAnswers_Delete_ById]
						@Id 

*/

BEGIN

DELETE FROM [dbo].[SurveyAnswers]

      WHERE @Id = Id
END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SurveysInstances_Select_ByIdV2]    Script Date: 3/6/2023 6:12:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
-- Author:		<Sabrina Salgado>
-- Create date: <03/04/2023>
-- Description:	<Select record by Id from SurveysInstances V2>
-- Code Reviewer: Nathan Ro

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
 --=============================================

CREATE proc [dbo].[SurveysInstances_Select_ByIdV2]
					@Id int
/*
----------TEST CODE--------------
	DECLARE @Id int = 20

	EXECUTE [dbo].[SurveysInstances_Select_ByIdV2] @Id

	select *
	FROM dbo.SurveysInstances

	select *
	FROM dbo.Surveys

*/

AS

BEGIN


	SELECT
			si.Id
			,si.SurveyId as SurveyId
			,s.[Name] as SurveyName
			,s.[Description] as SurveyDescription
			,answeredBy = (
				SELECT u.Id
					,u.Email
					,u.FirstName
					,u.LastName
					,u.Mi
					,u.AvatarUrl
				FROM dbo.Users as u
				WHERE u.Id = si.UserId

				for json path
			)
			,sa.Id as AnswerId
			,si.UserId as UserId
			,si.DateCreated
			,si.DateModified
			,[TotalCount] = COUNT(1) OVER()
	FROM dbo.SurveysInstances as si inner join dbo.Surveys as s
			on si.SurveyId = s.Id
			inner join dbo.SurveyAnswers as sa
				on sa.InstanceId = si.Id

	WHERE @Id = si.Id
	

END
GO

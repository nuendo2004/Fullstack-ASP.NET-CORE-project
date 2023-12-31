USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[InviteTrainees_Select_ByToken]    Script Date: 11/22/2022 7:39:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author: <Miyah R.>
-- Create date: <11/17/2022>
-- Description: <Insert of Trainee>
-- Code Reviewer:David Ramirez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE PROC [dbo].[InviteTrainees_Select_ByToken]
	 @Token nvarchar(128)

/*
	
	Declare @Token  nvarchar(128) = '5656565'
	
	EXECUTE [dbo].[InviteTrainees_Select_ByToken]
			@Token
	
*/

AS

BEGIN
Declare @DateNow dateTime2 = getutcdate()

SELECT [Id]
      ,[TrainingUnitId]
      ,[Token]
      ,[FirstName]
      ,[LastName]
      ,[Email]
      ,[username]
      ,[AvatarUrl]
      ,[ExpirationDate]
      ,[CreatedBy]
      ,[DateCreated]
  FROM [dbo].[InviteTrainees]

  WHERE ExpirationDate> @DateNow
END




	
		
GO

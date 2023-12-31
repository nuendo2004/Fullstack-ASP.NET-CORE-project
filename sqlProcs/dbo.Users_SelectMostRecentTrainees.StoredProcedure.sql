USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectMostRecentTrainees]    Script Date: 12/1/2022 5:07:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Jacob Helton>
-- Create date: <12/1/2022>
-- Description:	<Selects the top x most recently created Users that have the Trainee role>
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Users_SelectMostRecentTrainees]

as

/*--------- TEST CODE -----------------

	Execute [dbo].[Users_SelectMostRecentTrainees] 

*/

BEGIN

	SELECT TOP 3
		   [Id]
		  ,[Email]
		  ,[FirstName]
		  ,[LastName]
		  ,[Mi]
		  ,[AvatarUrl]
	FROM dbo.Users as u inner join dbo.UserOrgRoles as uor
	ON uor.UserId = u.Id
	WHERE uor.RoleId = 9
	ORDER BY u.DateCreated DESC

END
GO

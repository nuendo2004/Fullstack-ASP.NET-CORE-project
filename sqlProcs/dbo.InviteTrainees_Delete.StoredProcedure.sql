USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[InviteTrainees_Delete]    Script Date: 11/22/2022 7:39:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --=============================================
 --Author: <Robinson, Miyah>
 --Create date: <2022-11-17>
 --Description: <Delete for inviteTrainees>
 --Code Reviewer: David Ramirez
 

 --MODIFIED BY: <Author>
 --MODIFIED DATE: <2022-10-26>
 --Code Reviewer: 
 --Note: 
 --=============================================
CREATE proc [dbo].[InviteTrainees_Delete]
	@Id int
	

AS

/*

DECLARE @Id int = 30
		
		SELECT	*
	FROM	dbo.InviteTrainees
	Where Id = @Id


EXECUTE dbo.InviteTrainees_Delete
	@Id
	
	SELECT	*
	FROM	dbo.InviteTrainees
	Where Id = @Id
	

*/

BEGIN

	DELETE FROM [dbo].[InviteTrainees]
      WHERE Id = @Id


END

GO

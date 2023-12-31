USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Consequences_Update_IsDelete_ById]    Script Date: 11/21/2022 11:20:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --=============================================
 --Author: <Aquino, Joseph>
 --Create date: <2022-11-18>
 --Description: <Update Delete for Consequences >
 --Code Reviewer:
 

 --MODIFIED BY: <Author>
 --MODIFIED DATE: <2022-10-26>
 --Code Reviewer: 
 --Note: 
 --=============================================

CREATE PROC	[dbo].[Consequences_Update_IsDelete_ById]
		   @Id int
AS

/* ----Test Code -----

	DECLARE @Id int = 4

	Execute dbo.Consequences_Update_IsDelete_ById 
	      @Id

*/

BEGIN

   UPDATE [dbo].[Consequences]

   SET 
		  [isDeleted] = 1
		 ,[DateModified] = GETUTCDATE()

   WHERE  Id = @Id

 END


GO

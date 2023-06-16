USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Actors_Delete]    Script Date: 11/17/2022 3:06:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 --=============================================
 --Author: <Arenas, Jay>
 --Create date: <2022-11-16>
 --Description: <Delete for Actors>
 --Code Reviewer: 
 

 --MODIFIED BY: 
 --MODIFIED DATE:
 --Code Reviewer: 
 --Note: 
 --=============================================

CREATE proc [dbo].[Actors_Delete]
	   	   @Id int
		 
		 
as

/*  ----- TEST CODE ------ 

			DECLARE @Id int = 5

			EXECUTE dbo.Actors_Delete @Id

*/

BEGIN

			DECLARE @dateNow datetime2 = GETUTCDATE()

			UPDATE dbo.Actors

			SET 
				 StatusTypeId = 5
				,DateModified = @dateNow

			WHERE Id = @Id

END
GO

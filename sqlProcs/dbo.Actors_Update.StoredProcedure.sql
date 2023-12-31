USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Actors_Update]    Script Date: 11/17/2022 3:06:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 --=============================================
 --Author: <Arenas, Jay>
 --Create date: <2022-11-16>
 --Description: <Update for Actors>
 --Code Reviewer: 
 

 --MODIFIED BY: 
 --MODIFIED DATE:
 --Code Reviewer: 
 --Note: 
 --=============================================

 CREATE proc [dbo].[Actors_Update]
			@Name nvarchar(100) 
		   ,@Description nvarchar(500)
		   ,@ActorTypeId int
		   ,@StatusTypeId int
		   ,@CreatedBy int
		   ,@ModifiedBy int
		   ,@Id int

 as 

 /*  ------ TEST CODE ----- 

		DECLARE @Id int = 1;

	    DECLARE     @Name nvarchar(100) = 'Update Actor Name'
				   ,@Description nvarchar(500) = 'Updating Actors Test'
				   ,@ActorTypeId int = 2
				   ,@StatusTypeId int = 3
				   ,@CreatedBy int = 91
				   ,@ModifiedBy int = 86

		SELECT *
		FROM dbo.Actors 
		WHERE Id = @Id
			   
		EXECUTE dbo.Actors_Update
				    @Name
				   ,@Description
				   ,@ActorTypeId
				   ,@StatusTypeId
				   ,@CreatedBy
				   ,@ModifiedBy
				   ,@Id
		
		SELECT *
		FROM dbo.Actors 
		WHERE Id = @Id

 */

 BEGIN

		DECLARE @datNow datetime2 = GETUTCDATE()

		UPDATE dbo.Actors

		SET		
				[Name] = @Name
			   ,[Description] = @Description
			   ,ActorTypeId = @ActorTypeId
			   ,StatusTypeId = @StatusTypeId
			   ,CreatedBy = @CreatedBy
			   ,ModifiedBy = @ModifiedBy
			   ,DateModified = @datNow

		WHERE Id = @Id 

 END 
GO

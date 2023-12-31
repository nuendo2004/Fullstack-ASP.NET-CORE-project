USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Actors_Insert]    Script Date: 11/17/2022 3:06:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 --=============================================
 --Author: <Arenas, Jay>
 --Create date: <2022-11-16>
 --Description: <Insert for Actors>
 --Code Reviewer: 
 

 --MODIFIED BY: 
 --MODIFIED DATE:
 --Code Reviewer: 
 --Note: 
 --=============================================

CREATE proc [dbo].[Actors_Insert]
			@Name nvarchar(100)
		   ,@Description nvarchar(500)
		   ,@ActorTypeId int 
		   ,@StatusTypeId int
		   ,@CreatedBy int
		   ,@ModifiedBy int 
		   ,@Id int OUTPUT 
as 


/*

SELECT *
FROM dbo.StatusTypes


SELECT * 
FROM dbo.Users

DECLARE @Id int = 0
	   ,@Name nvarchar(100) = 'Test Actor 5' 
	   ,@Description nvarchar(500) = 'Fifth entry for Actors Table' 
	   ,@ActorTypeId int = 5
	   ,@StatusTypeId int = 1
	   ,@CreatedBy int = 85
	   ,@ModifiedBy int = 85

EXECUTE dbo.Actors_Insert
		@Name 
	   ,@Description
	   ,@ActorTypeId
	   ,@StatusTypeId
	   ,@CreatedBy
	   ,@ModifiedBy
	   ,@Id OUTPUT

EXECUTE dbo.Actors_SelectAll

*/

BEGIN 

		INSERT INTO dbo.Actors
		     ([Name]
			 ,[Description]
			 ,ActorTypeId
			 ,StatusTypeId
			 ,CreatedBy
			 ,ModifiedBy)


		VALUES 
			(@Name
			,@Description
			,@ActorTypeId
			,@StatusTypeId
			,@CreatedBy
			,@ModifiedBy)

		SET @Id = SCOPE_IDENTITY()

END
GO

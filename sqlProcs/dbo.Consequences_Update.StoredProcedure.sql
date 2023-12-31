USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Consequences_Update]    Script Date: 11/21/2022 11:20:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --=============================================
 --Author: <Aquino, Joseph>
 --Create date: <2022-11-18>
 --Description: <Update for Consequences >
 --Code Reviewer:
 

 --MODIFIED BY: <Author>
 --MODIFIED DATE: <2022-10-26>
 --Code Reviewer: 
 --Note: 
 --=============================================

CREATE PROC [dbo].[Consequences_Update]
		 @Id int
		,@Name nvarchar(100)
        ,@Description nvarchar(500)
        ,@ConsequenceTypeId int
        ,@ActorId int
        ,@ZoneId int
        ,@isActive bit
        ,@isDeleted bit
        ,@CreatedBy int
        ,@ModifiedBy int
		   

as 

/*---TEST CODE ----


Declare  @Id int = 2
		,@Name nvarchar(100) = 'this is a test_update2'
        ,@Description nvarchar(500) = 'test_Update2'
        ,@ConsequenceTypeId int = 3
        ,@ActorId int = 1
        ,@ZoneId int = 2
        ,@isActive bit = 1
		,@isDeleted bit = 0
        ,@CreatedBy int = 17
        ,@ModifiedBy int = 8

EXECUTE dbo.Consequences_Update 
		 @Id
		,@Name 
		,@Description 
		,@ConsequenceTypeId 
		,@ActorId 
		,@ZoneId 
		,@isActive 
		,@isDeleted 
		,@CreatedBy 
		,@ModifiedBy 					   

*/

Begin

	UPDATE [dbo].[Consequences]

    SET    [Name] = @Name
		  ,[Description] = @Description
		  ,[ConsequenceTypeId] = @ConsequenceTypeId
		  ,[ActorId] = @ActorId
		  ,[ZoneId] = @ZoneId
		  ,[isActive] = @isActive
		  ,[isDeleted] = @isDeleted
		  ,[CreatedBy] = @CreatedBy
		  ,[ModifiedBy] = @ModifiedBy
		  ,[DateModified] = GETUTCDATE()

	WHERE Id = @Id

END


GO

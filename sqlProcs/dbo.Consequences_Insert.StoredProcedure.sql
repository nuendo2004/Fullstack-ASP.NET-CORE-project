USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Consequences_Insert]    Script Date: 11/21/2022 11:20:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Consequences_Insert]
			@Name nvarchar(100)
           ,@Description nvarchar(500)
           ,@ConsequenceTypeId int
           ,@ActorId int
           ,@ZoneId int
           ,@CreatedBy int
           ,@ModifiedBy int
		   ,@Id int OUTPUT


AS

/*

   Declare  @Id int = 0
   Declare  @Name nvarchar(100) = 'this is an insert a test_11'
           ,@Description nvarchar(500) = 'test_11'
           ,@ConsequenceTypeId int = 2
           ,@ActorId int = 5
           ,@ZoneId int = 3
           ,@CreatedBy int = 17
           ,@ModifiedBy int = 8

   Execute dbo.Consequences_Insert 
            @Name 
		   ,@Description 
		   ,@ConsequenceTypeId 
		   ,@ActorId 
		   ,@ZoneId 
		   ,@CreatedBy 
		   ,@ModifiedBy 
		   ,@Id OUTPUT

*/

BEGIN

	 INSERT INTO 
		    [dbo].[Consequences]
           ([Name]
           ,[Description]
           ,[ConsequenceTypeId]
           ,[ActorId]
           ,[ZoneId]
           ,[CreatedBy]
           ,[ModifiedBy])

     VALUES
           (@Name
           ,@Description
           ,@ConsequenceTypeId
           ,@ActorId
           ,@ZoneId
           ,@CreatedBy
           ,@ModifiedBy)

	 SET   @Id = SCOPE_IDENTITY()
END


GO

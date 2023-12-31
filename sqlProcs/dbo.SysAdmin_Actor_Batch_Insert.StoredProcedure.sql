USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SysAdmin_Actor_Batch_Insert]    Script Date: 12/5/2022 12:24:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 --=============================================
 --Author: <Arenas, Jay>
 --Create date: <2022-12-4>
 --Description: <Batch Insert Sys Actor>
 --Code Reviewer: 
 

 --MODIFIED BY: 
 --MODIFIED DATE:
 --Code Reviewer: 
 --Note: 
 --=============================================




 CREATE proc [dbo].[SysAdmin_Actor_Batch_Insert]
				 @actorName nvarchar(100)
				,@actorDescription nvarchar(500)
				,@ActorTypeId int 
				,@StatusTypeId int
				,@CreatedBy int
				,@ModifiedBy int 
				,@conName nvarchar(100)
			    ,@conDescription nvarchar(500)
			    ,@ConsequenceTypeId int			    
			    ,@ZoneId int
				,@UserName nvarchar(100)
				,@Password nvarchar(50)
				,@AvatarUrl nvarchar(255)								
				,@AccountStatusId int
				,@Id int OUTPUT			    
				


 as

 /*
		DECLARE @Id int = 0		       
			   ,@actorName nvarchar(100) = 'LokiActor' 
			   ,@actorDescription nvarchar(500) = 'Loki description Test' 
			   ,@ActorTypeId int = 5
			   ,@StatusTypeId int = 1
			   ,@CreatedBy int = 85
			   ,@ModifiedBy int = 85
			   ,@conName nvarchar(100) = 'Loki Con'
               ,@conDescription nvarchar(500) = 'Loki consequences Test'
               ,@ConsequenceTypeId int = 2              
               ,@ZoneId int = 3
			   ,@UserName nvarchar(100) = 'Loki Actor Account'
			   ,@Password nvarchar(50)= 'LOKI123321!'
			   ,@AvatarUrl nvarchar(255)= 'https://tinyurl.com/2k6b4uft'			   
			   ,@AccountStatusId int =1
		

		EXECUTE SysAdmin_Actor_Batch_Insert
			     @actorName 
				,@actorDescription 
				,@ActorTypeId 
				,@StatusTypeId 
				,@CreatedBy 
				,@ModifiedBy 
				,@conName 
			    ,@conDescription 
			    ,@ConsequenceTypeId 			    
			    ,@ZoneId  
				,@UserName 
				,@Password 
				,@AvatarUrl 
				,@AccountStatusId 
				,@Id OUTPUT			    
				

SELECT *
FROM dbo.Actors


SELECT *
FROM dbo.Consequences


SELECT *
FROM dbo.ActorAccounts
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
					(@actorName
					,@actorDescription
					,@ActorTypeId
					,@StatusTypeId
					,@CreatedBy
					,@ModifiedBy)

			SET @Id = SCOPE_IDENTITY()

			
		 INSERT INTO [dbo].[Consequences]
				   ([Name]
				   ,[Description]
				   ,[ConsequenceTypeId]
				   ,[ActorId]
				   ,[ZoneId]
				   ,[CreatedBy]
				   ,[ModifiedBy])

	    VALUES
				   (@conName
				   ,@conDescription
				   ,@ConsequenceTypeId
				   ,@Id
				   ,@ZoneId
				   ,@CreatedBy
				   ,@ModifiedBy)

	 

	 INSERT INTO dbo.ActorAccounts
			([UserName]
			,[Password]
			,[AvatarUrl]
			,[ZoneId]
			,[ActorId]
			,[AccountStatusId]
			,[CreatedBy]
			,[ModifiedBy])

	VALUES 
			(@UserName
			,@Password
			,@AvatarUrl
			,@ZoneId
			,@Id
			,@AccountStatusId
			,@CreatedBy
			,@ModifiedBy)

	





 END
GO

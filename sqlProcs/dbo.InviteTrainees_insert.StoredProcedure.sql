USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[InviteTrainees_insert]    Script Date: 11/22/2022 7:39:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miyah R.>
-- Create date: <11/18/2022>
-- Description: <Insert of InviteTrainee>
-- Code Reviewer: David Ramirez

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[InviteTrainees_insert]

            @TrainingUnitId int
           ,@Token nvarchar(128)
           ,@FirstName nvarchar(100)
           ,@LastName nvarchar(100)
           ,@Email nvarchar(255)
           ,@Username nvarchar(64)
           ,@AvatarUrl nvarchar(255)
		   ,@UserId int 
          
          

		   ,@Id int OUTPUT



/*
Declare @Id int= 0
Declare     @TrainingUnitId int = 1
           ,@Token nvarchar(128) = 'ndjnfejnf'
           ,@FirstName nvarchar(100) ='Miyah'
           ,@LastName nvarchar(100) ='Robinson'
           ,@Email nvarchar(255) ='MiyahRobinson2022@gmail.com'
           ,@Username nvarchar(64) ='MiyahR'
           ,@AvatarUrl nvarchar(255) = 'mmmkwndjejnnfrn c'
           ,@UserId int = 8
          
		  

Execute dbo.InviteTrainees_insert

            @TrainingUnitId
           ,@Token
           ,@FirstName
           ,@LastName
           ,@Email
           ,Username
           ,@AvatarUrl
		   ,@UserId
		   ,@Id OUTPUT
          

		   Select *

		   From dbo.InviteTrainees

		   Where Id = @Id
*/

as


BEGIN


INSERT INTO [dbo].[InviteTrainees]
           ([TrainingUnitId]
           ,[Token]
           ,[FirstName]
           ,[LastName]
           ,[Email]
           ,[Username]
           ,[AvatarUrl]
           ,[CreatedBy]
           )
     VALUES
           (@TrainingUnitId
           ,@Token
           ,@FirstName
           ,@LastName
           ,@Email
           ,@Username
           ,@AvatarUrl
           ,@UserId
           )

		   
		   SET @Id = SCOPE_IDENTITY()

END



GO

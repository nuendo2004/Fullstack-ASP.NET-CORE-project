USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Trainee_Insert]    Script Date: 10/26/2022 4:17:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miyah R.>
-- Create date: <10/26/2022>
-- Description: <Insert of Trainee>
-- Code Reviewer: Micheal White

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================






CREATE proc [dbo].[Trainee_Insert]

            @UserId int
           ,@TrainingUnitId int
           ,@TraineeStatusId int
          
          

		   ,@Id int OUTPUT



/*
Declare @Id int= 0
           ,@UserId int = 20
           ,@TrainingUnitId int = 1
           ,@TraineeStatusId int = 2
        
          
          
		  

Execute dbo.Trainee_Insert

            @UserId
           ,@TrainingUnitId
           ,@TraineeStatusId
		   , @Id OUTPUT
          

		   Select *

		   From dbo.Trainees

		   Where Id = @Id
*/

as


BEGIN

Declare @DateNow dateTime2 = getutcdate()

INSERT INTO [dbo].[Trainees]
           ([UserId]
           ,[TrainingUnitId]
           ,[TraineeStatusId]
           ,[CreatedBy]
           ,[ModifiedBy]
           ,[DateCreated]
           ,[DateModified])
     VALUES
           (@UserId
           ,@TrainingUnitId
           ,@TraineeStatusId
           ,@UserId
           ,@UserId
           ,@DateNow
           ,@DateNow)

		   SET @Id = SCOPE_IDENTITY()





END




GO

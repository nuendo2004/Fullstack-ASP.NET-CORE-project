USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Trainees_Update]    Script Date: 10/26/2022 4:17:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Miyah R.>
-- Create date: <10/26/2022>
-- Description: <Update of Trainee>
-- Code Reviewer: Micheal White
-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[Trainees_Update]
	   @UserId int
      ,@TrainingUnitId int
      ,@TraineeStatusId int
     
      
     
	  ,@Id int

	AS

/*
Declare @Id int= 6

	Declare	       @UserId int = 22
				  ,@TrainingUnitId int = 4
				  ,@TraineeStatusId int = 1
				 
				  
				 
	

				   Select  *
				   From dbo.Trainees
				   Where Id = @Id

Execute [dbo].[Trainees_Update]

       @UserId 
      ,@TrainingUnitId 
      ,@TraineeStatusId
     
      ,@Id

	    Select  *
				   From dbo.Trainees
				   Where Id = @Id

*/
	BEGIN

	Declare @dateNow datetime2 = getutcdate()

	UPDATE [dbo].[Trainees]
   SET [UserId] = @UserId
      ,[TrainingUnitId] = @TrainingUnitId
      ,[TraineeStatusId] = @TraineeStatusId
      ,[ModifiedBy] = @UserId
      ,[DateModified] = @dateNow
 WHERE Id = @Id

 End
GO

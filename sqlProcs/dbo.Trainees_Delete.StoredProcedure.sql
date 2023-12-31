USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Trainees_Delete]    Script Date: 10/26/2022 4:17:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miyah R.>
-- Create date: <10/26/2022>
-- Description: <Delete/ update of Trainee>
-- Code Reviewer:Micheal White

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================



CREATE PROC [dbo].[Trainees_Delete]

		@UserId int 
		,@Id int			
									
As

			/*
			Declare @Id int = 7;

			Declare 
					@UserId int = 17
	
		
					
			Select *
			From dbo.Trainees
			Where Id = @Id

			Execute[dbo].[Trainees_Delete]
 
					@UserId
					,@Id 
			Select *
			From dbo.Trainees
			Where Id = @Id
			*/

BEGIN

Declare
@TraineeStatusId int = 2
,@IsDeleted bit = 1
,@dateNow datetime2 = getutcdate()



UPDATE [dbo].[Trainees]
   SET [TraineeStatusId] = @TraineeStatusId
      ,[IsDeleted] = @IsDeleted
      ,[ModifiedBy] = @UserId
      ,[DateModified] = @dateNow
	  
 WHERE Id = @Id


END
GO

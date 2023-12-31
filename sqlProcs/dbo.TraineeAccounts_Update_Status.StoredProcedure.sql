USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_Update_Status]    Script Date: 10/29/2022 7:11:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <10/23/2022>
-- Description: <Updates Status for each TraineeAccount.>
-- Code Reviewer: Michael Valdez

-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 10/28/2022
-- Code Reviewer: Miyah Robinson
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_Update_Status]
		@AccountStatusId int
		,@UserId int
		,@Id int
		
as

/* 
		Select *
		From [dbo].[TraineeAccounts]

		Declare @AccountStatusId int = 2
				,@UserId int = 20
				,@Id int = 1
			  		
		Execute dbo.TraineeAccounts_Update_Status
				@AccountStatusId
				,@UserId
				,@Id
				
		Select *
		From [dbo].[TraineeAccounts]
		Where Id = @Id

*/

BEGIN

	UPDATE [dbo].[TraineeAccounts]
	   SET [AccountStatusId] = @AccountStatusId
			,[ModifiedBy] = @UserId

	 WHERE Id = @Id

END
GO

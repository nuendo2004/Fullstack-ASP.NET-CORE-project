USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_Update_Username]    Script Date: 10/29/2022 7:11:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <10/23/2022>
-- Description: <Updates Username for TraineeAccounts.>
-- Code Reviewer: Michael Valdez

-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 10/28/2022
-- Code Reviewer: Miyah Robinson
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_Update_Username]
		@Username nvarchar(100)
		,@UserId int
		,@Id int
		
as

/* 
		Select *
		From [dbo].[TraineeAccounts]
		
		Declare @Username nvarchar(100) = 'asdfkjsdpori'
				,@UserId int = 22
				,@Id int = 1
			  		
		Execute dbo.TraineeAccounts_Update_Username
				@Username
				,@UserId
				,@Id
				
		Select *
		From [dbo].[TraineeAccounts]
		Where Id = @Id

*/

BEGIN

	UPDATE [dbo].[TraineeAccounts]
	   SET [Username] = @Username	
			,[ModifiedBy] = @UserId

	 WHERE Id = @Id

END
GO

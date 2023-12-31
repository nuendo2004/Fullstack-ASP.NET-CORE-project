USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_Update_Avatar]    Script Date: 12/1/2022 10:34:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <12/1/2022>
-- Description: <Updates Avatar URL for each TraineeAccount.>
-- Code Reviewer: Thinzar Soe

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_Update_Avatar]
		@AvatarUrl nvarchar(255)
		,@UserId int
		,@Id int
		
as

/*
Select * 
from [dbo].[TraineeAccounts]
*/


BEGIN

	UPDATE [dbo].[TraineeAccounts]
	   SET [AvatarUrl] = @AvatarUrl
			,[ModifiedBy] = @UserId

	 WHERE Id = @Id

END
GO

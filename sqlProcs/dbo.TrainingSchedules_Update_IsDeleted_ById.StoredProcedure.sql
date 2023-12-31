USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_Update_IsDeleted_ById]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Kyle Kilby
-- Create date: 10/24/2022
-- Description:	Update method used to Delete Schedule. Archive
-- Code Reviewer: Chris Mercado


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc [dbo].[TrainingSchedules_Update_IsDeleted_ById]
		@UserId int
		,@Id int OUTPUT

as
/*
Execute dbo.TrainingSchedules_Update_IsDeleted_ById
				@Id = 6
				,@UserId = 55

	Select * From dbo.TrainingSchedules
*/
begin 
Declare @dateNow datetime2 = getutcdate()

	UPDATE [dbo].[TrainingSchedules]

    SET  DateModified = @dateNow
		,ModifiedBy = @UserId
		,[isDeleted] = 1

			Where Id = @Id

end
GO

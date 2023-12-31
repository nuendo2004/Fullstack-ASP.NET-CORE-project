USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[JobSchedules_Delete]    Script Date: 11/23/2022 9:20:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Jacob Helton>
-- Create date: <11/23/2022>
-- Description:	<Updates a JobSchedule by their Id, will set IsActive to 0, IsDeleted to 1, and the DateModified>
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[JobSchedules_Delete]
						@Id int
					   ,@ModifiedBy int

as

/*--------- TEST CODE -----------------

	Declare @Id int = 4
		   ,@ModifiedBy int = 27
	
	SELECT *
	FROM [dbo].[JobSchedules]
	WHERE Id = @Id

	Execute [dbo].[JobSchedules_Delete] @Id
									   ,@ModifiedBy

	SELECT *
	FROM [dbo].[JobSchedules]
	WHERE Id = @Id

*/

BEGIN

	DECLARE @dateNow datetime2(7) = getutcdate();

	UPDATE [dbo].[JobSchedules]

	SET [DateModified] = @dateNow
	   ,[IsActive] = 0
	   ,[IsDeleted] = 1
	   ,[ModifiedBy] = @ModifiedBy
	WHERE Id = @Id

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Update_IsDeleted_ById]    Script Date: 11/18/2022 5:03:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Author, Rafael Luviano>
-- Create date: <Create Date,16 Nov 2022,>
-- Description: <Description, Update IsDeleted ById,>
-- Code Reviewer: Damian Stella
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[Comments_Update_IsDeleted_ById]
		@Id int OUTPUT
	as



	/*



	Declare @Id int = 16
			

	Execute dbo.Comments_Update_IsDeleted_ById						
								@Id OUTPUT

	Select *
	from dbo.Comments

	Delete from dbo.Comments
	WHERE Id = @Id

	Select *
	from dbo.Users 


	*/
BEGIN	

	Declare @dateNow datetime2 = getutcdate()
	UPDATE	 [dbo].[Comments]
			SET	   	 
					[DateModified] = @dateNow
					,[IsDeleted] = 1

			WHERE Id = @Id
END
GO

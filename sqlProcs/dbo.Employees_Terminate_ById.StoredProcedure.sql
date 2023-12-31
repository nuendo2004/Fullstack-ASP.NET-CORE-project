USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Employees_Terminate_ById]    Script Date: 11/2/2022 10:43:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <10/20/2022>
-- Description: <Update Employee by Id will set EndDate as of now, IsActive to 0, and
--					DateModified as of now>
-- Code Reviewer: Andrew Hoang, Pablo Demalde, Joe Medina (PR)

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Employees_Terminate_ById]
			@Id int
			,@ModifiedBy int
			
as

/*--------- TEST CODE -----------------
	
	Declare @Id int = 7
			, @ModifiedBy int = 29
			
	
	SELECT *
	FROM [dbo].Employees
	WHERE Id = @Id

	Execute [dbo].[Employees_Terminate_ById] @Id
											 , @ModifiedBy
							

	SELECT *
	FROM [dbo].Employees
	WHERE Id = @Id	

*/

BEGIN
	
	DECLARE @dateNow datetime2 = getutcdate();

	UPDATE [dbo].[Employees]

	 SET [EndDate] = @dateNow
		  ,[IsActive] = 0
		  ,[DateModified] = @dateNow
		  ,[ModifiedBy] = @ModifiedBy
	WHERE Id = @Id
	
END
GO

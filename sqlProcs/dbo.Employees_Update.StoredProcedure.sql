USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Employees_Update]    Script Date: 11/2/2022 10:43:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <10/20/2022>
-- Description: <Updates an Employee by their Id>
-- Code Reviewer: Pablo Demalde, Andrew Hoang, Joe Medina (PR)

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Employees_Update]
			@Id int
			, @ModifiedBy int 
			, @Phone nvarchar(20)
			, @StartDate datetime2
as

/*----------- TEST CODE --------------

	Declare @Id int = 7
			, @ModifiedBy int = 29
			, @Phone nvarchar(20) = '444-444-4444'
			, @StartDate datetime2 = '2022-10-31'

	SELECT *
	FROM [dbo].[Employees]
	WHERE Id = @Id

	Execute [dbo].[Employees_Update] @Id
									, @ModifiedBy
									, @Phone 
									, @StartDate 

	SELECT *
	FROM [dbo].[Employees]
	WHERE Id = @Id

*/

BEGIN
	
	Declare @dateNow datetime2 = getutcdate()
	
	UPDATE [dbo].[Employees]
	
	SET 
		[ModifiedBy] = @ModifiedBy
		,[Phone] = @Phone
		,[StartDate] = @StartDate
		,[DateModified] = @dateNow

	WHERE (
			[IsActive] = 1
			AND
			Id = @Id
			)

END
GO

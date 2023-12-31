USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Employees_Insert]    Script Date: 11/2/2022 10:43:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <10/20/2022>
-- Description: <Insert into the Employees table a new Employee>
-- Code Reviewer: Andrew Hoang, Pablo Demalde, Joe Medina (PR)

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Employees_Insert]
			 @Id int OUTPUT
			, @UserId int 
			, @OrganizationId int
			, @Phone nvarchar(20)
			, @StartDate datetime2
			, @CreatedBy int
as 

/*---------- TEST CODE ---------------

	Declare @Id int = 0
			, @UserId int = 29
			, @OrganizationId int = 36
			, @Phone nvarchar(20) = '888-888-8888'
			, @StartDate datetime2 = getutcdate()
			, @CreatedBy int = 29

	Execute [dbo].[Employees_Insert]
								@Id OUTPUT
								, @UserId
								, @OrganizationId
								, @Phone
								, @StartDate
								, @CreatedBy
	
	SELECT *
	FROM [dbo].[Employees]
	WHERE Id = @Id

*/

BEGIN

	
	INSERT INTO [dbo].[Employees]
					   ([UserId]
					   ,[OrganizationId]
					   ,[Phone]
					   ,[StartDate]
					   ,[CreatedBy]
					   ,[ModifiedBy])
	VALUES
           (@UserId
		    , @OrganizationId
			, @Phone
			, @StartDate
			, @CreatedBy
			, @CreatedBy)
	
	SET @Id = SCOPE_IDENTITY()

END
GO

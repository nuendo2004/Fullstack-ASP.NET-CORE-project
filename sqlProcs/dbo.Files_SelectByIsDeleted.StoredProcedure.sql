USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Files_SelectByIsDeleted]    Script Date: 3/16/2023 10:28:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Files_SelectByIsDeleted]
					@userId int
					,@PageIndex int 
					,@PageSize int
AS

-- =============================================
-- Author: <Author,,Thaddeus Szyplik>
-- Create date: <02/24/2023,,>
-- Description: <Select by Is Deleted,,>
-- Code Reviewer:
-- Note: In Accordance With Immersed Task 

-- MODIFIED BY: author
-- MODIFIED DATE:03/16/2023
-- Code Reviewer: Ricky Damazio
-- Note:
-- =============================================
/*


Declare			@userId int = 90
				,@PageIndex int = 0
				,@PageSize int = 5000

Execute  dbo.Files_SelectByIsDeleted	
				@userId
				,@PageIndex
				,@PageSize

*/

BEGIN

Declare @offset int = @PageIndex * @PageSize

				SELECT f.Id as Id
						  ,f.[Name]
						  ,f.[Url]
						  ,ft.Id as FileTypeId
						  ,ft.Name as FileTypeName						  					  
						  ,[CreatedBy]
						  ,[DateCreated]
						  ,[IsDeleted]
						  ,TotalCount = COUNT(1) OVER()


	FROM [dbo].[Files] as f inner join dbo.FileTypes as ft
						on f.FileTypeId = ft.Id

	Where IsDeleted = 1
	AND f.CreatedBy = @userId
	ORDER BY f.Id

OfFSET @offSet Rows
Fetch Next @PageSize Rows ONLY

END
GO

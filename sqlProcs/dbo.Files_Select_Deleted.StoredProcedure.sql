USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Files_Select_Deleted]    Script Date: 10/27/2022 3:45:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Files_Select_Deleted]
					@PageIndex int 
					,@PageSize int 
AS

-- =============================================
-- Author: <Author,,Micheal White>
-- Create date: <10/20/2022,,>
-- Description: <Select by IsDeleted (Paginated),,>
-- Code Reviewer: Miranda Merritt

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================
/*


Declare			@PageIndex int = 0
				,@PageSize int = 8

Execute  dbo.Files_Select_Deleted	
				@PageIndex
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
	ORDER BY IsDeleted

OfFSET @offSet Rows
Fetch Next @PageSize Rows ONLY

END
GO

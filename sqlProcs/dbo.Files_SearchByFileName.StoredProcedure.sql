USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Files_SearchByFileName]    Script Date: 3/2/2023 8:16:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Files_SearchByFileName]
					@PageIndex int 
                   ,@PageSize int
				   ,@Query nvarchar(100)

AS
-- =============================================
-- Author: <Author,,Thaddeus Szyplik>
-- Create date: <02/24/2023,,>
-- Description: <SearchByFileName,,>
-- Code Reviewer:
-- Note: In Accordance With Immersed Task 

-- MODIFIED BY: author
-- MODIFIED DATE:2/24/2023
--  Code Reviewer: Sabrina Salgado
-- Note:
-- =============================================

/*
Declare @PageIndex int = 0
		,@PageSize int = 8
		,@Query nvarchar(100) = 'TESTESTES'


Execute dbo.Files_SearchByFileName
					@PageIndex
                   ,@PageSize
				   ,@Query
*/

BEGIN


Declare @offset int = @PageIndex * @PageSize

					SELECT f.Id as Id
						  ,f.Name
						  ,f.Url
						  ,ft.Id as FileTypeId
						  ,ft.Name as FileTypeName						  					  
						  ,f.CreatedBy
						  ,f.DateCreated
						  ,f.IsDeleted
						  ,TotalCount = COUNT(1) OVER()


  FROM [dbo].[Files] as f inner join dbo.FileTypes as ft
						on f.FileTypeId = ft.Id

	WHERE (F.Name LIKE '%' + @Query + '%') 
		and f.IsDeleted = 0
		


	ORDER BY f.Id

OfFSET @offSet Rows
Fetch Next @PageSize Rows ONLY

END


GO

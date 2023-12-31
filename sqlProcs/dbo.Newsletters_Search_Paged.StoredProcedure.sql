USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_Search_Paged]    Script Date: 3/17/2023 9:48:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Paul Segura>
-- Create date: <02/24/2023,,>
-- Description: <Search Paged with Desc >
-- Code Reviewer: 
-- Note: In Accordance With Immersed Task
-- MODIFIED BY: author
-- MODIFIED DATE:03/17/2023
-- Code Reviewer: Kolby Morris
-- Note:
-- =============================================

CREATE PROC [dbo].[Newsletters_Search_Paged]   
						@PageIndex int 
						,@PageSize int
						,@Query nvarchar(100)
						


/*

Declare @PageIndex int = 0
		,@PageSize int = 10
		,@Query nvarchar(100) = 'Cyber'

Execute [dbo].[Newsletters_Search_Paged]   
						@PageIndex
						,@PageSize 
						,Query
						
Select *
From [dbo].[Newsletters]

ORDER BY Id DESC, DateModified DESC, DateCreated DESC
*/


AS

BEGIN

  Declare @offset int = @PageIndex * @PageSize




  SELECT n.[Id]
      ,n.[DateModified]
	  ,n.[TemplateId]
      ,n.[Name]
      ,n.[CoverPhoto]
      ,n.[DateToPublish]
      ,n.[DateToExpire]
      ,n.[DateCreated]
      --,n.[CreatedBy]
	  ,u.[Id]
      ,u.[Email]
	  ,u.[FirstName]
      ,u.[LastName]
      ,u.[Mi]
      ,u.[AvatarUrl]
   --   ,u.[Password]
   --   ,u.[IsConfirmed]
   --   ,u.[StatusTypeId]
	  --,u.[DateCreated]
	  --,u.[DateModified]
	  , Totalcount = COUNT(1) OVER() 
        FROM    dbo.Newsletters   as n inner join [dbo].Users as u
		ON n.CreatedBy = u.Id
		WHERE n.Name LIKE '%' + @Query + '%' 		
        ORDER BY n.Id DESC, n.DateModified DESC, n.DateToPublish DESC, n.DateCreated DESC



	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY





END
GO

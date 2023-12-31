USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_SelectAll_Paged]    Script Date: 3/2/2023 10:32:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Paul Segura>
-- Create date: <02/24/2023,,>
-- Description: <Select by FileType Id(Paginated),,>
-- Code Reviewer:
-- Note: In Accordance With Immersed Task
-- MODIFIED BY: author
-- MODIFIED DATE:2/24/2023
-- Code Reviewer: Andy Garcia
-- Note:
-- =============================================
CREATE PROC [dbo].[Newsletters_SelectAll_Paged]   
						@PageIndex int 
						,@PageSize int
						


/*

Declare @PageIndex int = 0
		,@PageSize int = 10

Execute [dbo].[Newsletters_SelectAll_Paged]   
						@PageIndex
						,@PageSize 
						

*/


AS

BEGIN

  Declare @offset int = @PageIndex * @PageSize




  SELECT [Id]
      ,[DateModified]
	  ,[TemplateId]
      ,[Name]
      ,[CoverPhoto]
      ,[DateToPublish]
      ,[DateToExpire]
      ,[DateCreated]
      ,[CreatedBy]
	  , TotalCount = COUNT(1) OVER() -- this the quick way of doing the count. (see below)
        FROM    dbo.Newsletters
        ORDER BY Id
    

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY





END
GO

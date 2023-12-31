USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterTemplates_SelectAll]    Script Date: 2/27/2023 8:32:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <02/26/2023>
-- Description:	<SelectAll record for NewsletterTemplates>
-- Code Reviewer: Ricky Damazio


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

   CREATE PROC [dbo].[NewsletterTemplates_SelectAll]   
						@PageIndex int 
						,@PageSize int
						


/*

Execute [dbo].[NewsletterTemplates_SelectAll]   
						0
						,5

*/


AS

BEGIN

  Declare @offset int = @PageIndex * @PageSize




  SELECT [Id]
      ,[Name]
      ,[Description]
      ,[Content]
      ,[PrimaryImage]
      ,[DateCreated]
      ,[DateModified]
      ,[CreatedBy]
	  ,[ModifiedBy]
	  , TotalCount = COUNT(1) OVER() -- this the quick way of doing the count. (see below)
        FROM    dbo.NewsletterTemplates
        ORDER BY Id
    

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY





END
GO

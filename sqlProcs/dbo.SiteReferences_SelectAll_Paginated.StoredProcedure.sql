USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_SelectAll_Paginated]    Script Date: 3/17/2023 1:35:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <03/10/2023>
-- Description:	<Select All Paginated record for SiteReferences>
-- Code Reviewer: Steve Nam


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[SiteReferences_SelectAll_Paginated]
					 @PageIndex int
						,@PageSize int
as

/*

Execute [dbo].[SiteReferences_SelectAll]
					0
					,10 

*/

Begin

DECLARE @offset int = @PageIndex * @PageSize

SELECT sr.ReferenceTypeId
      ,sr.UserId
	  ,rt.Id
	  ,rt.Name
	  ,TotalCount = COUNT(1) OVER ()
  FROM [dbo].[SiteReferences] as sr inner join dbo.ReferenceTypes as rt
  on sr.ReferenceTypeId = rt.Id
  
  ORDER BY [ReferenceTypeId]
		OFFSET @Offset ROWS
		FETCH NEXT @PageSize ROWS ONLY 

End
GO

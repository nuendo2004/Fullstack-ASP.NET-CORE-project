USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_SelectSummary]    Script Date: 3/15/2023 2:50:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <03/10/2023>
-- Description:	<Select Summary record for SiteReferences>
-- Code Reviewer: Steve Nam


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[SiteReferences_SelectSummary]
					
as


/*

Execute [dbo].[SiteReferences_SelectSummary]
				
*/


Begin

SELECT rt.Id
, rt.Name
, count(*) as total
			  
  FROM [dbo].[SiteReferences] as sr inner join dbo.ReferenceTypes as rt
  on sr.ReferenceTypeId = rt.Id
  Group by rt.Id, rt.Name
  
End


GO

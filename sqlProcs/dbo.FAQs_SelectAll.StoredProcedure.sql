USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_SelectAll]    Script Date: 10/24/2022 9:50:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Brendalis Sanchez>
-- Create date: <10/22/2022>
-- Description:	<Select all in the FAQs table>
-- Code Reviewer: Noe Gallegos


-- MODIFIED BY: author
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[FAQs_SelectAll]

as


/* ----- Test Code -----

	Execute dbo.FAQs_SelectAll

*/

BEGIN

SELECT f.Id
      ,f.Question
      ,f.Answer
      ,fc.Id
	  ,fc.[Name]
      ,f.SortOrder

  FROM [dbo].[FAQs] as f join dbo.FAQCategories as fc
		on f.CategoryId = fc.Id

END
GO

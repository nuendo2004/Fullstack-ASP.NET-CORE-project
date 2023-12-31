USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_SelectByCategoryId]    Script Date: 10/24/2022 9:50:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Brendalis Sanchez>
-- Create date: <10/22/2022>
-- Description:	<Select by category id in the FAQs table>
-- Code Reviewer: Rey Villasenor


-- MODIFIED BY: author
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[FAQs_SelectByCategoryId]
				@CategoryId int

as

/* ----- Test Code -----

	DECLARE @CategoryId int = 1
	
	Execute dbo.FAQs_SelectByCategoryId @CategoryId

*/

	BEGIN

	SELECT f.Id
		  ,f.Question
		  ,f.Answer
		  ,fc.Id as CategoryId
		  ,fc.[Name] as CategoryName
		  ,f.SortOrder
      
	  FROM [dbo].[FAQs] as f join dbo.FAQCategories as fc
			on f.CategoryId = fc.Id
		
	WHERE [CategoryId] = @CategoryId

END
GO

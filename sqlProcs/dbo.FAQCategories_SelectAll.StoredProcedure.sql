USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[FAQCategories_SelectAll]    Script Date: 10/24/2022 9:50:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Brendalis Sanchez>
-- Create date: <10/21/2022>
-- Description:	<Select all by ids>
-- Code Reviewer: Noe Gallegos


-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[FAQCategories_SelectAll]

as

/*

Execute dbo.FAQCategories_SelectAll

*/

BEGIN

SELECT [Id]
      ,[Name]      

FROM dbo.FAQCategories

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[UrlTypes_SelectAll]    Script Date: 9/12/2022 20:38:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Patricio Alves dos Santos>
-- Create date: <12/07/2022>
-- Description:	<Selects all of the URL Types/Tasks>
-- Code Reviewer: <Augustus Chong>

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[UrlTypes_SelectAll]
	
AS

/*--------- TEST CODE --------------

	Execute [dbo].[UrlTypes_SelectAll]

*/

BEGIN


SELECT [Id]
      ,[Name]
  FROM [dbo].[UrlTypes]

END

GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[LocationTypes_SelectAll]    Script Date: 10/27/2022 3:30:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*
-- Author: <Gallegos, Noe>
-- Create date: <10/20/2022>
-- Description: <Select All Location Types Proc - No Pagination>
-- Code Reviewer: Miranda Merritt

-- MODIFIED BY: author
-- MODIFIED DATE:10/20/2022
-- Code Reviewer:
-- Note:
*/

CREATE PROC [dbo].[LocationTypes_SelectAll]

as

BEGIN

/*--------------TEST CODE---------------

EXECUTE dbo.LocationTypes_SelectAll

*/


SELECT [Id]
      ,[Name]
  FROM [dbo].[LocationTypes]

END


GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[States_SelectAll]    Script Date: 10/27/2022 3:30:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
-- Author: <Gallegos, Noe>
-- Create date: <10/20/2022>
-- Description: <Select All States Proc - No Pagination>
-- Code Reviewer: Miranda Merritt

-- MODIFIED BY: author
-- MODIFIED DATE:10/20/2022
-- Code Reviewer:
-- Note:
*/

CREATE PROC [dbo].[States_SelectAll]

as

BEGIN

/*--------------TEST CODE---------------
Execute dbo.States_SelectAll

*/


SELECT [Id]
      ,[Code]
      ,[Name]
  FROM [dbo].[States]

END


GO

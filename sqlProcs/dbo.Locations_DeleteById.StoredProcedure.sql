USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Locations_DeleteById]    Script Date: 10/27/2022 3:30:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
-- Author: <Gallegos, Noe>
-- Create date: <10/20/2022>
-- Description: <Deletes Records By ID from Locations Table>
-- Code Reviewer:Miranda Merritt

-- MODIFIED BY: author
-- MODIFIED DATE:10/20/2022
-- Code Reviewer:
-- Note:
*/

CREATE PROC [dbo].[Locations_DeleteById]
	@Id int

as

BEGIN

/*

Declare @Id int = 19

SELECT *
FROM dbo.Locations
WHERE Id = @Id

EXECUTE dbo.Locations_DeleteById @Id

SELECT *
FROM dbo.Locations
WHERE Id = @Id

*/

DELETE FROM [dbo].[Locations]
      WHERE Id = @Id

END

/*

*/


GO

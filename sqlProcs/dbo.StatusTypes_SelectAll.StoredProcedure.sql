USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[StatusTypes_SelectAll]    Script Date: 11/1/2022 2:47:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Hoang>
-- Create date: <10/28/2022>
-- Description: <Selects all StatusTypes>
-- Code Reviewer: Brendalis Sanchez

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[StatusTypes_SelectAll]

AS

/*
	EXECUTE dbo.StatusTypes_SelectAll
*/

BEGIN

	SELECT [Id]
			,[Name]
	FROM [dbo].StatusTypes

END
GO

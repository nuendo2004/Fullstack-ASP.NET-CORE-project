USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[OrganizationTypes_SelectAll]    Script Date: 25/10/2022 00:10:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <10/19/2022>
-- Description: <Select all OrganizationTypes without pagination>
-- Code Reviewer: Patrick Hangartner

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[OrganizationTypes_SelectAll]

/*
	EXECUTE [dbo].[OrganizationTypes_SelectAll]
*/

AS

BEGIN

	SELECT	[Id]
			,[Name]
	FROM [dbo].[OrganizationTypes]

END
GO

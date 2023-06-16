USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[FileTypes_SelectAll]    Script Date: 10/27/2022 3:45:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE Proc [dbo].[FileTypes_SelectAll]


	AS
	-- =============================================
-- Author: <Author,,Micheal White>
-- Create date: <10/20/2022,,>
-- Description: <Select All,,>
-- Code Reviewer: Miranda Merritt
-- Note: In Accordance With Immersed Task

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

	/*

	Execute dbo.FileTypes_SelectAll

	*/


	BEGIN


	SELECT [Id]
			,[Name]
		FROM [dbo].[FileTypes]

	END


GO

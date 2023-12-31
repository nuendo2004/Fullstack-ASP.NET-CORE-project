USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[DemoAccounts_SelectAll]    Script Date: 11/29/2022 18:57:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Augustus Chong>
-- Create date: <11/23/2022>
-- Description: <Selects all Demo Accounts>
-- Code Reviewer: Rafael Luviano

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE PROC [dbo].[DemoAccounts_SelectAll]

AS

/*

	EXECUTE dbo.DemoAccounts_SelectAll

*/

BEGIN

	SELECT	 [Id]
			,[CreatedBy]
			,[OrgId]
			,[StartDate]
			,[ExpirationDate]
			,[TotalCount] = COUNT(1) OVER()
	FROM [dbo].[DemoAccounts]

	ORDER BY Id

END
GO

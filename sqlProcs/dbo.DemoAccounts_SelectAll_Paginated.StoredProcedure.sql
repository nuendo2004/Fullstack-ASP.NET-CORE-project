USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[DemoAccounts_SelectAll_Paginated]    Script Date: 11/29/2022 18:57:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Augustus Chong>
-- Create date: <11/23/2022>
-- Description: <Selects all Demo Accounts in Paginated View>
-- Code Reviewer: Rafael Luviano

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE PROC [dbo].[DemoAccounts_SelectAll_Paginated]
	@PageIndex int
	,@PageSize int

AS

/*

	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE dbo.DemoAccounts_SelectAll_Paginated @PageIndex, @PageSize

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT	 [Id]
			,[CreatedBy]
			,[OrgId]
			,[StartDate]
			,[ExpirationDate]
			,[TotalCount] = COUNT(1) OVER()
	FROM [dbo].[DemoAccounts]

	ORDER BY Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO

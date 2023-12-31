USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[DemoAccounts_SelectById]    Script Date: 11/29/2022 18:57:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Augustus Chong>
-- Create date: <11/23/2022>
-- Description: <Selects Demo Account by Id>
-- Code Reviewer: Rafael Luviano

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE PROC [dbo].[DemoAccounts_SelectById]
	@Id int

AS

/*

	DECLARE @Id int = 1
	EXECUTE dbo.DemoAccounts_SelectById @Id

*/

BEGIN

	SELECT	 [Id]
			,[CreatedBy]
			,[OrgId]
			,[StartDate]
			,[ExpirationDate]
	FROM	[dbo].[DemoAccounts]
	WHERE	Id = @Id

END
GO

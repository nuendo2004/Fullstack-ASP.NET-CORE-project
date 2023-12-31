USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Analytics_Select_Stats]    Script Date: 01/03/2023 12:58:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Augustus Chong>
-- Create date: <12/29/2022>
-- Description: <Selects Counts from various Tables for Sys Admin Dash>
-- Code Reviewer: <John Soler>

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[Analytics_Select_Stats]

AS

/*

	EXECUTE [dbo].[Analytics_Select_Stats]

*/

BEGIN

	SELECT		 TotalOrgs =	(
								SELECT	COUNT(o.[Id])
								FROM	[dbo].[Organizations] AS o
								)
				,ActiveOrgs =	(
								SELECT	COUNT(CASE o.[IsDeleted] WHEN 0 THEN 1 ELSE NULL END)
								FROM	[dbo].[Organizations] AS o
								)
				,DemoAccounts60Days =	(
										SELECT	COUNT(CASE WHEN (da.[StartDate] > DATEADD(d, -60, GETDATE()) AND da.[ExpirationDate] > GETUTCDATE()) THEN 1 ELSE NULL END)
										FROM	[dbo].[DemoAccounts] AS da
										)
				,ActiveSubscriptions =	(
										SELECT	COUNT(CASE s.[isActive] WHEN 'active' THEN 1 ELSE NULL END)
										FROM	[dbo].[Subscriptions] AS s
										)

END
GO

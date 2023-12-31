USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_Select_StatusPerMonthYear]    Script Date: 12/03/2022 20:18:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Augustus Chong>
-- Create date: <12/01/2022>
-- Description: <Selects Total amount of Users based on Status, per Month and Year>
-- Code Reviewer: Rafael Luviano

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[Users_Select_StatusPerMonthYear]

AS

/*

	EXECUTE [dbo].[Users_Select_StatusPerMonthYear]

*/

BEGIN

	SELECT		 DATEADD(MONTH, DATEDIFF(MONTH, 0, [DateModified]), 0) AS DateModified
				,COUNT(CASE [StatusTypeId] WHEN 1 THEN 1 ELSE NULL END) AS ActiveUsers
				,COUNT(CASE [StatusTypeId] WHEN 2 THEN 1 ELSE NULL END) AS InactiveUsers
				,COUNT(CASE [StatusTypeId] WHEN 4 THEN 1 ELSE NULL END) AS FlaggedUsers
				,COUNT(CASE [StatusTypeId] WHEN 5 THEN 1 ELSE NULL END) AS RemovedUsers
				,COUNT([Id]) AS TotalUsers
	FROM		[dbo].[Users]
	GROUP BY	DATEADD(MONTH, DATEDIFF(MONTH, 0, [DateModified]), 0)

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Blogs_GetLatest]    Script Date: 11/17/2022 8:50:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <ANDREW HOANG>
-- Create date: <11/14/2022>
-- Description: <Selects latest blog post(s) based on quantity declared>
-- Code Reviewer: <THINZAR SOE>

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[Blogs_GetLatest]
	@numberSelection int
AS

/*

Declare @numberSelection int = 3

Execute dbo.Blogs_GetLatest @numberSelection

*/

BEGIN

	SELECT TOP (@numberSelection)
		b.[Id]
		,bt.Name AS BlogType
		,u.FirstName AS AuthorFirstName
		,u.Mi AS AuthorMi
		,u.LastName AS AuthorLastName
		,u.AvatarUrl AS AuthorAvatarUrl
		,b.[Title]
		,b.[Subject]
		,b.[Content]
		,b.[ImageUrl]
		,b.[isApproved]
		,u2.FirstName AS ApproverFirstName
		,u2.Mi AS ApproverMi
		,u2.LastName AS ApproverLastName
		,u2.AvatarUrl AS ApproverAvatarUrl
		,b.[IsPublished]
		,b.[DatePublished]
		,b.[DateCreated]
		,b.[DateModified]

	FROM [dbo].[Blogs] as b INNER JOIN dbo.BlogTypes as bt
						ON b.BlogTypeId = bt.Id
							INNER JOIN dbo.Users as u
						ON b.AuthorId = u.Id
							INNER JOIN dbo.Users as u2
						ON b.ApprovedBy = u2.Id
	WHERE b.IsApproved = 0
		AND b.IsPublished = 0
		AND b.IsDeleted = 1

	ORDER BY b.DateCreated DESC
END
GO

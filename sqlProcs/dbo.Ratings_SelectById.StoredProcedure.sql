USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Ratings_SelectById]    Script Date: 11/21/2022 9:32:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Guillermo Schauer>
-- Create date: <11/18/2022>
-- Description:	<Select_ById proc for dbo.Ratings>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE PROC [dbo].[Ratings_SelectById] 
			@Id int

AS
/* ----- TEST CODE -----

	Declare @Id int = 21
	
	Execute [dbo].[Ratings_SelectById] @Id
*/  

BEGIN



SELECT   r.[Id]
		,r.[Rating]
		,c.Id as CommentId
		,et.Id as EntityTypeId 
		,et.Name as EntityName 
		,r.[EntityId] 
		,uc.Id AS CreatedBy 
		,r.[DateCreated]
		,um.Id AS ModifiedBy 
		,r.[DateModified]
		,r.[IsDeleted]

    FROM	[dbo].[Ratings] AS r 
			INNER JOIN dbo.EntityTypes AS et 
				ON r.EntityTypeId = et.Id
			INNER JOIN dbo.Comments as c
				ON r.CommentId = c.Id
			INNER JOIN dbo.Users as uc
				ON r.CreatedBy = uc.Id
			INNER JOIN dbo.Users as um
				ON r.ModifiedBy = um.Id

	where r.Id = @Id	
	
END

GO

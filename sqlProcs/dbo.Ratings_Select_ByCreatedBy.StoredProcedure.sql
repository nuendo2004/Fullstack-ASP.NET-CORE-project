USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Ratings_Select_ByCreatedBy]    Script Date: 11/21/2022 9:32:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Guillermo Schauer>
-- Create date: <11/19/2022>
-- Description:	<Select_ByCreatedBy proc for dbo.Ratings>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[Ratings_Select_ByCreatedBy] 
				 @PageIndex int
				,@PageSize int
				,@UserId int
	
AS
/*
Declare  @PageIndex int = 0
		,@PageSize int = 10
		,@UserId int = 8
	

	Execute dbo.Ratings_Select_ByCreatedBy
			@PageIndex
			,@PageSize
			,@UserId
			

	Select *
	from dbo.Ratings
*/
BEGIN

Declare @offset int = @PageIndex * @PageSize

SELECT   r.[Id]
		,r.[Rating]
		,c.Subject as SubjectComment
		,c.Text as TextComment
		,et.Id as EntityTypeId 
		,et.Name as EntityName 
		,r.[EntityId] 
		,uc.FirstName AS CreatedBy
		,uc.LastName AS CreatedBy
		,r.[DateCreated]
		,um.FirstName AS ModifiedBy
		,um.LastName AS ModifiedBy
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

	Where r.CreatedBy = @UserId
	ORDER BY r.CreatedBy
	  OFFSET @offset ROWS
	  FETCH NEXT @PageSize ROWS ONLY
END

GO

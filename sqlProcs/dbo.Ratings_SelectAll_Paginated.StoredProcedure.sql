USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Ratings_SelectAll_Paginated]    Script Date: 11/21/2022 9:32:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Guillermo Schauer>
-- Create date: <11/19/2022>
-- Description:	<SelectAll_Paginated proc for dbo.Ratings>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE PROC [dbo].[Ratings_SelectAll_Paginated] 
			@PageIndex int
			,@PageSize int

AS
/*
Declare @PageIndex int = 0
	   ,@PageSize int = 10

Execute dbo.Ratings_SelectAll_Paginated

		@PageIndex
		,@PageSize
	
Select * 
From dbo.Ratings
*/

BEGIN
	Declare @offset int = @PageIndex * @PageSize

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
		,TotalCount = COUNT(1) OVER()

		FROM	[dbo].[Ratings] AS r 
			INNER JOIN dbo.EntityTypes AS et 
				ON r.EntityTypeId = et.Id
			INNER JOIN dbo.Comments as c
				ON r.CommentId = c.Id
			INNER JOIN dbo.Users as uc
				ON r.CreatedBy = uc.Id
			INNER JOIN dbo.Users as um
				ON r.ModifiedBy = um.Id
		Where r.IsDeleted = 0

		Order by Id
		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY
END
GO

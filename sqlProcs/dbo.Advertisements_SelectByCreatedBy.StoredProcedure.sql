USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Advertisements_SelectByCreatedBy]    Script Date: 14/11/2022 16:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <11/10/2022>
-- Description: <Advertisements Select by created by.>
-- Code Reviewer: 

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Advertisements_SelectByCreatedBy]
	@PageIndex int
	,@PageSize int
	,@UserId int

/*
	
	DECLARE @userId int = 20
			,@pageIndex int = 0
			,@pageSize int = 10

	EXECUTE [dbo].[Advertisements_SelectByCreatedBy]
			@pageIndex
			,@pageSize
			,@userId

*/

AS

BEGIN
	
	DECLARE @offset int = @PageIndex * @PageSize

	SELECT	a.[Id]
			,[EntityId]
			,[EntityTypeId]
			,EntityTypeName = et.[Name]
			,[Title]
			,[AdMainImageUrl]
			,[Details]
			,[ActionId]
			,[IsDisabled]
			,a.[DateCreated]
			,a.[DateModified]
			,a.[CreatedBy]
			,a.[ModifiedBy]
			,COUNT(1) OVER () TotalCount
	
	FROM [dbo].[Advertisements] AS a INNER JOIN [dbo].[EntityTypes] AS et ON a.[EntityTypeId] = et.[Id]
	WHERE	(
			a.[CreatedBy] = @UserId
			AND
			[IsDisabled] = 0
			)
	
	ORDER BY a.[Id]
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO

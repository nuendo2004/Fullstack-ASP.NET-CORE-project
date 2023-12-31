USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Advertisements_SelectAll]    Script Date: 14/11/2022 16:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <11/10/2022>
-- Description: <Advertisements Select All paginaged.>
-- Code Reviewer: 

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Advertisements_SelectAll]
	@PageIndex int
	,@PageSize int

/*
	
	DECLARE @pageIndex int = 0
			,@pageSize int = 10

	EXECUTE [dbo].[Advertisements_SelectAll]
			@pageIndex
			,@pageSize

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
	WHERE [IsDisabled] = 0

	ORDER BY a.[Id]
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO

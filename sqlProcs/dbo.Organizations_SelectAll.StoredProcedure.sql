USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_SelectAll]    Script Date: 25/10/2022 00:10:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <10/20/2022>
-- Description: <Select a paginaged list of oragnizations.>
-- Code Reviewer: Patrick Hangartner

-- MODIFIED BY: author
-- MODIFIED DATE: 12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Organizations_SelectAll]
		@PageIndex int
		,@PageSize int
/*
	
	DECLARE @pageIndex int = 0
			,@pageSize int = 5

	EXECUTE [dbo].[Organizations_SelectAll]
		@pageIndex
		,@pageSize

*/

AS

BEGIN
	
	DECLARE @offset int = @PageIndex * @PageSize

	SELECT	o.[Id]
			,ot.[Id] AS OrganizationTypeId
			,ot.[Name] AS OrganizationType
			,o.[Name]
			,[Description]
			,[LogoUrl]
			,[BusinessPhone]
			,l.[Id] AS PrimaryLocation
			,[LocationTypeId]
			,lt.[Name]
			,[LineOne]
			,[LineTwo]
			,[City]
			,[Zip]
			,[StateId]
			,[Latitude]
			,[Longitude]
			,[SiteUrl]
			,o.[DateCreated]
			,o.[DateModified]
			,o.[CreatedBy]
			,o.[ModifiedBy]
			,COUNT(1) OVER () TotalCount
	FROM [dbo].[Organizations] AS o INNER JOIN [dbo].[OrganizationTypes] AS ot ON o.[OrganizationTypeId] = ot.Id
		LEFT OUTER JOIN [dbo].[Locations] AS l ON [PrimaryLocationId] = l.[Id]
		LEFT OUTER JOIN [dbo].[LocationTypes] AS lt ON l.[LocationTypeId] = lt.[Id]
	WHERE [IsDeleted] = 0
	ORDER BY Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO

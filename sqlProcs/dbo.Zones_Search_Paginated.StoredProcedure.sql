USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_Search_Paginated]    Script Date: 12/13/2022 15:56:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/20/2022>
-- Description:	<A select by Zone Status and by Zone Type proc for the Zones dbo taking into account if the Zone is deleted or not>
-- Code Reviewer:<Kyle Kilby>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================





CREATE PROC [dbo].[Zones_Search_Paginated]    
		  @PageIndex int 
		  ,@PageSize int
		  ,@Query nvarchar(50)



AS
/*
Declare @PageIndex int = 0
		  ,@PageSize int = 10
		  ,@Query nvarchar(50) = 'Postman'

Execute dbo.Zones_Search_Paginated 
			@PageIndex
		  ,@PageSize 
		  ,@Query 
*/

BEGIN

Declare @offset int = @PageIndex * @PageSize  
	
SELECT	z.[Id]
		,z.[Name]
		,z.[Description] 
		,z.[ImageUrl]
		,zt.[Id] as ZoneTypeId
		,zt.[Name] as ZoneType
		,zs.[Id] as ZoneStatusId
		,zs.[Name] as ZoneStatus
		,z.[IsDeleted]
		,z.[CreatedBy]
		,z.[ModifiedBy]
		,z.[DateCreated]
		,z.[DateModified]
		, TotalCount = COUNT(1) OVER() -- this the quick way of doing the count. (see below)
		FROM dbo.Zones AS z
		INNER JOIN dbo.ZoneTypes AS zt ON z.ZoneTypeId = zt.Id
		INNER JOIN dbo.ZoneStatus AS zs ON z.ZoneStatusId = zs.Id



		  WHERE ((z.[Name] LIKE '%' + @Query + '%')OR(z.[Description] LIKE '%' + @Query + '%')) AND (z.IsDeleted = 0)
  ORDER BY z.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END

GO

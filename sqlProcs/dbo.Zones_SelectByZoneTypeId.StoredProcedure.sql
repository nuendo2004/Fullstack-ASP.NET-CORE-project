USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_SelectByZoneTypeId]    Script Date: 12/13/2022 15:56:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/23/2022>
-- Description:	<A select by Zone Type proc for the Zones dbo taking into account if the Zone is deleted or not>
-- Code Reviewer:<Micheal White>


-- MODIFIED BY: <Joe Medina>
-- MODIFIED DATE: <11/22/2022>
-- Code Reviewer: 
-- Note: Made non-paginated into paginated
-- =============================================

CREATE proc [dbo].[Zones_SelectByZoneTypeId]
		@ZTypeId int
		,@PageIndex int
		,@PageSize int
AS

/*----------TEST CODE----------
Declare @ZTypeId int = 1
		,@PageIndex int = 0
		,@PageSize int = 8

Execute dbo.Zones_SelectByZoneTypeId 
	@ZTypeId
	,@PageIndex
	,@PageSize
*/

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

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
			,TotalCount = COUNT(1) OVER()
	FROM	dbo.Zones AS z
			INNER JOIN dbo.ZoneTypes AS zt 
				ON z.ZoneTypeId = zt.Id
			INNER JOIN dbo.ZoneStatus AS zs 
				ON z.ZoneStatusId = zs.Id
	WHERE	zt.Id = @ZTypeId 
			AND z.IsDeleted = 0
	ORDER BY Id
	OFFSET @Offset Rows
	FETCH NEXT @PageSize ROWS ONLY

END
GO

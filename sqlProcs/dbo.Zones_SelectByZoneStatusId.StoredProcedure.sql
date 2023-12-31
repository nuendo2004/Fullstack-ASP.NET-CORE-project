USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_SelectByZoneStatusId]    Script Date: 12/13/2022 15:56:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Andrew Ramirez>
-- Create date: <12/5/2022>
-- Description:	<A select by Zone Status proc for the Zones, created based off paginated version already created>
-- Code Reviewer:< >


-- MODIFIED BY: < >
-- MODIFIED DATE: < >
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc [dbo].[Zones_SelectByZoneStatusId]
		@ZStatusId int

AS

/*----------TEST CODE----------

Declare	@ZStatus int = 2

Execute dbo.Zones_SelectByZoneStatusId 
	@ZStatus

*/

BEGIN

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
	FROM	dbo.Zones AS z
			INNER JOIN dbo.ZoneTypes AS zt 
				ON z.ZoneTypeId = zt.Id
			INNER JOIN dbo.ZoneStatus AS zs 
				ON z.ZoneStatusId = zs.Id
	WHERE	zs.Id = @ZStatusId 
			AND z.IsDeleted = 0

END
GO

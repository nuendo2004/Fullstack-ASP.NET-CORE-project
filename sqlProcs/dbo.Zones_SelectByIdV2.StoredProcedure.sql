USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_SelectByIdV2]    Script Date: 12/13/2022 15:56:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/20/2022>
-- Description:	<A select by Id proc for the Zones dbo without taking into account if the Zone is deleted or not>
-- Code Reviewer:<Micheal White>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================



CREATE proc [dbo].[Zones_SelectByIdV2]
	@Id int
as

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

		FROM dbo.Zones AS z
		INNER JOIN dbo.ZoneTypes AS zt ON z.ZoneTypeId = zt.Id
		INNER JOIN dbo.ZoneStatus AS zs ON z.ZoneStatusId = zs.Id

		Where z.Id = @Id

END

/*----------TEST CODE----------
Declare @Id int = 5
Execute dbo.Zones_SelectByIdV2 @Id

*/
GO

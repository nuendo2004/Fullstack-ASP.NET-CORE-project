USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Advertisements_SelectById]    Script Date: 14/11/2022 16:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <11/10/2022>
-- Description: <Advertisements Select by Id.>
-- Code Reviewer: <Damian Stella>

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Advertisements_SelectById]
	@Id int

/*
	
	DECLARE @id int = 3

	EXECUTE [dbo].[Advertisements_SelectById]
			@id

*/

AS

BEGIN

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
	
	FROM [dbo].[Advertisements] AS a INNER JOIN [dbo].[EntityTypes] AS et ON a.[EntityTypeId] = et.[Id]

	WHERE	(
			a.[Id] = @Id
			AND
			IsDisabled = 0
			)

END
GO

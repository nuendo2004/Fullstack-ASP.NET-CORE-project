USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Messages_Select_Conversation]    Script Date: 10/31/2022 22:13:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Joe Medina>
-- Create date: <10/30/2022>
-- Description: <Select Messages By Conversation>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE: <10/30/2022>
-- Code Reviewer: Damian Stella
-- Note:
-- =============================================
CREATE proc [dbo].[Messages_Select_Conversation]
	@EntityId1 int
	,@EntityTypeId1 int
	,@EntityId2 int
	,@EntityTypeId2 int

AS
/*

DECLARE	@EntityTypeId1 int = 1
	,@EntityId1 int = 66
	,@EntityTypeId2 int = 1
	,@EntityId2 int = 8

EXECUTE dbo.Messages_Select_Conversation
	@EntityId1
	,@EntityTypeId1
	,@EntityId2
	,@EntityTypeId2

*/

BEGIN

	SELECT
		m.[Id]
		,m.[Message]
		,m.[Subject]
		,RecipientData = 
			CASE 
				WHEN m.RecipientEntityTypeId = 1
					THEN	(
							SELECT	u.FirstName + ' ' + u.LastName AS Name
									,u.AvatarUrl
							FROM	dbo.Users as u
							WHERE	u.Id = m.RecipientId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
				--WHEN RecipientEntityTypeId = 2
				WHEN m.RecipientEntityTypeId = 3
					THEN	(
							SELECT	u.FirstName + ' ' + u.LastName AS Name
									,u.AvatarUrl
							FROM	dbo.Trainees as t
									INNER JOIN dbo.Users as u
										ON t.UserId = u.Id
							WHERE	t.Id = m.RecipientId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
				--WHEN RecipientEntityTypeId = 5
				WHEN m.RecipientEntityTypeId = 6
					THEN	(
							SELECT	z.Name
									,ZoneType =
										(
										SELECT	zt.Name
										FROM	dbo.ZoneTypes as zt
										WHERE	z.ZoneTypeId = zt.Id
										)
							FROM	dbo.Zones as z
							WHERE	z.Id = m.RecipientId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
			END
		,SenderData =
			CASE 
				WHEN m.SenderEntityTypeId = 1
					THEN	(
							SELECT	u.FirstName + ' ' + u.LastName AS Name
									,u.AvatarUrl
							FROM	dbo.Users as u
							WHERE	m.SenderId = u.Id
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
				--WHEN SenderEntityTypeId = 2
				WHEN m.SenderEntityTypeId = 3
					THEN	(
							SELECT	u.FirstName + ' ' + u.LastName AS Name,u.LastName
									,u.AvatarUrl
							FROM	dbo.Users as u
									INNER JOIN dbo.Trainees AS t
										ON u.Id = t.UserId
							WHERE	t.Id = m.SenderId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
				--WHEN SenderEntityTypeId = 5
				WHEN m.SenderEntityTypeId = 6
					THEN	(
							SELECT	z.Name
									,ZoneType =
										(
										SELECT	zt.Name
										FROM	dbo.ZoneTypes as zt
										WHERE	z.ZoneTypeId = zt.Id
										)
							FROM	dbo.Zones as z
							WHERE	z.Id = m.SenderId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
			END
		,m.[ZoneId]
		,m.[IsDeleted]
		,m.[DateSent]
		,m.[DateRead]
	FROM	dbo.Messages as m
	WHERE	((SenderEntityTypeId = @EntityTypeId1
			AND SenderId = @EntityId1)
			OR
			(SenderEntityTypeId = @EntityTypeId2
			AND SenderId = @EntityId2))
			AND
			((RecipientEntityTypeId = @EntityTypeId1
			AND RecipientId = @EntityId1)
			OR
			(RecipientEntityTypeId = @EntityTypeId2
			AND RecipientId = @EntityId2))
	ORDER BY DateSent desc

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Messages_Select_ByRecipientId]    Script Date: 10/31/2022 22:13:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Joe Medina>
-- Create date: <10/30/2022>
-- Description: <Select By Recipient Id Message>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE: <10/30/2022>
-- Code Reviewer: Damian Stella
-- Note:
-- =============================================
CREATE proc [dbo].[Messages_Select_ByRecipientId]
	@RecipientEntityTypeId int
	,@RecipientId int
AS

/*

DECLARE	@RecipientEntityTypeId int = 1
		,@RecipientId int = 8

EXECUTE dbo.Messages_Select_ByRecipientId
	@RecipientEntityTypeId
	,@RecipientId

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
							WHERE	u.Id = @RecipientId
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
							WHERE	t.Id = @RecipientId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
				--WHEN RecipientEntityTypeId = 5
				WHEN RecipientEntityTypeId = 6
					THEN	(
							SELECT	z.Name
									,ZoneType =
										(
										SELECT	zt.Name
										FROM	dbo.ZoneTypes as zt
										WHERE	z.ZoneTypeId = zt.Id
										)
							FROM	dbo.Zones as z
							WHERE	z.Id = @RecipientId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
			END
		,SenderData =
			CASE 
				WHEN SenderEntityTypeId = 1
					THEN	(
							SELECT	u.FirstName + ' ' + u.LastName AS Name
									,u.AvatarUrl
							FROM	dbo.Users as u
							WHERE	m.SenderId = u.Id
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
				--WHEN SenderEntityTypeId = 2
				WHEN SenderEntityTypeId = 3
					THEN	(
							SELECT	u.FirstName + ' ' + u.LastName AS Name
									,u.AvatarUrl
							FROM	dbo.Users as u
									INNER JOIN dbo.Trainees AS t
										ON u.Id = t.UserId
							WHERE	t.Id = m.SenderId
							FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
							)
				--WHEN SenderEntityTypeId = 5
				WHEN SenderEntityTypeId = 6
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
	WHERE	RecipientEntityTypeId = @RecipientEntityTypeId
			AND RecipientId = @RecipientId
	ORDER BY DateSent desc

END
GO

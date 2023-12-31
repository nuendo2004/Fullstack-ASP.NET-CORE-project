USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeGroups_Delete]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	< Rey Villasenor >
-- Create date: < 10/24/2022 >
-- Description:	< TraineeGroups_Delete (By GroupId and TraineeId >
-- Code Reviewer: Justin Nguyen


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[TraineeGroups_Delete]
			@TraineeId int
			,@GroupId int
			
AS

/* --- TEST CODE :) ---

	DECLARE @TraineeId int = 8
			,@GroupId int = 6

	SELECT *
	FROM [dbo].[TraineeGroups]
	WHERE	(
			TraineeId = @TraineeId
			AND
			GroupId = @GroupId
			)

	EXECUTE [dbo].[TraineeGroups_Delete]
			@TraineeId
			,@GroupId

	SELECT *
	FROM [dbo].[TraineeGroups]
	WHERE	(
			TraineeId = @TraineeId
			AND
			GroupId = @GroupId
			)

	SELECT * FROM [dbo].[Trainees]
	SELECT * FROM [dbo].[ZoneGroups]


*/

BEGIN


	DELETE FROM [dbo].[TraineeGroups]
	WHERE	(
			TraineeId = @TraineeId
			AND
			GroupId = @GroupId
			)

	SELECT *
	FROM [dbo].[TraineeGroups]
	WHERE	(
			TraineeId = @TraineeId
			AND
			GroupId = @GroupId
			)

END

GO

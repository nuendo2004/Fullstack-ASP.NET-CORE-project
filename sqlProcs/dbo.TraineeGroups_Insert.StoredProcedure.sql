USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeGroups_Insert]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	< Rey Villasenor >
-- Create date: < 10/24/2022 >
-- Description:	< TraineeGroups_Insert >
-- Code Reviewer: Justin Nguyen


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[TraineeGroups_Insert]
			@TraineeId int
			,@GroupId int
			
AS

/* --- TEST CODE :) ---

	DECLARE @TraineeId int = 8
			,@GroupId int = 6

	EXECUTE [dbo].[TraineeGroups_Insert]
			@TraineeId
			,@GroupId

	SELECT *
	FROM [dbo].[TraineeGroups]

	SELECT * FROM [dbo].[Trainees]
	SELECT * FROM [dbo].[ZoneGroups]


*/

BEGIN


	INSERT INTO [dbo].[TraineeGroups]
           ([TraineeId]
           ,[GroupId])
     
	VALUES	(@TraineeId
			,@GroupId)

END

GO

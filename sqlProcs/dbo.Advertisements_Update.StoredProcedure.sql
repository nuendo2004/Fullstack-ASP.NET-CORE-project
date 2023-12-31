USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Advertisements_Update]    Script Date: 14/11/2022 16:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <11/10/2022>
-- Description: <Advertisements Update.>
-- Code Reviewer: <Damian Stella>

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Advertisements_Update]
		@EntityId int
		,@EntityTypeId int
		,@Title nvarchar(100)
		,@AdMainImageUrl nvarchar(400)
		,@Details nvarchar(500)
		,@ActionId nvarchar(100)
		,@UserId int
		,@Id int

/*
	
	DECLARE	@entityId int = 1
			,@entityTypeId int = 2
			,@title nvarchar(100) = 'Updated title'
			,@adMainImageUrl nvarchar(400) = 'tinyurl.com/yezbya58'
			,@details nvarchar(500) = 'Updated details'
			,@actionId nvarchar(100) = 'Updated action'
			,@userId int = 20
			,@id int = 1

	EXECUTE dbo.Advertisements_Update
			@entityId
			,@entityTypeId
			,@title
			,@adMainImageUrl
			,@details
			,@actionId
			,@userId
			,@id

	SELECT *
	FROM dbo.Advertisements
	WHERE Id = @id

*/

AS

BEGIN
	
	DECLARE @utcTimeNow datetime2 = GETUTCDATE()

	UPDATE dbo.Advertisements
	SET EntityId = @EntityId
		,EntityTypeId = @EntityTypeId
		,Title = @Title
		,AdMainImageUrl = @AdMainImageUrl
		,Details = @Details
		,ActionId = @ActionId
		,ModifiedBy = @UserId
		,DateModified = @utcTimeNow
	WHERE Id = @Id

END
GO

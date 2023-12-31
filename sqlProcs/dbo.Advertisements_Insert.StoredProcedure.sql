USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Advertisements_Insert]    Script Date: 14/11/2022 16:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <11/10/2022>
-- Description: <Advertisements insert.>
-- Code Reviewer: <Damian Stella>

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Advertisements_Insert]
	@EntityId int
	,@EntityTypeId int
	,@Title nvarchar(100)
	,@AdMainImageUrl nvarchar(400)
	,@Details nvarchar(500)
	,@ActionId nvarchar(100)
	,@UserId int
	,@Id int OUTPUT

/*
	DECLARE	@entityId int = 1
			,@entityTypeId int = 2
			,@title nvarchar(100) = 'Become a Software Engineer'
			,@adMainImageUrl nvarchar(400) = 'tinyurl.com/yezbya58'
			,@details nvarchar(500) = 'Some details'
			,@actionId nvarchar(100) = 'gui'
			,@userId int = 20
			,@id int = 0

	EXECUTE dbo.Advertisements_Insert
			@entityId
			,@entityTypeId
			,@title
			,@adMainImageUrl
			,@details
			,@actionId
			,@userId
			,@id OUTPUT
	
	SELECT *
	FROM dbo.Advertisements
	WHERE Id = @id
	
*/

AS

BEGIN
	
	INSERT INTO dbo.Advertisements
				(
				EntityId
				,EntityTypeId
				,Title
				,AdMainImageUrl
				,Details
				,ActionId
				,CreatedBy
				,ModifiedBy
				)
	VALUES
			(
			@EntityId
			,@EntityTypeId
			,@Title
			,@AdMainImageUrl
			,@Details
			,@ActionId
			,@UserId
			,@UserId
			)

	SET @Id = SCOPE_IDENTITY()

END
GO

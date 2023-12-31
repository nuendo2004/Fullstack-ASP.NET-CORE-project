USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Ratings_Insert]    Script Date: 1/4/2023 4:47:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Guillermo Schauer>
-- Create date: <11/18/2022>
-- Description:	<Insert for dbo.Ratings>
-- Code Reviewer: Patricio Alves dos Santos

-- MODIFIED BY: Guillermo Schauer
-- MODIFIED DATE:01/04/2023
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[Ratings_Insert]
			@Rating tinyint
			,@CommentId int = NULL
			,@EntityTypeId int
			,@EntityId int
			,@UserId int
			,@Id int OUTPUT
			

/* ----- TEST CODE -----

Declare @Id int

Declare		@Rating tinyint = 1
			,@CommentsId int = NULL
			,@EntityTypeId int = 7 
			,@EntityId int = 8
			,@UserId int = 8
			

Execute dbo.Ratings_Insert
						@Rating
						,@CommentsId
						,@EntityTypeId
						,@EntityId
						,@UserId
						,@Id OUTPUT


		Select *
		From dbo.Ratings
		Where Id = @Id

		Select * 
		From dbo.Comments
*/
AS

	BEGIN
	IF EXISTS (SELECT 1 FROM dbo.Ratings WHERE CreatedBy = @UserId AND EntityId = @EntityId AND EntityTypeId = @EntityTypeId)
		BEGIN
			UPDATE dbo.Ratings
			SET  rating = @Rating
			WHERE CreatedBy = @UserId AND EntityId = @EntityId AND EntityTypeId = @EntityTypeId

			SET @Id= (SELECT Id FROM dbo.Ratings WHERE CreatedBy = @UserId AND EntityId = @EntityId AND EntityTypeId = @EntityTypeId)
		END
		ELSE

		BEGIN
			
		INSERT INTO [dbo].[Ratings]
			   ([Rating]
			   ,[CommentId]
			   ,[EntityTypeId]
			   ,[EntityId]
			   ,[CreatedBy]
			   ,[ModifiedBy])
		 VALUES
			   (@Rating
				,@CommentId
				,@EntityTypeId
				,@EntityId
				,@UserId
				,@UserId)

		SET @Id = SCOPE_IDENTITY()

	END

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Ratings_Update]    Script Date: 11/21/2022 9:32:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Guillermo Schauer>
-- Create date: <11/18/2022>
-- Description:	<Update proc for dbo.Ratings>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[Ratings_Update]
			 @Rating tinyint
			,@CommentId int
			,@EntityTypeId int
			,@EntityId int
			,@UserId int
			,@Id int 
	
AS

/*
Declare @Id int = 8;

Declare		@Rating tinyint = 12
			,@CommentsId int = 15
			,@EntityTypeId int = 8
			,@EntityId int = 8
			,@UserId int = 17
			
Select * 
		From dbo.Ratings
		Where Id = @Id

Execute dbo.Ratings_Update
						@Rating
						,@CommentsId
						,@EntityTypeId
						,@EntityId
						,@UserId
						,@Id


		Select *
		From dbo.Ratings
		Where Id = @Id

*/

BEGIN
	Declare @datNow datetime2 = getutcdate ();

	UPDATE [dbo].[Ratings]
    SET		[Rating] = @Rating
           ,[CommentId] = @CommentId
           ,[EntityTypeId] = @EntityTypeId
           ,[EntityId] = @EntityId
           ,[ModifiedBy] = @UserId
		   ,[DateModified] = @datNow

	WHERE Id = @Id

END
GO

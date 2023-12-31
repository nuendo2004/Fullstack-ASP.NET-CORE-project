USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Ratings_DeleteById]    Script Date: 11/21/2022 9:32:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Guillermo Schauer>
-- Create date: <11/18/2022>
-- Description:	<DeleteById proc for dbo.Ratings>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[Ratings_DeleteById]
		   @Id int 
		   ,@ModifiedBy int

AS

/*-----------TEST CODE--------------

Declare @Id int = 21;
Declare @ModifiedBy int = 8

		Select * 
		From dbo.Ratings
		Where Id = @Id

Execute dbo.Ratings_DeleteById
		@Id
		,@ModifiedBy

		Select * 
		From dbo.Ratings
		Where Id = @Id

*/

BEGIN

Declare @datNow datetime2 = getutcdate ();

UPDATE [dbo].[Ratings]
   SET 
	  [IsDeleted] = 1
	  ,[ModifiedBy] = @ModifiedBy
      ,[DateModified] = @datNow

WHERE Id = @Id

END

GO

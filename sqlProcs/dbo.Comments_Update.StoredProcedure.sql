USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Update]    Script Date: 11/18/2022 5:03:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Luviano, Rafael >
-- Create date: <16 Nov 2022,>
-- Description: < Comments Update>
-- Code Reviewer: Damian Stella
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[Comments_Update]
		@Id int
	   ,@Subject nvarchar(50)
	   ,@Text nvarchar(3000)
	   ,@ParentId int
	   ,@EntityTypeId int
	   ,@EntityId int
	   ,@CreatedBy int
	   
	
AS

/*

	declare @Id int = 15
		   ,@Subject nvarchar(50) = 'subject88'
		   ,@Text nvarchar(3000) = 'text'
		   ,@ParentId int = 12
		   ,@EntityTypeId int = 1
		   ,@EntityId int = 2
		   ,@CreatedBy int = 8
		   
	
	execute dbo.Comments_Update
			@Id 
		   ,@Subject 
		   ,@Text 
		   ,@ParentId 
		   ,@EntityTypeId 
		   ,@EntityId
		   ,@CreatedBy
		 

		   select *
		   from dbo.Comments
		    

*/

BEGIN

	UPDATE [dbo].[Comments]
	   SET [Subject] = @Subject
		  ,[Text] = @Text
		  ,[ParentId] = @ParentId
		  ,[EntityTypeId] = @EntityTypeId
		  ,[EntityId] = @EntityId
		  ,[CreatedBy] = @CreatedBy
		  ,[DateModified] = GETUTCDATE()

		WHERE Id = @Id

 End


GO

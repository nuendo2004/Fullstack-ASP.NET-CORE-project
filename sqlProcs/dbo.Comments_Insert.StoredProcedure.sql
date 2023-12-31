USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Insert]    Script Date: 11/18/2022 5:03:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Luviano, Rafael >
-- Create date: <16 Nov 2022>
-- Description: < Comments Insert>
-- Code Reviewer: Damian Stella
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================


CREATE proc [dbo].[Comments_Insert]
	    @Subject nvarchar(50)
	   ,@Text nvarchar(3000)
	   ,@ParentId int
	   ,@EntityTypeId int
	   ,@EntityId int
	   ,@CreatedBy int	   
	   ,@Id int OUTPUT
	

/*

Declare @Subject nvarchar(50) = 'subject144'
	   ,@Text nvarchar(3000) = 'texting1044'
	   ,@ParentId int = 1 
	   ,@EntityTypeId int= 2
	   ,@EntityId int =2
	   ,@CreatedBy int = 22
	   ,@Id int = 0 
	   
Execute dbo.Comments_Insert
			@Subject 
		   ,@Text 
		   ,@ParentId 
		   ,@EntityTypeId 
		   ,@EntityId
		   ,@CreatedBy
		   ,@Id OUTPUT

		   select *
		   from dbo.Comments
		

*/

as 

BEGIN

INSERT INTO [dbo].[Comments]
           ([Subject]
           ,[Text]
           ,[ParentId]
           ,[EntityTypeId]
           ,[EntityId]
           ,[CreatedBy])
     VALUES
            (@Subject 
		   ,@Text 
		   ,@ParentId 
		   ,@EntityTypeId 
		   ,@EntityId
		   ,@CreatedBy)


		   SET @Id = SCOPE_IDENTITY()
	
END
GO

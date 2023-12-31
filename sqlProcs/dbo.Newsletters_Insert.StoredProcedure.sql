USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_Insert]    Script Date: 3/2/2023 10:32:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Paul Segura>
-- Create date: <02/24/2023,,>
-- Description: <Insert by FileType Id,,>
-- Code Reviewer:
-- Note: In Accordance With Immersed Task
-- MODIFIED BY: author
-- MODIFIED DATE:2/24/2023
-- Code Reviewer: Andy Garcia
-- Note:
-- =============================================
CREATE Proc [dbo].[Newsletters_Insert]
					
					@TemplateId int
					,@Name nvarchar(100)
					,@CoverPhoto nvarchar(255)										
					,@CreatedBy int
					,@Id int OUTPUT
AS

/* TEST Code


					
			
			
	Declare	 @TempleId int = 7
			,@Name nvarchar(100)= 'testName'
			,@CoverPhoto nvarchar(255) = 'aImage.png'										
			,@CreatedBy int = 1
			,@Id int = 0 
					
					
					
Execute dbo.Newsletters_Insert

					@TempleId
					,@Name 
					,@CoverPhoto 								
					,@CreatedBy 
					,@Id OUTPUT
					


Select *
From [dbo].[Newsletters]

Where Id = @Id


*/

BEGIN

INSERT INTO [dbo].[Newsletters]
           
           ([TemplateId]
           ,[Name]
           ,[CoverPhoto]          
           ,[CreatedBy])
     VALUES
           (
           @TemplateId
           ,@Name
           ,@CoverPhoto        
           ,@CreatedBy)


		   SET @Id = SCOPE_IDENTITY()
END
GO

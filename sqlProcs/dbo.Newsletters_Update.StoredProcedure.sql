USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_Update]    Script Date: 3/2/2023 10:32:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Paul Segura>
-- Create date: <02/24/2023,,>
-- Description: <Update by FileType Id,,>
-- Code Reviewer:
-- Note: In Accordance With Immersed Task
-- MODIFIED BY: author
-- MODIFIED DATE:2/24/2023
-- Code Reviewer: Andy Garcia
-- Note:
-- =============================================
CREATE proc [dbo].[Newsletters_Update] 


				@TemplateId int
					,@Name nvarchar(100)
					,@CoverPhoto nvarchar(255)															
					,@Id int 
as
/* TEST Code


					
	Declare @Id int = 7 
			
	Declare	 @TemplateId int = 6
			,@Name nvarchar(100)= 'testName'
			,@CoverPhoto nvarchar(255) = 'aImage.png'										
			,@CreatedBy int = 2
			
					
					
					
Execute dbo.Newsletters_Update

					@TemplateId
					,@Name 
					,@CoverPhoto 													
					,@Id 
					


Select *
From [dbo].[Newsletters]
Where Id = @Id



*/

BEGIN

Declare @datNow datetime2 = getutcdate();

UPDATE [dbo].[Newsletters]

   SET 
       [TemplateId] = @TemplateId
      ,[Name] = @Name
      ,[CoverPhoto] = @CoverPhoto    
	  

 WHERE Id = @Id


END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Files_Insert]    Script Date: 10/27/2022 3:45:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Files_Insert]
				@Name nvarchar(255)
				,@Url nvarchar(255)
				,@FileTypeId int
				,@CreatedBy int	
				,@Id int OUTPUT


as
-- =============================================
-- Author: <Author,,Micheal White>
-- Create date: <10/20/2022,,>
-- Description: <Insert,,>
-- Code Reviewer:David Ramirez
-- Note: In Accordance With Immersed Task 

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

/*


Declare @Id int = 0
		Declare @Name nvarchar(255) = 'Unsplash'
				,@Url nvarchar(255) = 'https://tinyurl.com/bdaerh94'
				,@FileTypeId int = 1
				,@CreatedBy int = 17				
				

Execute dbo.Files_Insert
				@Name 
				,@Url 
				,@FileTypeId 
				,@CreatedBy				
				,@Id OUTPUT

Select *
from dbo.Files as f

Select *
from dbo.Users as U
*/
BEGIN	

Declare @dateNow datetime2 = getutcdate()
INSERT INTO [dbo].[Files]
			   ([Name]
			   ,[Url]
			   ,[FileTypeId]
			   ,[CreatedBy]
			   ,[DateCreated])
			  

     VALUES
				( @Name 
				,@Url 
				,@FileTypeId 
				,@CreatedBy
				,@dateNow
				 )

		SET @Id = SCOPE_IDENTITY()

END


GO

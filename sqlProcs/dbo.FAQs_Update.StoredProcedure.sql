USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Update]    Script Date: 10/27/2022 8:18:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Brendalis Sanchez>
-- Create date: <10/22/2022>
-- Description:	<Update records in the FAQs table>
-- Code Reviewer: Rey Villasenor


-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 10/27/22
-- Code Reviewer: Pablo Pantaleo
-- Note: 
-- =============================================

CREATE proc [dbo].[FAQs_Update]
					@Question nvarchar(255)
				   ,@Answer nvarchar(2000)
				   ,@FAQCategoriesId int		   
				   ,@SortOrder int
				   ,@UserId int				   
				   ,@Id int

as

/* ----- Test Code -----
	
	SELECT *
	FROM [dbo].[FAQs]
	
	DECLARE @Question nvarchar(255) = 'REVIN'
			,@Answer nvarchar(2000) = 'REAIN'
			,@FAQCategoriesId int = 3		   
			,@SortOrder int = 3   
			,@UserId int = 20
			,@Id int = 3
		
	EXECUTE dbo.FAQs_Update
				@Question
				,@Answer
				,@FAQCategoriesId
				,@SortOrder
				,@UserId
				,@Id
					
	SELECT *
	FROM [dbo].[FAQs]
	WHERE Id = @Id
	
*/

BEGIN

		UPDATE [dbo].[FAQs]
		   SET [Question] = @Question
			  ,[Answer] = @Answer
			  ,[CategoryId] = @FAQCategoriesId
			  ,[SortOrder] = @SortOrder
			  ,[DateModified] = GETUTCDATE()
			  ,[CreatedBy] = @UserId
			  ,[ModifiedBy] = @UserId
			  
		WHERE Id = @Id

END
GO

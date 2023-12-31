USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Insert]    Script Date: 10/27/2022 8:18:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Brendalis Sanchez>
-- Create date: <10/22/2022>
-- Description:	<Insert into the FAQs table>
-- Code Reviewer: 


-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 10/27/22
-- Code Reviewer: Thinzar Soe
-- Note: 
-- =============================================

CREATE proc [dbo].[FAQs_Insert]
					@Question nvarchar(255)
				   ,@Answer nvarchar(2000)
				   ,@FAQCategoriesId int		   
				   ,@SortOrder int           
				   ,@UserId int
				   ,@Id int OUTPUT	

as

/* ----- Test Code -----

	SELECT *
	FROM [dbo].[FAQs]

	DECLARE @Question nvarchar(255) = 'TestsecRevQuestion'
			,@Answer nvarchar(2000) = 'TestsecReviewAnswer'
			,@FAQCategoriesId int = 1		   
			,@SortOrder int = 1          
			,@UserId int = 22
			
	EXECUTE [dbo].[FAQs_Insert]
				@Question
				,@Answer
				,@FAQCategoriesId
				,@SortOrder
				,@UserId
				,@UserId OUTPUT
		
	SELECT *
	FROM [dbo].[FAQs]
		
*/

BEGIN

	INSERT INTO [dbo].[FAQs]
				([Question]
				,[Answer]
				,[CategoryId]
				,[SortOrder]							   
				,[CreatedBy]
				,[ModifiedBy])
					
			VALUES
				(@Question
				,@Answer
				,@FAQCategoriesId
				,@SortOrder
				,@UserId
				,@UserId)

		SET @Id = SCOPE_IDENTITY()
		
END

GO

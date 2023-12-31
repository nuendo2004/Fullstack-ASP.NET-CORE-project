USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterSubscriptions_SelectBySubcribed_SearchPagination]    Script Date: 3/22/2023 3:36:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --=============================================
 --Author: <Morris,Kolby>
 --Create date: <2023-03-17>
 --Description: <Select By Subscribed Newsletter Descriptions, Paged>
 --Code Reviewer: Andrew Phothisen
 

 --MODIFIED BY: 
 --MODIFIED DATE: 
 --Code Reviewer: 
 --Note: 
 --=============================================
CREATE proc [dbo].[NewsletterSubscriptions_SelectBySubcribed_SearchPagination]
				@PageIndex int
				,@PageSize int
				,@isSubscribed bit
				,@Query nvarchar(100)

AS

/* ----TEST Code----

	DECLARE @PageIndex int = 0
			,@PageSize int = 6
			,@isSubscribed bit = 'False'
			,@Query nvarchar(100) = 'andy'

	EXECUTE [dbo].[NewsletterSubscriptions_SelectBySubcribed_SearchPagination]
			 @PageIndex
			,@PageSize
			,@isSubscribed
			,@Query

*/

BEGIN 
	DECLARE @Offset int = @PageSize * @PageIndex

	SELECT [Email]
		  ,[IsSubscribed]
		  ,[DateCreated]
		  ,[DateModified]
		  ,TotalCount = Count(1) OVER ()
	  FROM [dbo].[NewsletterSubscriptions]
	  WHERE IsSubscribed = @isSubscribed
	  AND (Email LIKE '%' + @Query + '%')

	  ORDER BY [Email]

	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
GO

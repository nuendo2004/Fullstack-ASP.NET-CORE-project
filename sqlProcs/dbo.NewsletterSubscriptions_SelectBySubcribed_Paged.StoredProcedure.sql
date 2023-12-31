USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterSubscriptions_SelectBySubcribed_Paged]    Script Date: 3/22/2023 3:36:37 PM ******/
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
CREATE proc [dbo].[NewsletterSubscriptions_SelectBySubcribed_Paged]
				@PageIndex int
				,@PageSize int
				,@isSubscribed bit

AS

/* ----TEST Code----

	DECLARE @PageIndex int = 0
			,@PageSize int = 4
			,@isSubscribed bit = 'False'

	EXECUTE [dbo].[NewsletterSubscriptions_SelectBySubcribed_Paged]
			 @PageIndex
			,@PageSize
			,@isSubscribed

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
	  ORDER BY [Email]

	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
GO

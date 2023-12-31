USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterSubscriptions_SelectAll_Paged]    Script Date: 12/20/2022 11:15:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --=============================================
 --Author: <Ramirez, Andrew>
 --Create date: <2022-12-16>
 --Description: <Select All for NewsletterSubscriptions, Paged>
 --Code Reviewer: Joseph Aquino
 

 --MODIFIED BY: 
 --MODIFIED DATE: 
 --Code Reviewer: 
 --Note: 
 --=============================================
CREATE proc [dbo].[NewsletterSubscriptions_SelectAll_Paged]
				@PageIndex int
				,@PageSize int

AS

/* ----TEST Code----

	DECLARE @PageIndex int = 1
			,@PageSize int = 4

	EXECUTE [dbo].[NewsletterSubscriptions_SelectAll_Paged]
			 @PageIndex
			,@PageSize

*/

BEGIN 
	DECLARE @Offset int = @PageSize * @PageIndex

	SELECT [Email]
		  ,[IsSubscribed]
		  ,[DateCreated]
		  ,[DateModified]
		  ,TotalCount = Count(1) OVER ()
	  FROM [dbo].[NewsletterSubscriptions]
	  ORDER BY [Email]

	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
GO

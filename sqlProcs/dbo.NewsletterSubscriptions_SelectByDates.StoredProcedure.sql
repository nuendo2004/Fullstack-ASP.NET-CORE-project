USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterSubscriptions_SelectByDates]    Script Date: 3/22/2023 3:36:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --=============================================
 --Author: <Morris,Kolby>
 --Create date: <2023-03-17>
 --Description: <Select By Created on Date for Newsletter Subscriptions>
 --Code Reviewer:Andrew Phothisen
 

 --MODIFIED BY: 
 --MODIFIED DATE: 
 --Code Reviewer: 
 --Note: 
 --=============================================
CREATE PROC [dbo].[NewsletterSubscriptions_SelectByDates]
			@StartDate DateTime2
			,@EndDate DateTime2

AS
/*-----TEST CODE----

	DECLARE @StartDate DateTime2 = '20221002',
			@EndDate DateTime2 = '20230320'

	EXECUTE [dbo].[NewsletterSubscriptions_SelectByDates]
			@StartDate
			,@EndDate
			

*/

BEGIN

	SELECT YEAR(dateCreated) AS Year
		   , MONTH(dateCreated) As Month
		   , COUNT(1) as TotalSubscibers
		   , UsersStillSubscribed = (Select COUNT(1)
									 From dbo.NewsletterSubscriptions
									 WHERE DateCreated BETWEEN @StartDate AND @EndDate
									 AND IsSubscribed = 'true'
									 )
		   , TotalCount = (
							Select COUNT(1)
							From dbo.NewsletterSubscriptions
							WHERE DateCreated BETWEEN @StartDate AND @EndDate
						  )
	FROM dbo.NewsletterSubscriptions
	WHERE DateCreated BETWEEN @StartDate AND @EndDate
	GROUP BY YEAR(dateCreated),MONTH(dateCreated)
	ORDER BY Year;
	

END
GO

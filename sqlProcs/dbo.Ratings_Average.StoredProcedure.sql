USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Ratings_Average]    Script Date: 12/7/2022 3:33:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Guillermo Schauer>
-- Create date: <12/01/2022>
-- Description:	<Ratings_Average for dbo.Ratings>
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE PROC [dbo].[Ratings_Average]
				 @EntityId int
				,@EntityTypeId int
AS

/* *** Finding the average number of Ratings for Entity

Declare @EntityId int = 2
	   ,@EntityTypeId int = 1

Execute dbo.Ratings_Average
		@EntityId
		,@EntityTypeId

*/
BEGIN
	 SELECT	  --r.Id 
			  EntityId
			 ,EntityTypeId 
			 --,et.Name as EntityName 
			 ,AVG (Rating) as RatingAverage

	 FROM	[dbo].[Ratings] 

	 WHERE  EntityId = @EntityId and EntityTypeId = @EntityTypeId
	 GROUP BY  --r.Id  
			 EntityId
			,EntityTypeId
			--	 ,et.Id  
			--	 ,et.Name
			 
	

END
GO

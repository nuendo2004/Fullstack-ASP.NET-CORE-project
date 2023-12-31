USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Actors_SelectByCreatedBy]    Script Date: 11/17/2022 3:06:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 --=============================================
 --Author: <Arenas, Jay>
 --Create date: <2022-11-16>
 --Description: <Select_ByCreatedBy for Actors>
 --Code Reviewer: 
 

 --MODIFIED BY: 
 --MODIFIED DATE:
 --Code Reviewer: 
 --Note: 
 --=============================================

 CREATE proc [dbo].[Actors_SelectByCreatedBy]
				@PageIndex int
			   ,@PageSize int
			   ,@CreatedById int 

 as

 /*  ----- TEST CODE ----- 
		
		DECLARE  @PageIndex int = 0
				,@PageSize int = 2
				,@CreatedById int = 66

		EXECUTE dbo.Actors_SelectByCreatedBy   
				@PageIndex
			   ,@PageSize
			   ,@CreatedById
SELECT *
FROM dbo.Actors

*/   

BEGIN 

		DECLARE @Offset int = @PageIndex * @PageSize

		SELECT a.Id
   			  ,a.[Name]
			  ,a.[Description]
			  ,ac.[Name] as ActorType
			  ,st.[Name] as StatusType
			  ,u.FirstName as CreatedBy
			  ,u2.FirstName as ModifiedBy
			  ,a.DateCreated
			  ,a.DateModified
			  ,TotalCount = COUNT(1) OVER ()
		FROM dbo.Actors as a 
					INNER JOIN dbo.ActorTypes as ac
						ON a.ActorTypeId = ac.Id
					INNER JOIN dbo.Users as u
						ON a.CreatedBy = u.Id
					INNER JOIN dbo.Users as u2
						ON a.ModifiedBy = u2.Id
					INNER JOIN dbo.StatusTypes as st
						ON a.StatusTypeId = st.Id

		WHERE a.CreatedBy = @CreatedById
				AND a.StatusTypeId = 1

		ORDER BY a.Id desc
		OFFSET @Offset ROWS
		FETCH NEXT @PageSize ROWS ONLY 

END





GO

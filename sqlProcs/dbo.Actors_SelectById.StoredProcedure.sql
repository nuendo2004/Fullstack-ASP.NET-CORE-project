USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Actors_SelectById]    Script Date: 11/17/2022 3:06:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





 --=============================================
 --Author: <Arenas, Jay>
 --Create date: <2022-11-16>
 --Description: <SelectById for Actors>
 --Code Reviewer: 
 

 --MODIFIED BY: 
 --MODIFIED DATE:
 --Code Reviewer: 
 --Note: 
 --=============================================

CREATE proc [dbo].[Actors_SelectById]
				@Id int


as

 /*  ---- TEST CODE ----

 DECLARE @Id int = 5;

 EXECUTE dbo.Actors_SelectById @Id
 
 */

BEGIN

	SELECT a.Id
		   ,a.[Name]
		   ,a.[Description]
		   ,ac.[Name] as ActorType
		   ,st.[Name] as StatusType
		   ,u.FirstName as CreatedBy
		   ,u2.FirstName as ModifiedBy
		   ,a.DateCreated
		   ,a.DateModified

	FROM dbo.Actors as a 
			INNER JOIN dbo.ActorTypes as ac
				ON a.ActorTypeId = ac.Id
			INNER JOIN dbo.Users as u
				ON a.CreatedBy = u.Id
			INNER JOIN dbo.Users as u2
				ON a.ModifiedBy = u2.Id
			INNER JOIN dbo.StatusTypes as st
				ON a.StatusTypeId = st.Id

	WHERE a.Id = @Id 

END


GO

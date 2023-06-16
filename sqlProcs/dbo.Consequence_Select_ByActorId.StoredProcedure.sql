USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Consequence_Select_ByActorId]    Script Date: 11/21/2022 11:20:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--=============================================
 --Author: <Aquino, Joseph>
 --Create date: <2022-11-18>
 --Description: <SelectByActorId for Consequences >
 --Code Reviewer:
 

 --MODIFIED BY: <Author>
 --MODIFIED DATE: <2022-10-26>
 --Code Reviewer: 
 --Note: 
 --=============================================
CREATE PROC [dbo].[Consequence_Select_ByActorId]
         @ActorId int
		,@PageIndex int
		,@PageSize int
					
AS

/* -----TEST CODE -------

Declare  @ActorId int = 2
		,@PageIndex int = 0
		,@PageSize int = 3
		
EXECUTE dbo.Consequence_Select_ByActorId 
		@ActorId
	   ,@PageIndex
	   ,@PageSize
									
*/
BEGIN

DECLARE @Offset int = @PageIndex * @PageSize

SELECT c.[Id]
	  ,c.Name
	  ,ct.Description
	  ,ct.Id as ConsequenceTypeId
	  ,ct.[Name] as ConsequenceName

      ,a.Id as ActorId
	  ,a.Name as ActorName
	  ,a.Description as ActorDescription
	  ,a.ActorTypeId as ActorTypeId
	  ,a.StatusTypeId as StatusTypeId
	  ,a.CreatedBy as ActorCreatedBy
	  ,a.ModifiedBy as ActorModifiedBy
	  ,a.DateCreated as DateCreated
	  ,a.DateModified as DateModified

      ,z.Id as ZoneId 
	  ,z.Name as ZoneName
	  ,z.Description as ZoneDescription
	  ,z.ZoneTypeId as ZoneTypeId
	  ,z.ZoneStatusId as ZoneStatusId
	  ,z.IsDeleted as ZoneDeleted
	  ,z.CreatedBy as ZoneCreatedBy
	  ,z.ModifiedBy as ZoneModifiedBy
	  ,z.DateCreated as DateCreated
	  ,z.DateModified as DateModified
		  
      ,c.[isActive]  
      ,c.[isDeleted]

      ,u.Id as CreatedBy
	  ,u.Email as Email
	  ,u.FirstName as FirstName
	  ,u.LastName as LastName
	  ,u.Mi as Mi
	  ,u.AvatarUrl as AvatarUrl
      
	  ,u2.Id as CreatedBy
	  ,u2.Email as Email
	  ,u2.FirstName as FirstName
	  ,u2.LastName as LastName
	  ,u2.Mi as Mi
	  ,u2.AvatarUrl as AvatarUrl
      
	  ,c.[DateCreated]  
      ,c.[DateModified]
	  ,TotalCount = Count(1) Over()

  FROM [dbo].[Consequences] as c 
		INNER JOIN dbo.ConsequenceTypes as ct
			ON c.ConsequenceTypeId = ct.Id
		INNER JOIN dbo.Actors as a
			ON c.ActorId = a.Id
		INNER JOIN dbo.Zones as z
			ON c.ZoneId = z.Id
		INNER JOIN dbo.Users as u
			ON c.CreatedBy = u.Id
		INNER JOIN dbo.Users as u2
			ON c.ModifiedBy = u2.Id	
	
  WHERE a.Id = @ActorId 
		
  ORDER BY a.Id

  Offset @Offset ROWS

  FETCH NEXT @PageSize ROWS ONLY

END



GO

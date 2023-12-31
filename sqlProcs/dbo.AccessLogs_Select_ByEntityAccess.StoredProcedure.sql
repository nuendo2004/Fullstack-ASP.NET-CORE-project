USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[AccessLogs_Select_ByEntityAccess]    Script Date: 3/8/2023 2:57:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --=============================================
 --Author: <Ramirez, David>
 --Create date: <2022-11-14>
 --Description: <AccessLogs_Select_ByEntityAccess>
 --Code Reviewer: Justin Nguyen

 --MODIFIED BY: Mackenzie Williams
 --MODIFIED DATE: 2023-03-01
 --Code Reviewer: Andy Garcia
 --Note: Updated to include DeviceTypeId
 --=============================================
CREATE proc [dbo].[AccessLogs_Select_ByEntityAccess]
			 @PageIndex int
			,@PageSize int
			,@EntityTypeId int 
			,@AccessStatusId int 

as

/* --------------- TEST CODE ---------------

Declare		  @PageIndex int = 0
			 ,@PageSize int = 10
	         ,@EntityTypeId int = 0
			 ,@AccessStatusId int = 3

Execute dbo.AccessLogs_Select_ByEntityAccess
			 @PageIndex
			,@PageSize
			,@EntityTypeId
			,@AccessStatusId



Select * 
from dbo.AccessLogs


*/


BEGIN

Declare @offset int = @PageIndex * @PageSize

IF (@AccessStatusId > 0 AND @EntityTypeId > 0)

Select al.Id
	  ,et.Id as EntityTypeId
	  ,et.[Name] as EntityTypeName
	  ,al.EntityId	
	  ,act.Id as AccessTypeId
	  ,act.[Name] as AccessTypeName 
	  ,acs.Id as AccessStatusId
	  ,acs.[Name] as AccessStatusName
	  ,al.IPAddressPort
	  ,al.EndpointName
	  ,al.DateCreated
	  ,al.PayloadName
	  ,al.[Route]
	  ,dt.Id as DeviceTypeId
	  ,dt.[Name] as DeviceTypeName
	  ,al.DeviceTypeId
	  ,TotalCount = COUNT(1) OVER()


FROM dbo.AccessLogs as al inner join dbo.AccessTypes as act
						on al.AccessTypeId = act.Id
						inner join dbo.AccessStatus as acs
						on al.AccessStatusId = acs.Id
						inner join dbo.EntityTypes as et 
						on al.EntityTypeId = et.Id 
						inner join dbo.DeviceTypes as dt
						on al.DeviceTypeId = dt.Id


WHERE (et.Id = @EntityTypeId AND
		acs.Id = @AccessStatusId)

ORDER BY Id


OFFSET @offSet Rows
Fetch Next @PageSize Rows ONLY



ELSE IF (@AccessStatusId > 0 OR @EntityTypeId > 0)

Select al.Id
	  ,et.Id as EntityTypeId
	  ,et.[Name] as EntityTypeName
	  ,al.EntityId	
	  ,act.Id as AccessTypeId
	  ,act.[Name] as AccessTypeName 
	  ,acs.Id as AccessStatusId
	  ,acs.[Name] as AccessStatusName
	  ,al.IPAddressPort
	  ,al.EndpointName
	  ,al.DateCreated
	  ,al.PayloadName
	  ,al.[Route]
	  ,dt.Id as DevicetypeId
	  ,dt.[Name] as DeviceTypeName 
	  ,al.DeviceTypeId
	  ,TotalCount = COUNT(1) OVER()

FROM dbo.AccessLogs as al inner join dbo.AccessTypes as act
						on al.AccessTypeId = act.Id
						inner join dbo.AccessStatus as acs
						on al.AccessStatusId = acs.Id
						inner join dbo.EntityTypes as et 
						on al.EntityTypeId = et.Id
						inner join dbo.DeviceTypes as dt
						on al.DeviceTypeId = dt.Id

WHERE (et.Id = @EntityTypeId OR
		acs.Id = @AccessStatusId)

ORDER BY Id


OFFSET @offSet Rows
Fetch Next @PageSize Rows ONLY

ELSE

Select al.Id
	  ,et.Id as EntityTypeId
	  ,et.[Name] as EntityTypeName
	  ,al.EntityId	
	  ,act.Id as AccessTypeId
	  ,act.[Name] as AccessTypeName 
	  ,acs.Id as AccessStatusId
	  ,acs.[Name] as AccessStatusName
	  ,al.IPAddressPort
	  ,al.EndpointName
	  ,al.DateCreated
	  ,al.PayloadName
	  ,al.[Route]
	  ,dt.Id as DeviceTypeId
	  ,dt.[Name] as DeviceTypeName
	  ,al.DeviceTypeId
	  ,TotalCount = COUNT(1) OVER()


FROM dbo.AccessLogs as al inner join dbo.AccessTypes as act
						on al.AccessTypeId = act.Id
						inner join dbo.AccessStatus as acs
						on al.AccessStatusId = acs.Id
						inner join dbo.EntityTypes as et 
						on al.EntityTypeId = et.Id
						inner join dbo.DeviceTypes as dt
						on al.DeviceTypeId = dt.Id 


WHERE (et.Id = @EntityTypeId OR
		acs.Id = @AccessStatusId)

ORDER BY Id


OFFSET @offSet Rows
Fetch Next @PageSize Rows ONLY

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[AccessLogs_Search_Pagination]    Script Date: 3/8/2023 2:57:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
 --Author: <Ramirez, David>
 --Create date: <2022-11-7>
 --Description: <AccessLogs_Search_Pagination>
 --Code Reviewer: Noe Gallegos

 --MODIFIED BY: Mackenzie Williams 
 --MODIFIED DATE: 2023-03-01
 --Code Reviewer: Andy Garcia 
 --Note: Update to include DeviceTypeId
 --=============================================

CREATE proc [dbo].[AccessLogs_Search_Pagination]
			 @PageIndex int
			,@PageSize int
			,@Query nvarchar(256)


as




/* ----- TEST CODE -----

Declare		@PageIndex int = 0
			,@PageSize int = 10
			,@Query nvarchar(256) = 'Access'

Execute dbo.AccessLogs_Search_Pagination
			@PageIndex
			,@PageSize
			,@Query






*/




BEGIN

Declare @offset int = @PageIndex * @PageSize



SELECT al.Id
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

	WHERE (IPAddressPort LIKE '%' + @Query + '%' OR
			EndpointName LIKE '%' + @Query + '%' OR
			PayloadName LIKE '%' + @Query + '%' )
	ORDER BY Id


	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO

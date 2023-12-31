USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[AccessLogs_Select_ById]    Script Date: 3/8/2023 2:57:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
 --Author: <Ramirez, David>
 --Create date: <2022-10-20>
 --Description: <SelectById for AccessLogs>
 --Code Reviewer: Christopher Mercado
 

 --MODIFIED BY: Mackenzie Williams
 --MODIFIED DATE: 2023-03-01
 --Code Reviewer: Andy Garcia 
 --Note: Updating to include DeviceTypeId
 --=============================================
CREATE proc [dbo].[AccessLogs_Select_ById]
			@Id int



as



/*


Declare @Id int = 28;


Execute dbo.AccessLogs_Select_ById @Id

Select *
From dbo.AccessLogs


*/



BEGIN




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






FROM dbo.AccessLogs as al inner join dbo.AccessTypes as act
						on al.AccessTypeId = act.Id
						inner join dbo.AccessStatus as acs
						on al.AccessStatusId = acs.Id
						inner join dbo.EntityTypes as et 
						on al.EntityTypeId = et.Id
						inner join dbo.DeviceTypes as dt
						on al.DeviceTypeId = dt.Id
					
						
						
						
Where al.Id = @Id





END

GO

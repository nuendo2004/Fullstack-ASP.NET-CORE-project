USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[AccessLogs_Insert]    Script Date: 3/8/2023 2:57:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
 --Author: <Ramirez, David>
 --Create date: <2022-10-20>
 --Description: <Insert for AccessLogs>
 --Code Reviewer: Christopher Mercado
 

 --MODIFIED BY: Mackenzie Williams
 --MODIFIED DATE: 2023-03-01
 --Code Reviewer: Andy Garcia 
 --Note: Updating to include DeviceTypeId
 --=============================================
CREATE proc [dbo].[AccessLogs_Insert]
			@EntityTypeId int
           ,@EntityId int
           ,@AccessTypeId int 
           ,@AccessStatusId int
           ,@IPAddressPort nvarchar(100)
           ,@EndpointName nvarchar(256)         
           ,@PayloadName nvarchar(100)
           ,@Route nvarchar(100)
		   ,@DeviceTypeId int
		   ,@Id int OUTPUT


as




/*

DECLARE @Id int = 0;

DECLARE     @EntityTypeId int = 3
           ,@EntityId int = 1
           ,@AccessTypeId int = 3
           ,@AccessStatusId int = 4
           ,@IPAddressPort nvarchar(100) = '195.168.0.1:80'
           ,@EndpointName nvarchar(256) = 'POST'
           ,@PayloadName nvarchar(100) = 'Restricted'
           ,@Route nvarchar(100) = 'Route'
		   ,@DeviceTypeId int = 2
		   

Execute dbo.AccessLogs_Insert
			@EntityTypeId
           ,@EntityId
           ,@AccessTypeId
           ,@AccessStatusId
           ,@IPAddressPort 
           ,@EndpointName 
           ,@PayloadName 
           ,@Route 
		   ,@DeviceTypeId
		   ,@Id OUTPUT

Select @Id 

Select *
From dbo.AccessLogs



Delete from dbo.AccessLogs
Where Id = 22


*/


BEGIN

/*  For DateCreated and DateModified  */
DECLARE @DateCreated datetime = GETUTCDATE()


INSERT INTO dbo.AccessLogs
           ([EntityTypeId]
           ,[EntityId]
           ,[AccessTypeId]
           ,[AccessStatusId]
           ,[IPAddressPort]
           ,[EndpointName]
           ,[DateCreated]
           ,[PayloadName]
           ,[Route]
		   ,[DeviceTypeId])
VALUES
			(@EntityTypeId
           ,@EntityId
           ,@AccessTypeId
           ,@AccessStatusId
           ,@IPAddressPort 
           ,@EndpointName 
           ,@DateCreated 
           ,@PayloadName 
           ,@Route
		   ,@DeviceTypeId)

SET @Id = SCOPE_IDENTITY()

END
GO

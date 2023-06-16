USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[DeviceTypes_SelectAll]    Script Date: 3/2/2023 4:29:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--=============================================
 --Author: <Mackenzie Williams>
 --Create date: <2023-02-28>
 --Description: <SelectAll for DeviceTypes>
 --Code Reviewer: Andy Garcia 
 

 --MODIFIED BY: author
 --MODIFIED DATE:12/1/2020
 --Code Reviewer: 
 --Note: 
 --=============================================


CREATE proc [dbo].[DeviceTypes_SelectAll]

as
/*

Execute dbo.DeviceTypes_SelectAll

*/

BEGIN 

	SELECT [Id]
		  ,[Name]

	FROM dbo.DeviceTypes


END 
GO

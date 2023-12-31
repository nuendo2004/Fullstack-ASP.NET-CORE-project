USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Locations_SelectByCreatedBy]    Script Date: 12/2/2022 2:43:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Locations_SelectByCreatedBy]
	@CreatedBy int
as

----------------------------TEST CODE ----------------------
/*

DECLARE @CreatedBy int = 90;

EXECUTE dbo.Locations_SelectByCreatedBy 
	@CreatedBy

*/

-----------------------------------------------------------

BEGIN

SELECT		q.Id
			,lookUpLocationTypeInfo = (SELECT p.Id
											 ,p.Name
										FROM dbo.LocationTypes
										WHERE Id = p.Id
										FOR JSON AUTO)
           ,[LineOne]
           ,[LineTwo]
           ,[City]
           ,[Zip]
           ,lookUpStateInfo = (SELECT r.Id
									, r.Name
								FROM dbo. States
								WHERE Id = p.Id
								FOR JSON AUTO)
           ,[Latitude]
           ,[Longitude]
           ,[CreatedBy]
           ,[ModifiedBy]
  FROM [dbo].[Locations] as q 
  inner join dbo.LocationTypes as p 
  ON q.LocationTypeId = p.Id
  inner join dbo.States as r
  ON q.StateId = r.Id
  WHERE CreatedBy = @CreatedBy


END

GO

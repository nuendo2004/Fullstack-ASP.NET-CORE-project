USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Update]    Script Date: 10/27/2022 3:30:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
-- Author: <Gallegos, Noe>
-- Create date: <10/20/2022>
-- Description: <Updates Records into Locations Table>
-- Code Reviewer: Miranda Merritt

-- MODIFIED BY: author
-- MODIFIED DATE:10/20/2022
-- Code Reviewer:
-- Note:
*/

CREATE PROC [dbo].[Locations_Update]
		    @LocationTypeId int
           ,@LineOne nvarchar(255)
           ,@LineTwo nvarchar(255)
           ,@City nvarchar(255)
           ,@Zip nvarchar(50)
           ,@StateId int
           ,@Latitude float
           ,@Longitude float
           ,@CreatedBy int
           ,@ModifiedBy int
		   ,@Id int
as

BEGIN

/*-----------------------------TEST CODE---------------------------------



DECLARE 	@LocationTypeId int = 1
           ,@LineOne nvarchar(255) = 'UPDATED'
           ,@LineTwo nvarchar(255) = 'Suite B'
           ,@City nvarchar(255) = 'LA'
           ,@Zip nvarchar(50) = '90802'
           ,@StateId int = 1
           ,@Latitude float = 30.50524
           ,@Longitude float = 88.24243
           ,@CreatedBy int = 12
           ,@ModifiedBy int = 12
		   ,@Id int = 19

SELECT *
FROM dbo.Locations
Where Id = @Id
		   
EXECUTE dbo.Locations_Update
			@LocationTypeId
           ,@LineOne
           ,@LineTwo
           ,@City
           ,@Zip
           ,@StateId
           ,@Latitude
           ,@Longitude
           ,@CreatedBy
           ,@ModifiedBy
		   ,@Id


SELECT *
FROM dbo.Locations
Where Id = @Id


*/


UPDATE [dbo].[Locations]
   SET 		
			LocationTypeId = @LocationTypeId 
           ,LineOne = @LineOne
           ,LineTwo = @LineTwo 
           ,City = @City 
           ,Zip = @Zip 
           ,StateId = @StateId 
           ,latitude = @Latitude 
           ,Longitude = @Longitude 
           ,CreatedBy = @CreatedBy 
           ,Modifiedby = @ModifiedBy 

 WHERE Id = @Id

 


 END


GO

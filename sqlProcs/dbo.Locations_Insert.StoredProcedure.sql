USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Insert]    Script Date: 10/27/2022 3:30:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
-- Author: <Gallegos, Noe>
-- Create date: <10/20/2022>
-- Description: <Insert Records into Locations Table>
-- Code Reviewer:

-- MODIFIED BY: author
-- MODIFIED DATE:10/20/2022
-- Code Reviewer:
-- Note:
*/

CREATE PROC [dbo].[Locations_Insert]
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
		   ,@Id int OUTPUT

as

BEGIN

/*--------------------------------TEST CODE-----------------------------
DECLARE 	@LocationTypeId int = 1
           ,@LineOne nvarchar(255) = '123 Main St'
           ,@LineTwo nvarchar(255) = 'Suite B'
           ,@City nvarchar(255) = 'LA'
           ,@Zip nvarchar(50) = '90802'
           ,@StateId int = 1
           ,@Latitude float = 30.50524
           ,@Longitude float = 88.24243
           ,@CreatedBy int = 1
           ,@ModifiedBy int 
		   ,@Id int
		   
EXECUTE dbo.Locations_Insert 
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
		   ,@Id OUTPUT

Select @Id

*/


INSERT INTO [dbo].[Locations]
           ([LocationTypeId]
           ,[LineOne]
           ,[LineTwo]
           ,[City]
           ,[Zip]
           ,[StateId]
           ,[Latitude]
           ,[Longitude]
           ,[CreatedBy]
           ,[ModifiedBy])
     VALUES
			(@LocationTypeId 
           ,@LineOne
           ,@LineTwo
           ,@City
           ,@Zip
           ,@StateId
           ,@Latitude
           ,@Longitude
           ,@CreatedBy
           ,@ModifiedBy)

SET @Id = SCOPE_IDENTITY()

END


GO

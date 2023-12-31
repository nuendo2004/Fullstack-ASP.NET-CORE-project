USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_Insert]    Script Date: 25/10/2022 21:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/20/2022>
-- Description:	<An Insert proc for the Zones db>
-- Code Reviewer:<Micheal White>


-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================




CREATE proc [dbo].[Zones_Insert]

           @Name nvarchar(100)
           ,@Description nvarchar(100)
           ,@ZoneTypeId int
           ,@ZoneStatusId int
           ,@UserId int
		   ,@Id int OUTPUT






AS

BEGIN

INSERT INTO [dbo].[Zones]
           ([Name]
           ,[Description]
		   ,[ZoneTypeId]
		   ,[ZoneStatusId]
		   ,[CreatedBy]
		   ,[ModifiedBy])

     VALUES
			(@Name
			,@Description
			,@ZoneTypeId
			,@ZoneStatusId 
			,@UserId
			,@UserId)

		   set @Id = SCOPE_IDENTITY()

END


/*-----------TEST CODE--------------
Declare @Id int
Declare @Name nvarchar(100) = 'Zone test 01'
		,@Description nvarchar(100) = 'Zone Description 01'
		,@ZoneTypeId int = 4
		,@ZoneStatusId int = 4
		,@UserId int = 8

Execute dbo.Zones_Insert
						@Name
						,@Description
						,@ZoneTypeId
						,@ZoneStatusId 
						,@UserId
						,@Id OUTPUT



		Select *
		From dbo.Zones
		Where Id = @Id

*/
GO

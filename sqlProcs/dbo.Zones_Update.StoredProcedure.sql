USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_Update]    Script Date: 25/10/2022 21:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/20/2022>
-- Description:	<An Update proc for the Zones db>
-- Code Reviewer:<Micheal White>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================


CREATE proc [dbo].[Zones_Update]
			@Name nvarchar(100)
           ,@Description nvarchar(100)
           ,@ZoneTypeId int
           ,@ZoneStatusId int
		   ,@UserId int
		   ,@Id int 
as



BEGIN

Declare @datNow datetime2 = getutcdate ();

UPDATE [dbo].[Zones]
   SET [Name] = @Name
      ,[Description] = @Description
      ,[ZoneTypeId] = @ZoneTypeId
	  ,[ZoneStatusId] = @ZoneStatusId
	  ,[ModifiedBy] = @UserId
      ,[DateModified] = @datNow

 WHERE Id = @Id

END

/*-----------TEST CODE--------------

Declare @Id int = 12;
Declare @Name nvarchar(100) = 'Yellow Zone'
		,@Description nvarchar(100) = 'This is a zone with medium danger'
		,@ZoneTypeId int = 3
        ,@ZoneStatusId int = 3
		,@UserId  int = 17

		Select * 
		From dbo.Zones
		Where Id = @Id

Execute dbo.Zones_Update

		@Name
        ,@Description
        ,@ZoneTypeId
        ,@ZoneStatusId
		,@UserId 
		,@Id
		
	Select * 
	From dbo.Zones
	Where Id = @Id

*/
GO

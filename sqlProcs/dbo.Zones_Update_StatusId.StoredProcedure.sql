USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_Update_StatusId]    Script Date: 25/10/2022 21:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/20/2022>
-- Description:	<An Update proc for the StatusId for the Zones db>
-- Code Reviewer:<Micheal White>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================


CREATE proc [dbo].[Zones_Update_StatusId]

           @ZoneStatusId int
		   ,@ModifiedBy int
		   ,@Id int 

as



BEGIN

Declare @datNow datetime2 = getutcdate ();

UPDATE [dbo].[Zones]
   SET [ZoneStatusId] = @ZoneStatusId
	  ,[ModifiedBy] = @ModifiedBy
      ,[DateModified] = @datNow

 WHERE Id = @Id

END

/*-----------TEST CODE--------------

Declare @Id int = 12;
Declare @ZoneStatusId int = 2
		,@ModifiedBy int = 17

		Select * 
		From dbo.Zones
		Where Id = @Id

Execute dbo.Zones_Update_StatusId

        @ZoneStatusId
		,@ModifiedBy
		,@Id
		
	Select * 
	From dbo.Zones
	Where Id = @Id

*/
GO

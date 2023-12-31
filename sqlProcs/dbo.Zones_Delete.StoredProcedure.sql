USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Zones_Delete]    Script Date: 25/10/2022 21:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/20/2022>
-- Description:	<A Delete proc for the Zones db>
-- Code Reviewer:<Micheal White>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================


CREATE proc [dbo].[Zones_Delete]
		   @Id int 
		   ,@ModifiedBy int

AS

BEGIN

Declare @datNow datetime2 = getutcdate ();

UPDATE [dbo].[Zones]
   SET 
	  [IsDeleted] = 1
	  ,[ModifiedBy] = @ModifiedBy
      ,[DateModified] = @datNow

WHERE Id = @Id

END

/*-----------TEST CODE--------------

Declare @Id int = 12;
Declare @ModifiedBy int = 17

		Select * 
		From dbo.Zones
		Where Id = @Id

Execute dbo.Zones_Delete

		@Id
		,@ModifiedBy
		Select * 
		From dbo.Zones
		Where Id = @Id

*/
GO

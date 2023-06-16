USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneStatus_SelectAll]    Script Date: 25/10/2022 21:07:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Damian Stella>
-- Create date: <10/20/2022>
-- Description:	<A select all proc for the Zone Status look up table>
-- Code Reviewer:<Micheal White>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================





CREATE proc [dbo].[ZoneStatus_SelectAll]

as

Begin

SELECT	[Id]
		,[Name]

		FROM [dbo].[ZoneStatus]

End


/*----------TEST CODE----------

	Execute dbo.ZoneStatus_SelectAll

*/
GO

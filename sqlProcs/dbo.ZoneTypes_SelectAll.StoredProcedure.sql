USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneTypes_SelectAll]    Script Date: 10/25/2022 3:37:14 PM ******/
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





CREATE proc [dbo].[ZoneTypes_SelectAll]

as

Begin

SELECT [Id]
      ,[Name]

  FROM [dbo].[ZoneTypes]



End


/*----------TEST CODE----------

	Execute [dbo].[ZoneTypes_SelectAll]

*/
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[IntervalTypes_SelectAll]    Script Date: 11/23/2022 9:20:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Jacob Helton>
-- Create date: <11/23/2022>
-- Description:	<Selects all of the IntervalTypes categories>
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[IntervalTypes_SelectAll]

AS

/*--------- TEST CODE --------------

	Execute [dbo].[IntervalTypes_SelectAll]

*/

BEGIN
	
	SELECT [Id]
		  ,[Name]

	FROM [dbo].[IntervalTypes]

END

GO

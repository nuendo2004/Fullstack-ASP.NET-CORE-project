USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ChronJobTypes_SelectAll]    Script Date: 11/23/2022 9:20:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Jacob Helton>
-- Create date: <11/23/2022>
-- Description:	<Selects all of the categories of the Recurring Jobs/Tasks>
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[ChronJobTypes_SelectAll]
	
AS

/*--------- TEST CODE --------------

	Execute [dbo].[ChronJobTypes_SelectAll]

*/

BEGIN

	SELECT [Id]
		  ,[Name]

	FROM [dbo].[ChronJobTypes]

END

GO

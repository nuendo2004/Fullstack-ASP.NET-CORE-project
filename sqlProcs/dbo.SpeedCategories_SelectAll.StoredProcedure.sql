USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SpeedCategories_SelectAll]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Author,,RANA>
-- Create date: <,10/21/2022,>
-- Description: <LookUp Table,,>
-- Code Reviewer:Brenda

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[SpeedCategories_SelectAll]

AS
/*

Execute dbo.SpeedCategories_SelectAll
*/

BEGIN

SELECT [Id]
       ,[Name]

	   from dbo.SpeedCategories
END
GO

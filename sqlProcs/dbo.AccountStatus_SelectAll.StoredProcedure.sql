USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[AccountStatus_SelectAll]    Script Date: 10/25/2022 5:46:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[AccountStatus_SelectAll]

as

/*

Execute dbo.AccountStatus_SelectAll

*/

BEGIN

	SELECT [Name]
		  ,[Id]

	  FROM [dbo].[AccountStatus]


END

GO

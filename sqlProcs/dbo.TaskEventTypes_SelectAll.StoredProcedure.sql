USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TaskEventTypes_SelectAll]    Script Date: 3/16/2023 4:11:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[TaskEventTypes_SelectAll]


/*
Execute dbo.TaskEventTypes_SelectAll
*/

as


Begin



SELECT [Id]
      ,[Name]
  FROM [dbo].[TaskEventTypes]


  END

GO

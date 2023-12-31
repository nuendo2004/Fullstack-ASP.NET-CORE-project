USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TaskEvents_SelectAll]    Script Date: 3/16/2023 4:06:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <03/14/2023>
-- Description:	<Select All record for TaskEvents>
-- Code Reviewer: Steve Nam


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[TaskEvents_SelectAll]

/*
Execute dbo.TaskEvents_SelectAll
*/

as

Begin

SELECT te.Id
      ,te.ZoneId
      ,te.EntityTypeId
	  ,et.Name as EntityTypeName
      ,te.[EntityId]
      ,te.[TaskEventTypeId]
	  ,tet.Name as TaskEventTypeName
      ,te.[NumericValue]
      ,te.[BoolValue]
      ,te.[Text]
      ,te.[Payload]
      ,te.[CreatedBy]
      ,te.[ModifiedBy]
      ,te.[DateCreated]
      ,te.[DateModified]
  FROM [dbo].[TaskEvents] as te inner join dbo.EntityTypes as et
  on te.EntityTypeId = et.Id
  inner join dbo.TaskEventTypes as tet
  on te.TaskEventTypeId = tet.Id

  END
GO

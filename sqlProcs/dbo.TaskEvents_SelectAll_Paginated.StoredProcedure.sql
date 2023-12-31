USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TaskEvents_SelectAll_Paginated]    Script Date: 3/16/2023 4:06:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Andrew Phothisen>
-- Create date: <03/15/2023>
-- Description: <Selects all TaskEvents in Paginated View>
-- Code Reviewer: Steven Nam

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[TaskEvents_SelectAll_Paginated]
	@PageIndex int
	,@PageSize int

AS

/*
	DECLARE @PageIndex int = 0
			,@PageSize int = 5

	EXECUTE [dbo].[TaskEvents_SelectAll_Paginated] @PageIndex, @PageSize

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

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
	  ,COUNT(1) OVER() TotalCount
  FROM [dbo].[TaskEvents] as te inner join dbo.EntityTypes as et
  on te.EntityTypeId = et.Id
  inner join dbo.TaskEventTypes as tet
  on te.TaskEventTypeId = tet.Id		
				
	ORDER BY te.Id

	OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS ONLY

END
GO

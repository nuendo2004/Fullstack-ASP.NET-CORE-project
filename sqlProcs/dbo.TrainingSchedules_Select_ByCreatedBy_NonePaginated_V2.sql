USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_Select_ByCreatedBy_NonePaginated_V2]    Script Date: 3/28/2023 12:38:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Wen Xue
-- Create date: 3/13/2023
-- Description:	A proc to Select by CreatedBy NonePaginated from Training Schedules
-- Code Reviewer: Steve Nam

-- MODIFIED BY: Nari Morgia
-- MODIFIED DATE: 3/22/2023
-- Code Reviewer: William Chung
-- Note: 
-- =============================================
CREATE proc [dbo].[TrainingSchedules_Select_ByCreatedBy_NonePaginated_V2]

		@CreatedBy int

as
/*

Declare 
	   @CreatedBy int = 125

Execute [dbo].[TrainingSchedules_Select_ByCreatedBy_NonePaginated_V2]

		@CreatedBy
*/
Begin



SELECT ts.[Id]
      ,ts.[Name]
      ,ts.[TrainingUnitId]
      ,ts.[DaysOfWeekId]
      ,ts.[StartTime]
      ,ts.[EndTime]
      ,ts.[StartDate]
      ,ts.[EndDate]
      ,ts.[isDeleted]
      ,u.Id as [ModifiedBy]
      ,u.Id as [CreatedBy]
      ,u.DateCreated as [DateCreated]
      ,u.DateModified as [DateModified]
	  ,TotalCount = COUNT(1) OVER()

  FROM [dbo].[TrainingSchedules] as ts inner JOIN dbo.Users as u 
		on ts.CreatedBy = u.Id
  Where CreatedBy = @CreatedBy
	AND ts.isDeleted = 0

  Order by ts.Id


End
GO

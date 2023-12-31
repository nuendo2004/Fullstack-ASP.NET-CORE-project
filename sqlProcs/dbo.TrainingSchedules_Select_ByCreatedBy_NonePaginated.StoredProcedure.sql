USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_Select_ByCreatedBy_NonePaginated]    Script Date: 3/13/2023 4:56:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Wen Xue
-- Create date: 3/13/2023
-- Description:	A proc to Select by CreatedBy NonePaginated from Training Schedules
-- Code Reviewer: Steve Nam

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc [dbo].[TrainingSchedules_Select_ByCreatedBy_NonePaginated]

		@CreatedBy int

as
/*

Declare 
	   @CreatedBy int = 125

Execute [dbo].[TrainingSchedules_Select_ByCreatedBy_NonePaginated]

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

  Order by ts.Id


End
GO

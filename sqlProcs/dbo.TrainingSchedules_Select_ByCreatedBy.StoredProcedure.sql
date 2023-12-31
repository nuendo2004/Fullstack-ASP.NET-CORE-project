USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_Select_ByCreatedBy]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Kyle Kilby
-- Create date: 10/24/2022
-- Description:	A proc to Select by CreatedBy from Training Schedules
-- Code Reviewer: Chris Mercado

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc [dbo].[TrainingSchedules_Select_ByCreatedBy]
		@PageIndex int
		,@PageSize int
		,@CreatedBy int

as
/*

Declare @PageIndex int = 0
	   ,@PageSize int = 10
	   ,@CreatedBy int = 55

Execute [dbo].[TrainingSchedules_Select_ByCreatedBy]
		@PageIndex
		,@PageSize
		,@CreatedBy
*/
Begin

Declare @offSet int = @PageIndex * @PageSize

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

  OFFSET @offSet Rows
  Fetch Next @PageSize Rows ONLY


End
GO

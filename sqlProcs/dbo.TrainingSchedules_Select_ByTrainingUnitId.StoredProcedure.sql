USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_Select_ByTrainingUnitId]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kyle Kilby
-- Create date: 10/24/2022
-- Description:	A proc to Select TrainingUnitId -filter on IsDeleted param (Paged)
-- Code Reviewer: Chris Mercado

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc [dbo].[TrainingSchedules_Select_ByTrainingUnitId]
		@PageIndex int
		,@PageSize int
		,@TrainingUnitId int

as
/*

Declare @PageIndex int = 0
	   ,@PageSize int = 5
	   ,@TrainingUnitId int = 1

Execute [dbo].[TrainingSchedules_Select_ByTrainingUnitId]
		@PageIndex
		,@PageSize
		,@TrainingUnitId
*/
Begin

Declare @offSet int = @PageIndex * @PageSize

SELECT ts.[Id]
      ,ts.[Name]
      ,tu.Id as [TrainingUnitId]
      ,ts.[DaysOfWeekId]
      ,ts.[StartTime]
      ,ts.[EndTime]
      ,ts.[StartDate]
      ,ts.[EndDate]
      ,ts.[isDeleted]
      ,ts.[ModifiedBy]
      ,ts.[CreatedBy]
      ,ts.DateCreated
      ,ts.DateModified
	  ,TotalCount = COUNT(1) OVER()

  FROM [dbo].[TrainingSchedules] as ts inner JOIN dbo.TrainingUnits as tu 
		on ts.TrainingUnitId = tu.Id
		Where(
			TrainingUnitId = @TrainingUnitId
			And
			ts.isDeleted = 1
			)
  Order by tu.Id

  OFFSET @offSet Rows
  Fetch Next @PageSize Rows ONLY


End
GO

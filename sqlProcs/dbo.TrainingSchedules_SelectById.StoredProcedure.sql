USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_SelectById]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kyle Kilby
-- Create date: 10/24/2022
-- Description:	A proc to Select Id from Training Schedules
-- Code Reviewer: Chris Mercado

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[TrainingSchedules_SelectById]
	@Id int

as

/*
Declare @Id int = 20
	Execute dbo.TrainingSchedules_SelectById @Id

Select * from dbo.TrainingSchedules
*/

Begin


SELECT [Id]
      ,[Name]
      ,[TrainingUnitId]
      ,[DaysOfWeekId]
      ,[StartTime]
      ,[EndTime]
      ,[StartDate]
      ,[EndDate]
      ,[isDeleted]
      ,[ModifiedBy]
      ,[CreatedBy]
      ,[DateCreated]
      ,[DateModified]

  FROM [dbo].[TrainingSchedules] 

  Where (Id = @Id)

End



GO

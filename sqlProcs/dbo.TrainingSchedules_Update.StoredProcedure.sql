USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_Update]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Kyle Kilby
-- Create date: 10/24/2022
-- Description:	Update Training Schedule 
-- Code Reviewer: Chris Mercado


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE proc [dbo].[TrainingSchedules_Update]
		@Name nvarchar(100)
		,@DaysOfWeekId int
		,@StartTime time(7)
		,@EndTime time(7)
		,@StartDate datetime2(7)
		,@EndDate datetime2(7)
		,@ModifiedBy int
		,@Id int
as
/* ------- Test Code ------
Declare @Id int = 20

Declare @Name nvarchar(100) = 'KylePrUpdateTest'
		,@DaysOfWeekId int = 5
		,@StartTime time(7) = '12:50:00'
		,@EndTime time(7) =  '12:52:00'
		,@StartDate datetime2(7) = getutcdate()
		,@EndDate datetime2(7) = getutcdate()
		,@ModifiedBy int = 55

Execute dbo.TrainingSchedules_Update
		 @Name
		,@DaysOfWeekId
		,@StartTime
		,@EndTime
		,@StartDate
		,@EndDate
		,@ModifiedBy
		,@Id

Select * from dbo.TrainingSchedules
Where Id = @Id
*/
Begin

	Declare @DateNow datetime2 = GETUTCDATE()

UPDATE [dbo].[TrainingSchedules]

   SET [Name] = @Name
      ,[DaysOfWeekId] = @DaysOfWeekId
      ,[StartTime] = @StartTime
      ,[EndTime] = @EndTime
      ,[StartDate] = @StartDate
      ,[EndDate] = @EndDate
      ,[ModifiedBy] = @ModifiedBy
      ,[DateModified] = @DateNow

 WHERE @Id = Id


End


GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingSchedules_Insert]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Kyle Kilby
-- Create date: 10/24/2022
-- Description:	A proc to Insert into Training Schedules
-- Code Reviewer: Chris Mercado

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[TrainingSchedules_Insert]
	@Name nvarchar(100)
    ,@TrainingUnitId int
    ,@DaysOfWeekId int
    ,@StartTime time(7)
    ,@EndTime time(7)
    ,@StartDate datetime2(7)
    ,@EndDate datetime2(7)
	,@ModifiedBy int
    ,@CreatedBy int
	,@Id int OUTPUT

as
/* ----- Test Code -----
Declare @Id int = 0

Declare @Name nvarchar(100) = 'Kyle PR test'
		,@TrainingUnitId int = 1
		,@DaysOfWeekId int = 3
		,@StartTime time(7) = '12:45:00'
		,@EndTime time(7) = '1:45:00'
		,@StartDate datetime2(7) = getutcdate()
		,@EndDate datetime2(7) = getutcdate()
		,@ModifiedBy int = 55
		,@CreatedBy int = 55

Execute dbo.TrainingSchedules_Insert
		@Name
		,@TrainingUnitId
		,@DaysOfWeekId
		,@StartTime
		,@EndTime
		,@StartDate
		,@EndDate
		,@ModifiedBy
		,@CreatedBy
		,@Id OUTPUT

	Select @Id

	Select * from dbo.TrainingSchedules
	Where Id = @Id
*/
BEGIN

DECLARE @DateCreated datetime = GETUTCDATE()


INSERT INTO [dbo].[TrainingSchedules]
           ([Name]
           ,[TrainingUnitId]
           ,[DaysOfWeekId]
           ,[StartTime]
           ,[EndTime]
           ,[StartDate]
           ,[EndDate]
		   ,ModifiedBy
           ,[CreatedBy]
           ,[DateCreated]
           )
     VALUES
           (@Name
			,@TrainingUnitId
			,@DaysOfWeekId
			,@StartTime
			,@EndTime
			,@StartDate
			,@EndDate
			,@ModifiedBy
			,@CreatedBy
			,@DateCreated
			)

Set @Id = SCOPE_IDENTITY()

End


GO

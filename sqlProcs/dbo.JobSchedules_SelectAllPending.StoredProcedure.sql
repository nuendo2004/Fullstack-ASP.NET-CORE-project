USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[JobSchedules_SelectAllPending]    Script Date: 12/2/2022 4:54:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Jacob Helton>
-- Create date: <11/23/2022>
-- Description:	<Selects all of the JobSchedules that are after the datetime the proc was ran>
-- Code Reviewer: 

-- MODIFIED BY: <Jacob Helton>
-- MODIFIED DATE: <12/2/2022>
-- Code Reviewer:
-- Note: <Updating for Quartz JobController>
-- =============================================

CREATE proc [dbo].[JobSchedules_SelectAllPending]

as

/*--------- TEST CODE -----------------

	Execute [dbo].[JobSchedules_SelectAllPending]

*/

BEGIN

	SELECT Distinct
		   Daily = (SELECT  [Id] as [id] 
						   ,[ChronJobTypeId] as [chronJobTypeId]
						   ,[IsRecurring] as [isRecurring]
						   ,[UtcHourToRun] as [utcHourToRun]
						   ,[IntervalTypeId] as [intervalTypeId]
						   ,[DaysOfWeekId] as [daysOfWeekId]
						   ,[EntityTypeId] as [entityTypeId]
						   ,[RecipientId] as [recipientId]
						   ,[Recipient] as [recipient]
						   ,[IsActive] as [isActive]
						   ,[CreatedBy] as [createdBy]
						   ,[ModifiedBy] as [modifiedBy]
						   ,[DateCreated] as [dateCreated]
						   ,[DateModified] as [dateModified]
						   ,[IsDeleted] as [isDeleted]
					FROM [dbo].[JobSchedules]
					WHERE [IntervalTypeId] = 1 and [IsDeleted] = 0 and [IsActive] = 1
					FOR JSON AUTO)
		  ,Weekly = (SELECT  [Id] as [id] 
						   ,[ChronJobTypeId] as [chronJobTypeId]
						   ,[IsRecurring] as [isRecurring]
						   ,[UtcHourToRun] as [utcHourToRun]
						   ,[IntervalTypeId] as [intervalTypeId]
						   ,[DaysOfWeekId] as [daysOfWeekId]
						   ,[EntityTypeId] as [entityTypeId]
						   ,[RecipientId] as [recipientId]
						   ,[Recipient] as [recipient]
						   ,[IsActive] as [isActive]
						   ,[CreatedBy] as [createdBy]
						   ,[ModifiedBy] as [modifiedBy]
						   ,[DateCreated] as [dateCreated]
						   ,[DateModified] as [dateModified]
						   ,[IsDeleted] as [isDeleted]
					 FROM [dbo].[JobSchedules]
					 WHERE [IntervalTypeId] = 2 and [IsDeleted] = 0 and [IsActive] = 1
					 FOR JSON AUTO)
		  ,Monthly = (SELECT [Id] as [id] 
						   ,[ChronJobTypeId] as [chronJobTypeId]
						   ,[IsRecurring] as [isRecurring]
						   ,[UtcHourToRun] as [utcHourToRun]
						   ,[IntervalTypeId] as [intervalTypeId]
						   ,[DaysOfWeekId] as [daysOfWeekId]
						   ,[EntityTypeId] as [entityTypeId]
						   ,[RecipientId] as [recipientId]
						   ,[Recipient] as [recipient]
						   ,[IsActive] as [isActive]
						   ,[CreatedBy] as [createdBy]
						   ,[ModifiedBy] as [modifiedBy]
						   ,[DateCreated] as [dateCreated]
						   ,[DateModified] as [dateModified]
						   ,[IsDeleted] as [isDeleted]
					 FROM [dbo].[JobSchedules]
					 WHERE [IntervalTypeId] = 3 and [IsDeleted] = 0 and [IsActive] = 1
					 FOR JSON AUTO)
		  ,Yearly = (SELECT  [Id] as [id] 
						   ,[ChronJobTypeId] as [chronJobTypeId]
						   ,[IsRecurring] as [isRecurring]
						   ,[UtcHourToRun] as [utcHourToRun]
						   ,[IntervalTypeId] as [intervalTypeId]
						   ,[DaysOfWeekId] as [daysOfWeekId]
						   ,[EntityTypeId] as [entityTypeId]
						   ,[RecipientId] as [recipientId]
						   ,[Recipient] as [recipient]
						   ,[IsActive] as [isActive]
						   ,[CreatedBy] as [createdBy]
						   ,[ModifiedBy] as [modifiedBy]
						   ,[DateCreated] as [dateCreated]
						   ,[DateModified] as [dateModified]
						   ,[IsDeleted] as [isDeleted]
					 FROM [dbo].[JobSchedules]
					 WHERE [IntervalTypeId] = 4 and [IsDeleted] = 0 and [IsActive] = 1
					 FOR JSON AUTO)

	FROM [dbo].[JobSchedules]
	

	

END
GO

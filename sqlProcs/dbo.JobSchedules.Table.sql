USE [Immersed]
GO
/****** Object:  Table [dbo].[JobSchedules]    Script Date: 12/2/2022 4:54:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobSchedules](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ChronJobTypeId] [int] NULL,
	[IsRecurring] [bit] NOT NULL,
	[UtcHourToRun] [int] NULL,
	[IntervalTypeId] [int] NULL,
	[DaysOfWeekId] [int] NULL,
	[EntityTypeId] [int] NOT NULL,
	[RecipientId] [int] NOT NULL,
	[Recipient] [nvarchar](255) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[ModifiedBy] [int] NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_JobSchedules] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobSchedules] ADD  CONSTRAINT [DF_JobSchedules_IsRecurring]  DEFAULT ((0)) FOR [IsRecurring]
GO
ALTER TABLE [dbo].[JobSchedules] ADD  CONSTRAINT [DF_JobSchedules_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[JobSchedules] ADD  CONSTRAINT [DF_JobSchedules_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[JobSchedules] ADD  CONSTRAINT [DF_JobSchedules_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[JobSchedules] ADD  CONSTRAINT [DF_JobSchedules_isDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[JobSchedules]  WITH CHECK ADD  CONSTRAINT [FK_JobSchedules_DaysOfWeekId_on_DaysOfWeek_Id] FOREIGN KEY([DaysOfWeekId])
REFERENCES [dbo].[DaysOfWeek] ([Id])
GO
ALTER TABLE [dbo].[JobSchedules] CHECK CONSTRAINT [FK_JobSchedules_DaysOfWeekId_on_DaysOfWeek_Id]
GO
ALTER TABLE [dbo].[JobSchedules]  WITH CHECK ADD  CONSTRAINT [FK_JobSchedules_FKChronJobTypeId_on_PKChronJobTypes_PKId] FOREIGN KEY([ChronJobTypeId])
REFERENCES [dbo].[ChronJobTypes] ([Id])
GO
ALTER TABLE [dbo].[JobSchedules] CHECK CONSTRAINT [FK_JobSchedules_FKChronJobTypeId_on_PKChronJobTypes_PKId]
GO
ALTER TABLE [dbo].[JobSchedules]  WITH CHECK ADD  CONSTRAINT [FK_JobSchedules_IntervalTypeId_on_IntervalTypes_Id] FOREIGN KEY([IntervalTypeId])
REFERENCES [dbo].[IntervalTypes] ([Id])
GO
ALTER TABLE [dbo].[JobSchedules] CHECK CONSTRAINT [FK_JobSchedules_IntervalTypeId_on_IntervalTypes_Id]
GO

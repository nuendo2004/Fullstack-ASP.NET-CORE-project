USE [Immersed]
GO
/****** Object:  Table [dbo].[TrainingSchedules]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TrainingSchedules](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[TrainingUnitId] [int] NOT NULL,
	[DaysOfWeekId] [int] NOT NULL,
	[StartTime] [time](7) NOT NULL,
	[EndTime] [time](7) NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
	[EndDate] [datetime2](7) NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TrainingSchedules] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TrainingSchedules] ADD  CONSTRAINT [DF_TrainingSchedules_StartDate]  DEFAULT (getutcdate()) FOR [StartDate]
GO
ALTER TABLE [dbo].[TrainingSchedules] ADD  CONSTRAINT [DF_TrainingSchedules_EndDate]  DEFAULT (getutcdate()) FOR [EndDate]
GO
ALTER TABLE [dbo].[TrainingSchedules] ADD  CONSTRAINT [DF_TrainingSchedules_isDeleted]  DEFAULT ((0)) FOR [isDeleted]
GO
ALTER TABLE [dbo].[TrainingSchedules] ADD  CONSTRAINT [DF_TrainingSchedules_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[TrainingSchedules] ADD  CONSTRAINT [DF_TrainingSchedules_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[TrainingSchedules]  WITH CHECK ADD  CONSTRAINT [FK_TrainingSchedules_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[TrainingSchedules] CHECK CONSTRAINT [FK_TrainingSchedules_CreatedBy]
GO
ALTER TABLE [dbo].[TrainingSchedules]  WITH CHECK ADD  CONSTRAINT [FK_TrainingSchedules_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[TrainingSchedules] CHECK CONSTRAINT [FK_TrainingSchedules_ModifiedBy]
GO
ALTER TABLE [dbo].[TrainingSchedules]  WITH CHECK ADD  CONSTRAINT [FK_TrainingUnitId_TrainingUnits_Id] FOREIGN KEY([TrainingUnitId])
REFERENCES [dbo].[TrainingUnits] ([Id])
GO
ALTER TABLE [dbo].[TrainingSchedules] CHECK CONSTRAINT [FK_TrainingUnitId_TrainingUnits_Id]
GO

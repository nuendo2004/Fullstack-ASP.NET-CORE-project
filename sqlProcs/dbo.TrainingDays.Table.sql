USE [Immersed]
GO
/****** Object:  Table [dbo].[TrainingDays]    Script Date: 10/26/2022 7:20:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TrainingDays](
	[TrainingScheduleId] [int] NOT NULL,
	[DaysOfWeekId] [int] NOT NULL,
 CONSTRAINT [PK_TrainingDays] PRIMARY KEY CLUSTERED 
(
	[TrainingScheduleId] ASC,
	[DaysOfWeekId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TrainingDays]  WITH CHECK ADD  CONSTRAINT [FK_TrainingDays_DaysOfWeek] FOREIGN KEY([DaysOfWeekId])
REFERENCES [dbo].[DaysOfWeek] ([Id])
GO
ALTER TABLE [dbo].[TrainingDays] CHECK CONSTRAINT [FK_TrainingDays_DaysOfWeek]
GO
ALTER TABLE [dbo].[TrainingDays]  WITH CHECK ADD  CONSTRAINT [FK_TrainingDays_TrainingSchedules] FOREIGN KEY([TrainingScheduleId])
REFERENCES [dbo].[TrainingSchedules] ([Id])
GO
ALTER TABLE [dbo].[TrainingDays] CHECK CONSTRAINT [FK_TrainingDays_TrainingSchedules]
GO

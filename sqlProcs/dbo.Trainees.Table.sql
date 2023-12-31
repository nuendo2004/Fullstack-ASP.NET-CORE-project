USE [Immersed]
GO
/****** Object:  Table [dbo].[Trainees]    Script Date: 10/26/2022 4:17:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trainees](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[TrainingUnitId] [int] NOT NULL,
	[TraineeStatusId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Trainees] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Trainees] ADD  CONSTRAINT [DF_Trainees_TraineeStatusId]  DEFAULT ((1)) FOR [TraineeStatusId]
GO
ALTER TABLE [dbo].[Trainees] ADD  CONSTRAINT [DF_Trainees_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Trainees] ADD  CONSTRAINT [DF_Trainees_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Trainees] ADD  CONSTRAINT [DF_Trainees_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Trainees]  WITH CHECK ADD  CONSTRAINT [FK_Trainees_TraineeStatus] FOREIGN KEY([TraineeStatusId])
REFERENCES [dbo].[TraineeStatus] ([Id])
GO
ALTER TABLE [dbo].[Trainees] CHECK CONSTRAINT [FK_Trainees_TraineeStatus]
GO
ALTER TABLE [dbo].[Trainees]  WITH CHECK ADD  CONSTRAINT [FK_Trainees_TrainingUnits1] FOREIGN KEY([TrainingUnitId])
REFERENCES [dbo].[TrainingUnits] ([Id])
GO
ALTER TABLE [dbo].[Trainees] CHECK CONSTRAINT [FK_Trainees_TrainingUnits1]
GO

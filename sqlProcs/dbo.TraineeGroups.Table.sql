USE [Immersed]
GO
/****** Object:  Table [dbo].[TraineeGroups]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TraineeGroups](
	[TraineeId] [int] NOT NULL,
	[GroupId] [int] NOT NULL,
	[DateAdded] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TraineeGroups] PRIMARY KEY CLUSTERED 
(
	[TraineeId] ASC,
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TraineeGroups] ADD  CONSTRAINT [DF_TraineeGroups_DateAdded]  DEFAULT (getutcdate()) FOR [DateAdded]
GO
ALTER TABLE [dbo].[TraineeGroups]  WITH CHECK ADD  CONSTRAINT [FK_TraineeGroups_Trainees] FOREIGN KEY([TraineeId])
REFERENCES [dbo].[Trainees] ([Id])
GO
ALTER TABLE [dbo].[TraineeGroups] CHECK CONSTRAINT [FK_TraineeGroups_Trainees]
GO
ALTER TABLE [dbo].[TraineeGroups]  WITH CHECK ADD  CONSTRAINT [FK_TraineeGroups_ZoneGroups] FOREIGN KEY([GroupId])
REFERENCES [dbo].[ZoneGroups] ([Id])
GO
ALTER TABLE [dbo].[TraineeGroups] CHECK CONSTRAINT [FK_TraineeGroups_ZoneGroups]
GO

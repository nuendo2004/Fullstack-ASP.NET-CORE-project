USE [Immersed]
GO
/****** Object:  Table [dbo].[TraineeAccounts]    Script Date: 10/25/2022 5:46:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TraineeAccounts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[AvatarUrl] [nvarchar](255) NOT NULL,
	[ZoneId] [int] NOT NULL,
	[TraineeId] [int] NOT NULL,
	[AccountStatusId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TraineeAccounts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TraineeAccounts] ADD  CONSTRAINT [DF_TraineeAccounts_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[TraineeAccounts] ADD  CONSTRAINT [DF_TraineeAccounts_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[TraineeAccounts]  WITH CHECK ADD  CONSTRAINT [FK_TraineeAccounts_AccountStatus] FOREIGN KEY([AccountStatusId])
REFERENCES [dbo].[AccountStatus] ([Id])
GO
ALTER TABLE [dbo].[TraineeAccounts] CHECK CONSTRAINT [FK_TraineeAccounts_AccountStatus]
GO
ALTER TABLE [dbo].[TraineeAccounts]  WITH CHECK ADD  CONSTRAINT [FK_TraineeAccounts_Trainees1] FOREIGN KEY([TraineeId])
REFERENCES [dbo].[Trainees] ([Id])
GO
ALTER TABLE [dbo].[TraineeAccounts] CHECK CONSTRAINT [FK_TraineeAccounts_Trainees1]
GO
ALTER TABLE [dbo].[TraineeAccounts]  WITH CHECK ADD  CONSTRAINT [FK_TraineeAccounts_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[TraineeAccounts] CHECK CONSTRAINT [FK_TraineeAccounts_Users]
GO
ALTER TABLE [dbo].[TraineeAccounts]  WITH CHECK ADD  CONSTRAINT [FK_TraineeAccounts_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[TraineeAccounts] CHECK CONSTRAINT [FK_TraineeAccounts_Users1]
GO
ALTER TABLE [dbo].[TraineeAccounts]  WITH CHECK ADD  CONSTRAINT [FK_TraineeAccounts_Zones] FOREIGN KEY([ZoneId])
REFERENCES [dbo].[Zones] ([Id])
GO
ALTER TABLE [dbo].[TraineeAccounts] CHECK CONSTRAINT [FK_TraineeAccounts_Zones]
GO

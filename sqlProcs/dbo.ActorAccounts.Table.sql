USE [Immersed]
GO
/****** Object:  Table [dbo].[ActorAccounts]    Script Date: 12/5/2022 12:24:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActorAccounts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](50) NULL,
	[AvatarUrl] [nvarchar](255) NULL,
	[ZoneId] [int] NOT NULL,
	[ActorId] [int] NOT NULL,
	[AccountStatusId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ActorAccounts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ActorAccounts] ADD  CONSTRAINT [DF_ActorAccounts_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[ActorAccounts] ADD  CONSTRAINT [DF_ActorAccounts_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[ActorAccounts]  WITH CHECK ADD  CONSTRAINT [FK_ActorAccounts_AccountStatus] FOREIGN KEY([AccountStatusId])
REFERENCES [dbo].[AccountStatus] ([Id])
GO
ALTER TABLE [dbo].[ActorAccounts] CHECK CONSTRAINT [FK_ActorAccounts_AccountStatus]
GO
ALTER TABLE [dbo].[ActorAccounts]  WITH CHECK ADD  CONSTRAINT [FK_ActorAccounts_Actors] FOREIGN KEY([ActorId])
REFERENCES [dbo].[Actors] ([Id])
GO
ALTER TABLE [dbo].[ActorAccounts] CHECK CONSTRAINT [FK_ActorAccounts_Actors]
GO
ALTER TABLE [dbo].[ActorAccounts]  WITH CHECK ADD  CONSTRAINT [FK_ActorAccounts_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ActorAccounts] CHECK CONSTRAINT [FK_ActorAccounts_Users]
GO
ALTER TABLE [dbo].[ActorAccounts]  WITH CHECK ADD  CONSTRAINT [FK_ActorAccounts_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ActorAccounts] CHECK CONSTRAINT [FK_ActorAccounts_Users1]
GO
ALTER TABLE [dbo].[ActorAccounts]  WITH CHECK ADD  CONSTRAINT [FK_ActorAccounts_Zones] FOREIGN KEY([ZoneId])
REFERENCES [dbo].[Zones] ([Id])
GO
ALTER TABLE [dbo].[ActorAccounts] CHECK CONSTRAINT [FK_ActorAccounts_Zones]
GO

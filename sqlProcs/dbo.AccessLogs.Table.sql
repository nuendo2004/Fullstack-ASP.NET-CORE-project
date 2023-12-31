USE [Immersed]
GO
/****** Object:  Table [dbo].[AccessLogs]    Script Date: 4/3/2023 5:44:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccessLogs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EntityTypeId] [int] NOT NULL,
	[EntityId] [int] NOT NULL,
	[AccessTypeId] [int] NOT NULL,
	[AccessStatusId] [int] NOT NULL,
	[IPAddressPort] [nvarchar](100) NOT NULL,
	[EndpointName] [nvarchar](256) NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[PayloadName] [nvarchar](100) NOT NULL,
	[Route] [nvarchar](100) NOT NULL,
	[DeviceTypeId] [int] NOT NULL,
	[ZoneId] [int] NULL,
 CONSTRAINT [PK_AccessLogs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AccessLogs] ADD  CONSTRAINT [DF_AccessLogs_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[AccessLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccessLogs_AccessStatus] FOREIGN KEY([AccessStatusId])
REFERENCES [dbo].[AccessStatus] ([Id])
GO
ALTER TABLE [dbo].[AccessLogs] CHECK CONSTRAINT [FK_AccessLogs_AccessStatus]
GO
ALTER TABLE [dbo].[AccessLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccessLogs_AccessTypes] FOREIGN KEY([AccessTypeId])
REFERENCES [dbo].[AccessTypes] ([Id])
GO
ALTER TABLE [dbo].[AccessLogs] CHECK CONSTRAINT [FK_AccessLogs_AccessTypes]
GO
ALTER TABLE [dbo].[AccessLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccessLogs_DeviceTypes] FOREIGN KEY([DeviceTypeId])
REFERENCES [dbo].[DeviceTypes] ([Id])
GO
ALTER TABLE [dbo].[AccessLogs] CHECK CONSTRAINT [FK_AccessLogs_DeviceTypes]
GO
ALTER TABLE [dbo].[AccessLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccessLogs_EntityTypes] FOREIGN KEY([EntityTypeId])
REFERENCES [dbo].[EntityTypes] ([Id])
GO
ALTER TABLE [dbo].[AccessLogs] CHECK CONSTRAINT [FK_AccessLogs_EntityTypes]
GO

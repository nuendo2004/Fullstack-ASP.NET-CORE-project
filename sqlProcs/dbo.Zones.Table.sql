USE [Immersed]
GO
/****** Object:  Table [dbo].[Zones]    Script Date: 25/10/2022 21:07:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Zones](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[ZoneTypeId] [int] NOT NULL,
	[ZoneStatusId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Zones] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Zones] ADD  CONSTRAINT [DF_Zones_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Zones] ADD  CONSTRAINT [DF_Zones_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Zones] ADD  CONSTRAINT [DF_Zones_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Zones]  WITH CHECK ADD  CONSTRAINT [FK_Zones_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Zones] CHECK CONSTRAINT [FK_Zones_Users]
GO
ALTER TABLE [dbo].[Zones]  WITH CHECK ADD  CONSTRAINT [FK_Zones_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Zones] CHECK CONSTRAINT [FK_Zones_Users1]
GO
ALTER TABLE [dbo].[Zones]  WITH CHECK ADD  CONSTRAINT [FK_Zones_ZoneStatus] FOREIGN KEY([ZoneStatusId])
REFERENCES [dbo].[ZoneStatus] ([Id])
GO
ALTER TABLE [dbo].[Zones] CHECK CONSTRAINT [FK_Zones_ZoneStatus]
GO
ALTER TABLE [dbo].[Zones]  WITH CHECK ADD  CONSTRAINT [FK_Zones_ZoneTypes2] FOREIGN KEY([ZoneTypeId])
REFERENCES [dbo].[ZoneTypes] ([Id])
GO
ALTER TABLE [dbo].[Zones] CHECK CONSTRAINT [FK_Zones_ZoneTypes2]
GO

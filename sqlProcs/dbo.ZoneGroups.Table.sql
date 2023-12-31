USE [Immersed]
GO
/****** Object:  Table [dbo].[ZoneGroups]    Script Date: 11/1/2022 11:54:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZoneGroups](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](200) NULL,
	[ImageUrl] [nvarchar](255) NULL,
	[ZoneId] [int] NOT NULL,
	[EntityTypeId] [int] NOT NULL,
	[GroupAdminId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NULL,
 CONSTRAINT [PK_ZoneGroups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZoneGroups] ADD  CONSTRAINT [DF_ZoneGroups_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[ZoneGroups] ADD  CONSTRAINT [DF_ZoneGroups_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[ZoneGroups] ADD  CONSTRAINT [DF_ZoneGroups_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[ZoneGroups]  WITH CHECK ADD  CONSTRAINT [FK_ZoneGroups_EntityTypes] FOREIGN KEY([EntityTypeId])
REFERENCES [dbo].[EntityTypes] ([Id])
GO
ALTER TABLE [dbo].[ZoneGroups] CHECK CONSTRAINT [FK_ZoneGroups_EntityTypes]
GO
ALTER TABLE [dbo].[ZoneGroups]  WITH CHECK ADD  CONSTRAINT [FK_ZoneGroups_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ZoneGroups] CHECK CONSTRAINT [FK_ZoneGroups_Users]
GO
ALTER TABLE [dbo].[ZoneGroups]  WITH CHECK ADD  CONSTRAINT [FK_ZoneGroups_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ZoneGroups] CHECK CONSTRAINT [FK_ZoneGroups_Users1]
GO
ALTER TABLE [dbo].[ZoneGroups]  WITH CHECK ADD  CONSTRAINT [FK_ZoneGroups_Zones] FOREIGN KEY([ZoneId])
REFERENCES [dbo].[Zones] ([Id])
GO
ALTER TABLE [dbo].[ZoneGroups] CHECK CONSTRAINT [FK_ZoneGroups_Zones]
GO

USE [Immersed]
GO
/****** Object:  Table [dbo].[Consequences]    Script Date: 12/5/2022 12:24:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consequences](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NOT NULL,
	[ConsequenceTypeId] [int] NOT NULL,
	[ActorId] [int] NOT NULL,
	[ZoneId] [int] NULL,
	[isActive] [bit] NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Consequences] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Consequences] ADD  CONSTRAINT [DF_Consequences_isActive]  DEFAULT ((0)) FOR [isActive]
GO
ALTER TABLE [dbo].[Consequences] ADD  CONSTRAINT [DF_Consequences_isDeleted]  DEFAULT ((0)) FOR [isDeleted]
GO
ALTER TABLE [dbo].[Consequences] ADD  CONSTRAINT [DF_Consequences_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Consequences] ADD  CONSTRAINT [DF_Consequences_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Consequences]  WITH CHECK ADD  CONSTRAINT [FK_Consequences_Actors] FOREIGN KEY([ActorId])
REFERENCES [dbo].[Actors] ([Id])
GO
ALTER TABLE [dbo].[Consequences] CHECK CONSTRAINT [FK_Consequences_Actors]
GO
ALTER TABLE [dbo].[Consequences]  WITH CHECK ADD  CONSTRAINT [FK_Consequences_ConsequenceTypes1] FOREIGN KEY([ConsequenceTypeId])
REFERENCES [dbo].[ConsequenceTypes] ([Id])
GO
ALTER TABLE [dbo].[Consequences] CHECK CONSTRAINT [FK_Consequences_ConsequenceTypes1]
GO
ALTER TABLE [dbo].[Consequences]  WITH CHECK ADD  CONSTRAINT [FK_Consequences_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Consequences] CHECK CONSTRAINT [FK_Consequences_Users]
GO
ALTER TABLE [dbo].[Consequences]  WITH CHECK ADD  CONSTRAINT [FK_Consequences_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Consequences] CHECK CONSTRAINT [FK_Consequences_Users1]
GO
ALTER TABLE [dbo].[Consequences]  WITH CHECK ADD  CONSTRAINT [FK_Consequences_Zones] FOREIGN KEY([ZoneId])
REFERENCES [dbo].[Zones] ([Id])
GO
ALTER TABLE [dbo].[Consequences] CHECK CONSTRAINT [FK_Consequences_Zones]
GO

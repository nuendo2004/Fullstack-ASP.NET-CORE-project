USE [Immersed]
GO
/****** Object:  Table [dbo].[TaskEvents]    Script Date: 3/14/2023 3:07:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskEvents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ZoneId] [int] NOT NULL,
	[EntityTypeId] [int] NOT NULL,
	[EntityId] [int] NOT NULL,
	[TaskEventTypeId] [int] NOT NULL,
	[NumericValue] [int] NULL,
	[BoolValue] [bit] NOT NULL,
	[Text] [nvarchar](255) NOT NULL,
	[Payload] [nvarchar](max) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TaskEvents] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[TaskEvents] ADD  CONSTRAINT [DF_TaskEvents_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[TaskEvents] ADD  CONSTRAINT [DF_TaskEvents_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[TaskEvents]  WITH CHECK ADD  CONSTRAINT [FK_TaskEvents_EntityTypes] FOREIGN KEY([EntityTypeId])
REFERENCES [dbo].[EntityTypes] ([Id])
GO
ALTER TABLE [dbo].[TaskEvents] CHECK CONSTRAINT [FK_TaskEvents_EntityTypes]
GO
ALTER TABLE [dbo].[TaskEvents]  WITH CHECK ADD  CONSTRAINT [FK_TaskEvents_TaskEventTypes] FOREIGN KEY([TaskEventTypeId])
REFERENCES [dbo].[TaskEventTypes] ([Id])
GO
ALTER TABLE [dbo].[TaskEvents] CHECK CONSTRAINT [FK_TaskEvents_TaskEventTypes]
GO
ALTER TABLE [dbo].[TaskEvents]  WITH CHECK ADD  CONSTRAINT [FK_TaskEvents_Zones] FOREIGN KEY([ZoneId])
REFERENCES [dbo].[Zones] ([Id])
GO
ALTER TABLE [dbo].[TaskEvents] CHECK CONSTRAINT [FK_TaskEvents_Zones]
GO

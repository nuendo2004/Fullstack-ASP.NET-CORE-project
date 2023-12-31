USE [Immersed]
GO
/****** Object:  Table [dbo].[ZoneRecords]    Script Date: 4/3/2023 5:42:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ZoneRecords](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TraineeId] [int] NOT NULL,
	[ZoneId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK__ZoneTrac__3214EC07DD541A0B] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ZoneRecords] ADD  CONSTRAINT [DF_ZoneRecords_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[ZoneRecords]  WITH CHECK ADD  CONSTRAINT [FK__ZoneTrack__Train__42D7CD5D] FOREIGN KEY([TraineeId])
REFERENCES [dbo].[Trainees] ([Id])
GO
ALTER TABLE [dbo].[ZoneRecords] CHECK CONSTRAINT [FK__ZoneTrack__Train__42D7CD5D]
GO
ALTER TABLE [dbo].[ZoneRecords]  WITH CHECK ADD  CONSTRAINT [FK__ZoneTrack__ZoneI__43CBF196] FOREIGN KEY([ZoneId])
REFERENCES [dbo].[Zones] ([Id])
GO
ALTER TABLE [dbo].[ZoneRecords] CHECK CONSTRAINT [FK__ZoneTrack__ZoneI__43CBF196]
GO

USE [Immersed]
GO
/****** Object:  Table [dbo].[SiteReferences]    Script Date: 3/14/2023 3:07:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SiteReferences](
	[ReferenceTypeId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_SiteReferences] PRIMARY KEY CLUSTERED 
(
	[ReferenceTypeId] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[SiteReferences]  WITH CHECK ADD  CONSTRAINT [FK_SiteReferences_ReferenceTypes] FOREIGN KEY([ReferenceTypeId])
REFERENCES [dbo].[ReferenceTypes] ([Id])
GO
ALTER TABLE [dbo].[SiteReferences] CHECK CONSTRAINT [FK_SiteReferences_ReferenceTypes]
GO

USE [Immersed]
GO
/****** Object:  Table [dbo].[UserTokens]    Script Date: 10/26/2022 6:25:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTokens](
	[Token] [varchar](200) NOT NULL,
	[UserId] [int] NOT NULL,
	[TokenTypeId] [int] NOT NULL,
 CONSTRAINT [PK_UserTokens] PRIMARY KEY CLUSTERED 
(
	[Token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserTokens]  WITH CHECK ADD  CONSTRAINT [FK_UserTokens_TokenTypes1] FOREIGN KEY([TokenTypeId])
REFERENCES [dbo].[TokenTypes] ([Id])
GO
ALTER TABLE [dbo].[UserTokens] CHECK CONSTRAINT [FK_UserTokens_TokenTypes1]
GO

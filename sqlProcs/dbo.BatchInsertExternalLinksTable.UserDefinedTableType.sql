USE [Immersed]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchInsertExternalLinksTable]    Script Date: 14/12/2022 15:13:59 ******/
CREATE TYPE [dbo].[BatchInsertExternalLinksTable] AS TABLE(
	[UrlTypeId] [int] NOT NULL,
	[Url] [nvarchar](255) NOT NULL
)
GO

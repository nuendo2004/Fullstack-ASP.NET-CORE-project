USE [Immersed]
GO
/****** Object:  UserDefinedTableType [dbo].[SurveyTypeId]    Script Date: 3/10/2023 2:07:21 AM ******/
CREATE TYPE [dbo].[SurveyTypeId] AS TABLE(
	[TypeId] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[TypeId] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO

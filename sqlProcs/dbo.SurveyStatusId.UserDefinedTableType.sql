USE [Immersed]
GO
/****** Object:  UserDefinedTableType [dbo].[SurveyStatusId]    Script Date: 3/10/2023 2:07:21 AM ******/
CREATE TYPE [dbo].[SurveyStatusId] AS TABLE(
	[StatusId] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO

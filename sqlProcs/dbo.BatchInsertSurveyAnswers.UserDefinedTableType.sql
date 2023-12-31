USE [Immersed]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchInsertSurveyAnswers]    Script Date: 4/3/2023 3:38:40 PM ******/
CREATE TYPE [dbo].[BatchInsertSurveyAnswers] AS TABLE(
	[SurveyId] [int] NOT NULL,
	[QuestionId] [int] NOT NULL,
	[AnswerOptionId] [int] NULL,
	[Answer] [nvarchar](500) NULL,
	[AnswerNumber] [int] NULL,
	[UserId] [int] NULL
)
GO

USE [Immersed]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchSurveyQuestionAnswerOptions]    Script Date: 3/29/2023 7:53:21 PM ******/
CREATE TYPE [dbo].[BatchSurveyQuestionAnswerOptions] AS TABLE(
	[QuestionId] [int] NOT NULL,
	[Text] [nvarchar](500) NOT NULL,
	[Value] [nvarchar](100) NULL,
	[AdditionalInfo] [nvarchar](200) NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL
)
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_DeleteById]    Script Date: 3/2/2023 10:32:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Paul Segura>
-- Create date: <02/24/2023,,>
-- Description: <Delete by FileType Id,,>
-- Code Reviewer:
-- Note: In Accordance With Immersed Task
-- MODIFIED BY: author
-- MODIFIED DATE:2/24/2023
-- Code Reviewer: Andy Garcia
-- Note:
-- =============================================
CREATE proc [dbo].[Newsletters_DeleteById]
							@Id int



/*
Select * 
FROM [dbo].[Newsletters]

Declare @Id int = 6

Execute [dbo].[Newsletters_DeleteById]
						@Id

Select * 
FROM [dbo].[Newsletters]
	
	
	*/
as


BEGIN




DELETE FROM [dbo].[Newsletters]
      WHERE Id = @Id


END
GO

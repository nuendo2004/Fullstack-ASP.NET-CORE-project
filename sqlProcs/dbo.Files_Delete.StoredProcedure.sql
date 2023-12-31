USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Files_Delete]    Script Date: 3/2/2023 8:16:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Files_Delete]

					@Id int
as
-- =============================================
-- Author: <Author,,Thaddeus Szyplik>
-- Create date: <02/24/2023,,>
-- Description: <Delete,,>
-- Code Reviewer:
-- Note: In Accordance With Immersed Task 

-- MODIFIED BY: author
-- MODIFIED DATE:2/24/2023
-- Code Reviewer: Sabrina Salgado 
-- Note:
-- =============================================
/*

Declare @Id int = 1162
Execute dbo.Files_Delete
				@Id

Select *
From dbo.Files
*/

BEGIN

Declare @FileTypeId int =
						(
						Select Id
						FROM [dbo].FileTypes as ft
						WHERE ft.Id = @Id
						)

DELETE 
		FROM [dbo].Files
		WHERE Id = @Id




END
GO

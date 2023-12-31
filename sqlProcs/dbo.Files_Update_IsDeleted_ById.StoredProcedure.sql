USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Files_Update_IsDeleted_ById]    Script Date: 10/27/2022 3:45:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Files_Update_IsDeleted_ById]			
						@Id int OUTPUT


as
-- =============================================
-- Author: <Author,,Micheal White>
-- Create date: <10/21/2022,,>
-- Description: <_Update IsDeleted ById,,>
-- Code Reviewer: Miranda Merritt
-- Note: In Accordance With Immersed Task 

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

/*


Declare @Id int = 4
		Declare @IsDeleted bit = 0

Execute dbo.Files_Update_IsDeleted_ById							
							@Id OUTPUT


Select *
from dbo.Files

--Delete from dbo.Files
--WHERE Id = 

Select *
from dbo.Users 
*/
BEGIN	

Declare @dateNow datetime2 = getutcdate()
UPDATE	 [dbo].[Files]
		SET	   	 
				[DateModified] = @dateNow
				,[IsDeleted] = 1

		WHERE Id = @Id

END


GO

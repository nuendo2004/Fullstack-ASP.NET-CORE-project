USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[SiteReferences_Insert]    Script Date: 3/15/2023 2:50:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <03/10/2023>
-- Description:	<Insert record for SiteReferences>
-- Code Reviewer: Steve Nam


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[SiteReferences_Insert]
					@RefTypeId int
					,@UserId int
					
as

/*

Select *
from [dbo].[SiteReferences]

Declare @RefTypeId int = 1
		,@UserId int = 22

Execute [dbo].[SiteReferences_Insert]
					@RefTypeId 
					,@UserId 
					
Select *
from [dbo].[SiteReferences]

*/


Begin

INSERT INTO [dbo].[SiteReferences]
           ([ReferenceTypeId]
           ,[UserId])
     VALUES
           (@RefTypeId
           ,@UserId)
		
END
GO

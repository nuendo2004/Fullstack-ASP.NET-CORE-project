USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterTemplates_DeleteById]    Script Date: 2/27/2023 8:32:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <02/26/2023>
-- Description:	<Delete record for NewsletterTemplates>
-- Code Reviewer: Ricky Damazio


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[NewsletterTemplates_DeleteById]
							@Id int



/*
Select * 
FROM [dbo].[NewsletterTemplates]

Execute [dbo].[NewsletterTemplates_DeleteById]
							0

Select * 
FROM [dbo].[NewsletterTemplates]
	
	
	*/
as


BEGIN




DELETE FROM [dbo].[NewsletterTemplates]
      WHERE Id = @Id


END
GO

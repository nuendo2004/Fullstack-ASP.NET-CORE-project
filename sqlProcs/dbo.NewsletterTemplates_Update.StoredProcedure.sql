USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterTemplates_Update]    Script Date: 2/27/2023 8:32:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <02/26/2023>
-- Description:	<Update record for NewsletterTemplates>
-- Code Reviewer: Ricky Damazio


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

CREATE Proc [dbo].[NewsletterTemplates_Update]
					@Id int
					,@Name nvarchar(100)
					,@Description nvarchar(200)
					,@Content nvarchar(4000)
					,@PrimaryImage nvarchar(255)
					,@ModifiedBy int
as


/*
Select *
From [dbo].[NewsletterTemplates]


Execute [dbo].[NewsletterTemplates_Update]
					 4
					,'Andrew'
					,'A descc'
					,'Some Content'
					,'anImage.png'
					,9
					


Select *
From [dbo].[NewsletterTemplates]


*/


BEGIN

Declare @DateModified datetime2(7) = getutcdate()


UPDATE [dbo].[NewsletterTemplates]
   SET [Name] = @Name
      ,[Description] = @Description
      ,[Content] = @Content
      ,[PrimaryImage] = @PrimaryImage
      ,[DateModified] = @DateModified
      ,[ModifiedBy] = @ModifiedBy
 WHERE Id = @Id



END

GO

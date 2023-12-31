USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterTemplates_Insert]    Script Date: 2/27/2023 8:32:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <02/26/2023>
-- Description:	<Insert record for NewsletterTemplates>
-- Code Reviewer: Ricky Damazio


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================


CREATE Proc [dbo].[NewsletterTemplates_Insert]
					@Name nvarchar(100)
					,@Description nvarchar(200)
					,@Content nvarchar(4000)
					,@PrimaryImage nvarchar(255)
					,@CreatedBy int
					,@Id int OUTPUT


/*
Select *
From [dbo].[NewsletterTemplates]


Execute [dbo].[NewsletterTemplates_Insert]
					'Andrew'
					,'A desc'
					,'Some Content'
					,'anImage.png'
					,8
					,0


Select *
From [dbo].[NewsletterTemplates]


*/




as


BEGIN

Declare @DateModified datetime2(7) = getutcdate()
Declare @DateCreated datetime2(7) = getutcdate()

Insert Into [dbo].[NewsletterTemplates]
       ([Name]
      ,[Description] 
      ,[Content] 
      ,[PrimaryImage]
	  ,DateCreated
      ,[DateModified] 
      ,[CreatedBy] )

Values ( @Name
      , @Description
      ,@Content
      ,@PrimaryImage
	  ,@DateCreated
      ,@DateModified
      ,@CreatedBy)

SET @Id = SCOPE_IDENTITY()


END

GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Batch_Insert]    Script Date: 14/12/2022 15:13:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Patricio Alves dos Santos>
-- Create date: <12/11/2022>
-- Description: <Batch Insert into the ExternalLinks table with valid User, UrlType and EntityType>
-- Code Reviewer: <Guillermo Schauer>

-- MODIFIED BY: author
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ExternalLinks_Batch_Insert]
			@CreatedBy int
			,@batchExternalLinkInsert dbo.BatchInsertExternalLinksTable READONLY
			,@EntityId int
			,@EntityTypeId int

as

/*
declare @CreatedBy int = 216 
		,@EntityId int =1
		,@EntityTypeId int = 7
		,@batchExternalLinkInsert dbo.BatchInsertExternalLinksTable 
		
insert into @batchExternalLinkInsert (UrlTypeId, Url)
	Values (1,'www.socialmedia.com')
	insert into @batchExternalLinkInsert (UrlTypeId, Url)
	Values (1,'www.socialmedia2.com')
	execute [dbo].[ExternalLinks_Batch_Insert]
			@CreatedBy 
			,@batchExternalLinkInsert 
			,@EntityId 
			,@EntityTypeId 
			
		
*/

BEGIN
		
Insert into [dbo].[ExternalLinks] ([CreatedBy]
	,batch.UrlTypeId
    ,batch.Url
	,[EntityId]
	,[EntityTypeId]
	)
	
select  @CreatedBy
		,batch.UrlTypeId
		,batch.Url
		,@EntityId
		,@EntityTypeId



From @batchExternalLinkInsert as batch		
	
END

GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Insert]    Script Date: 9/12/2022 20:38:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Patricio Alves dos Santos>
-- Create date: <12/07/2022>
-- Description: <Insert into the ExternalLinks table with valid User, UrlType and EntityType>
-- Code Reviewer: <Augustus Chong>

-- MODIFIED BY: author
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ExternalLinks_Insert]
			 @Id int OUTPUT
			, @UserId int 
			,@UrlTypeId int 
           ,@Url nvarchar(255)
           ,@EntityId int
           ,@EntityTypeId int


as
/*
---------- TEST CODE ---------------

	Declare @Id int = 0
	,@UserId int = 8
	,@UrlTypeId int = 1
	,@Url nvarchar(255) = "www.blogstuff.com"
	,@EntityId int = 1
	,@EntityTypeId int = 7

	Execute [dbo].[ExternalLinks_Insert]
	@Id OUTPUT
	,@UserId 
	,@UrlTypeId 
	,@Url 
	,@EntityId 
	,@EntityTypeId 



*/

BEGIN
INSERT INTO [dbo].[ExternalLinks]
           ([UserId]
           ,[UrlTypeId]
           ,[Url]
           ,[EntityId]
           ,[EntityTypeId]
			)
     VALUES
           (@UserId
           ,@UrlTypeId
           ,@Url
           ,@EntityId
           ,@EntityTypeId
           )
END


GO

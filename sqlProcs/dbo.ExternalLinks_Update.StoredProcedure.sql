USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Update]    Script Date: 9/12/2022 20:38:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Patricio Alves dos Santos>
-- Create date: <12 /8/2022>
-- Description: <Updates an External Link by it's Id>
-- Code Reviewer: <Augustus Chong>

-- MODIFIED BY: author
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ExternalLinks_Update]
			 @Id int 
			 , @UserId int 
			,@UrlTypeId int 
           ,@Url nvarchar(255)
           ,@EntityId int
           ,@EntityTypeId int
as

/*----------- TEST CODE --------------

	Declare @Id int = 1
	,@UserId int = 8
	,@UrlTypeId int = 1
	,@Url nvarchar(255) = "www.changedblogstuff.com"
	,@EntityId int = 1
	,@EntityTypeId int = 7

	Execute [dbo].[ExternalLinks_Update]
	@Id 
	,@UserId 
	,@UrlTypeId 
	,@Url 
	,@EntityId 
	,@EntityTypeId 


*/

BEGIN
	
	Declare @dateNow datetime2 = getutcdate()
	
	UPDATE [dbo].[ExternalLinks]
	
	SET 
			[UserId] = @UserId
           ,[UrlTypeId] = @UrlTypeId 
           ,[Url] = @Url 
           ,[EntityId] = @EntityId 
           ,[EntityTypeId] = @EntityTypeId 
		   ,[DateModified] = @dateNow

	WHERE (
			Id = @Id
			)

END
GO

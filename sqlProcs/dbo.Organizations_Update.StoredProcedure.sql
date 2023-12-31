USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Update]    Script Date: 28/10/2022 14:08:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <10/20/2022>
-- Description: <Update organization.>
-- Code Reviewer: Patrick Hangartner

-- MODIFIED BY: <Pablo Pantaleo>
-- MODIFIED DATE: <10/28/2022>
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Organizations_Update]
	@OrganizationTypeId int
	,@Name nvarchar(200)
	,@Description nvarchar(200)
	,@LogoUrl nvarchar(255)
	,@BusinessPhone nvarchar(20)
	,@PrimaryLocationId int
	,@SiteUrl nvarchar(255)
	,@IsDeleted bit
	,@UserId int
	,@Id int

/*
	DECLARE	@organizationTypeId int = 8
			,@name nvarchar(200) = 'Changed Name'
			,@description nvarchar(200) = NULL
			,@logoUrl nvarchar(255) = NULL
			,@businessPhone nvarchar(20) = NULL
			,@primaryLocationId int = NUll
			,@siteUrl nvarchar(255) = NULL
			,@isDeleted bit = 0
			,@UserId int = 20
			,@id int = 32
	
	EXECUTE [dbo].[Organizations_Update]
			@organizationTypeId
			,@name
			,@description
			,@logoUrl
			,@businessPhone
			,@primaryLocationId
			,@siteUrl
			,@isDeleted
			,@UserId
			,@id

	SELECT *
	FROM [dbo].[Organizations]
	WHERE [Id] = @id

*/

AS

BEGIN
	
	DECLARE @utcDateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].[Organizations]
	
	SET	[OrganizationTypeId] = @OrganizationTypeId
		,[Name] = @Name
		,[Description] = @Description
		,[LogoUrl] = @LogoUrl
		,[BusinessPhone] = @BusinessPhone
		,[PrimaryLocationId] = @PrimaryLocationId
		,[SiteUrl] = @SiteUrl
		,[IsDeleted] = @IsDeleted
		,[DateModified] = @utcDateNow
		,[ModifiedBy] = @UserId
	
	WHERE [Id] = @Id

END
GO

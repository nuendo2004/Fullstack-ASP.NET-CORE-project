USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Organizations_Insert]    Script Date: 28/10/2022 14:08:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Pablo Pantaleo>
-- Create date: <10/20/2022>
-- Description: <Organizations insert.>
-- Code Reviewer: Patrick Hangartner

-- MODIFIED BY: <Pablo Pantaleo>
-- MODIFIED DATE: 10/28/2022 
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[Organizations_Insert]
	@OrganizationTypeId int
	,@Name nvarchar(200)
	,@Description nvarchar(200)
	,@LogoUrl nvarchar(255) 
	,@BusinessPhone nvarchar(20) 
	,@PrimaryLocationId int 
	,@SiteUrl nvarchar(255)
	,@IsDeleted bit 
	,@CreatedBy int
	,@Id int OUTPUT

/*
	DECLARE	@organizationTypeId int = 8
			,@name nvarchar(200) = 'Org1'
			,@description nvarchar(200) = NULL
			,@logoUrl nvarchar(255) = NULL
			,@businessPhone nvarchar(20) = NULL
			,@primaryLocationId int = NULL
			,@siteUrl nvarchar(255) = NULL
			,@isDeleted bit = 0
			,@createdBy int = 17
			,@id int = 0
	
	EXECUTE [dbo].[Organizations_Insert]
			@organizationTypeId
			,@name
			,@description
			,@logoUrl
			,@businessPhone
			,@primaryLocationId
			,@siteUrl
			,@isDeleted
			,@createdBy
			,@id OUTPUT

	SELECT *
	FROM [dbo].[Organizations]
	WHERE [Id] = @id

*/

AS

BEGIN

	INSERT INTO [dbo].[Organizations] (
										[OrganizationTypeId]
										,[Name]
										,[Description]
										,[LogoUrl]
										,[BusinessPhone]
										,[PrimaryLocationId]
										,[SiteUrl]
										,[IsDeleted]
										,[CreatedBy]
										)
	VALUES (
			@OrganizationTypeId
			,@Name
			,@Description
			,@LogoUrl
			,@BusinessPhone
			,@PrimaryLocationId
			,@SiteUrl
			,@IsDeleted
			,@CreatedBy
		   )
	
	SET @Id = SCOPE_IDENTITY()

END
GO

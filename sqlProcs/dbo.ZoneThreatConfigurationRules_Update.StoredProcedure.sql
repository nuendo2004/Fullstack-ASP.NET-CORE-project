USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneThreatConfigurationRules_Update]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Rana>
-- Create date: <10-21-2022,,>
-- Description: <Update proc,,>
-- Code Reviewer:pablo

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================





CREATE proc [dbo].[ZoneThreatConfigurationRules_Update]

@Name nvarchar(100)
,@Description nvarchar(500)
,@OrganizationId int
,@SpreadLevelId int
,@SpeedCategoryId int
,@IsDeleted bit
,@ModifiedBy int
,@DateModified datetime2(7)
,@Id int output
/*
Declare @Id Int =3
Declare @Name nvarchar(100)='rana'
,@Description nvarchar(500)='test'
,@OrganizationId int=13
,@SpreadLevelId int=1
,@SpeedCategoryId int=1
,@IsDeleted bit=0
,@ModifiedBy int=8
,@DateModified datetime2 = GETUTCDATE()


Execute [dbo].[ZoneThreatConfigurationRules_Update]
@Name
,@Description
,@OrganizationId
,@SpreadLevelId
,@SpeedCategoryId
,@IsDeleted 
,@ModifiedBy 
,@DateModified
,@Id 


select * from dbo.ZoneThreatConfigurationRules
WHERE Id=@Id
*/
as

BEGIN
DECLARE @utcDate datetime2 = GETUTCDATE()
UPDATE [dbo].[ZoneThreatConfigurationRules]
SET [Name]=@Name
    ,[Description]=@Description
	,[OrganizationId]=@OrganizationId
	,[SpreadLevelId] = @SpreadLevelId
	,[IsDeleted]=@IsDeleted
	,[ModifiedBy]=@ModifiedBy
	,[DateModified]=@utcDate
	 WHERE Id=@Id
	 End
GO

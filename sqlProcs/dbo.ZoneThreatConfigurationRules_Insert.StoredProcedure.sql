USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneThreatConfigurationRules_Insert]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Author,,Rana>
-- Create date: <10-21-2022,,>
-- Description: <	Insert proc,,>
-- Code Reviewer:Pablo

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ZoneThreatConfigurationRules_Insert]
@Name nvarchar(100)
,@Description nvarchar(500)
,@OrganizationId int
,@SpreadLevelId int
,@SpeedCategoryId int
,@IsDeleted bit
,@UserId int
,@Id int OUTPUT

as
/*
Declare @Name nvarchar(100)='rana'
,@Description nvarchar(500)='test'
,@OrganizationId int=13
,@SpreadLevelId int=1
,@SpeedCategoryId int=1
,@IsDeleted bit=0
,@UserId int=8
,@Id int

Execute [dbo].[ZoneThreatConfigurationRules_Insert]
@Name
,@Description
,@OrganizationId
,@SpreadLevelId
,@SpeedCategoryId
,@IsDeleted 
,@UserId
,@Id output

select * from dbo.ZoneThreatConfigurationRules
where Id=@Id
*/
begin

INSERT INTO dbo.ZoneThreatConfigurationRules
       ([Name]
       ,[Description]
       ,[OrganizationId]
       ,[SpreadLevelId]
       ,[SpeedCategoryId]
       ,[IsDeleted]
       ,[CreatedBy]
       ,[ModifiedBy]
       )

	Values
	   (@Name
       ,@Description
       ,@OrganizationId
       ,@SpreadLevelId
       ,@SpeedCategoryId
       ,@IsDeleted
       ,@UserId
       ,@UserId)

	SET @Id =SCOPE_IDENTITY()
	--Select @Id as InsideProc
end
GO

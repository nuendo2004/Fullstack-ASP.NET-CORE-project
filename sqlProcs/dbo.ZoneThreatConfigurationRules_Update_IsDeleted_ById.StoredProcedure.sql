USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneThreatConfigurationRules_Update_IsDeleted_ById]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Rana>
-- Create date: <10-21-2022,,>
-- Description:	<update the delete value,,>
-- Code Reviewer:pablo


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ZoneThreatConfigurationRules_Update_IsDeleted_ById]
@Id int

as
/*
declare @Id int =4
Execute [dbo].[ZoneThreatConfigurationRules_Update_IsDeleted_ById]
@Id

select * from [dbo].[ZoneThreatConfigurationRules]

*/
begin



Declare @dateNow datetime2 = getutcdate()
UPDATE dbo.ZoneThreatConfigurationRules
		SET	   	 
				[DateModified] = @dateNow
				,[IsDeleted] = 1

		WHERE Id = @Id


END
GO

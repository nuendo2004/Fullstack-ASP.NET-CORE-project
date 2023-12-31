USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[OrganizationsV2_SelectAll]    Script Date: 11/15/2022 12:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/20/2022>
-- Description: <Select org by current user>
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 11/8/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[OrganizationsV2_SelectAll]
      @currentUserId INT 

/*
declare
	@currentUserId INT = 17
	EXECUTE [dbo].[OrganizationsV2_SelectAll]
		@currentUserId
	
		
*/

AS

BEGIN


		select 
			o.Id
			,o.[Name]
		from dbo.Organizations as o
		
		Where o.CreatedBy = @currentUserId
		OR EXISTS 
			(
				SELECT 1
				from dbo.Employees as e
				inner join dbo.Organizations as o2 on e.OrganizationId = o2.Id
				WHERE @currentUserId = e.UserId and o2.Id = o.Id
			)


END
GO

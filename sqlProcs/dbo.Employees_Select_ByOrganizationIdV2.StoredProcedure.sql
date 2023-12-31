USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Employees_Select_ByOrganizationIdV2]    Script Date: 11/2/2022 10:43:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <10/20/2022>
-- Description: <Selects and Orders the Employees, Users, and Organizations information by Organization Id>
-- Code Reviewer: David Ramirez (PR)

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[Employees_Select_ByOrganizationIdV2]
				@OrganizationId int
				, @PageIndex int
				, @PageSize int
as

/*--------- TEST CODE --------------

	Declare @OrganizationId int = 27;
	Declare @PageIndex int = 0;
	Declare @PageSize int = 8;

	Execute [dbo].[Employees_Select_ByOrganizationIdV2]	
								@OrganizationId
								, @PageIndex
								, @PageSize



*/

BEGIN
	
	Declare @offset int = @PageIndex * @PageSize

	SELECT emp.[Id]
			  ,us.[Id]
			  ,us.[FirstName]
			  ,us.[LastName]
			  ,us.[Mi]
			  ,us.[AvatarUrl]
			  ,us.[Email]
			  ,emp.[Phone]
			  ,emp.[IsActive]
			  ,org.[Id]
			  ,org.[Name]
			  ,org.[LogoUrl] 
			  ,org.[BusinessPhone] 
			  ,org.[SiteUrl]
			  ,emp.[StartDate]
			  ,emp.[EndDate]
			  ,emp.[DateCreated]
			  ,emp.[DateModified]
			  ,TotalCount = COUNT(1) OVER()

	FROM [dbo].[Employees] emp INNER JOIN [dbo].[Users] us
					on emp.UserId = us.Id
					INNER JOIN [dbo].[Organizations] org
					on emp.OrganizationId = org.Id
	WHERE emp.OrganizationId = @OrganizationId
	ORDER BY emp.OrganizationId

	OFFSET @offset Rows
	FETCH NEXT @PageSize Rows ONLY

END
GO

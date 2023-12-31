USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Employees_SearchV2]    Script Date: 11/2/2022 10:43:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <10/20/2022>
-- Description: <Paginated Search of Employees, returning their email and Organization Name>
-- Code Reviewer: David Ramirez (PR)

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Employees_SearchV2]
		@PageIndex int
		, @PageSize int
		, @OrganizationId int
		, @Query nvarchar(100)
as

/*------------ TEST CODE -------------------
	
	Declare @PageIndex int = 0
			, @PageSize int = 10
			, @OrganizationId int = 27
			, @Query nvarchar(100) = 'damian'

	Execute [dbo].[Employees_SearchV2]
							@PageIndex
							, @PageSize
							, @OrganizationId
							, @Query

							select * from dbo.Employees
							select * from dbo.Users

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

	WHERE (us.[FirstName] LIKE '%' + @Query + '%' OR 
			us.[LastName] LIKE '%' + @Query + '%' OR 
			us.[Email] LIKE '%' + @Query + '%'
			) AND org.Id = @OrganizationId
	ORDER BY emp.[Id]

	OFFSET @offset Rows
	FETCH NEXT @PageSize Rows ONLY

END
GO

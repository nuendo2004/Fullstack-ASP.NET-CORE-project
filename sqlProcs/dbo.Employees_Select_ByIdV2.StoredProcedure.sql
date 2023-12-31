USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Employees_Select_ByIdV2]    Script Date: 11/2/2022 10:43:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <10/20/2022>
-- Description: <Selects Employee information by Id, 
--					with joins on Users and Organizations tables>
-- Code Reviewer: David Ramirez (PR)

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Employees_Select_ByIdV2]
		@Id int
as

/*------------ TEST CODE ----------------

	Declare @Id int = 7;

	Execute [dbo].[Employees_Select_ByIdV2] @Id

*/

BEGIN

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
	FROM [dbo].[Employees] emp INNER JOIN [dbo].[Users] us
				on emp.UserId = us.Id
				INNER JOIN [dbo].[Organizations] org
				on emp.OrganizationId = org.Id
	WHERE (
			emp.Id = @Id
			)

END
GO

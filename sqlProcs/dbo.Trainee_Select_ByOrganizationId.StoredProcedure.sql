USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Trainee_Select_ByOrganizationId]    Script Date: 10/26/2022 4:17:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Miyah R.>
-- Create date: <10/26/2022>
-- Description: <Select By OrganizationId For Trainee>
-- Code Reviewer: Micheal White

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[Trainee_Select_ByOrganizationId]
    @PageIndex Int
   ,@PageSize Int
   ,@OrganizationId Int

as
/*
Declare @id int = 14
        ,@PageIndex Int = 2
        ,@PageSize Int = 4
Execute [dbo].[Trainee_Select_ByOrganizationId]

			@PageIndex 
			,@PageSize 
			,@Id 
*/

BEGIN
Declare @offset int = @PageIndex * @PageSize

	SELECT t.Id
	,t.UserId as Trainees
	,t.TrainingUnitId
	,t.TraineeStatusId
	,t.IsDeleted
	,t.CreatedBy
	,t.ModifiedBy
	,t.DateCreated
	,t.DateModified
	,tu.Id
	,tu.Name as TrainingUnits
	,tu.Description
	,tu.OrganizationId
	,tu.TrainingStatusId
	,tu.PrimaryTrainerId
	,tu.CreatedBy TrainingUnits_CreatedBy
	,tu.ModifiedBy TrainingUnits_ModifiedBy
	,tu.DateCreated as TrainingUnits_DateCreated
	,tu.DateModified as TrainingUnits_DateModified
	,o.Id as Organizations
	,o.OrganizationTypeId
	,o.Name
	,o.Description
	,o.LogoUrl
	,o.BusinessPhone
	,o.PrimaryLocationId
	,O.SiteUrl
	,o.IsDeleted
	,o.DateCreated as Organizations_DateCreated
	,o.DateModified as Organizations_DateModified
	,o.CreatedBy as Organizations_CreatedBy
	,o.ModifiedBy as Organizations_ModifiedBy
	,U.Id as Users
	,U.Email
	,U.FirstName
	,U.LastName
	,U.Mi
	,U.AvatarUrl
	,U.Password
	,U.IsConfirmed
	,U.StatusTypeId
	,U.DateCreated  as Users_DateCreated
	,U.DateModified  as Users_DateModified

    ,[TotalCount]= COUNT(1) OVER()
		
	FROM dbo.Trainees as t inner join TrainingUnits as tu
	ON t.TrainingUnitId = tu.Id
	inner join dbo.Organizations as o
	ON tu.OrganizationId = o.Id
	inner join dbo.Users as u
	ON t.UserId = u.Id

	where (t.IsDeleted=0 AND tu.OrganizationId = @OrganizationId)
	ORDER BY t.DateCreated

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

End
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_Select_ByPrimaryTrainerId]    Script Date: 11/22/2022 5:21:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/21/2022>
-- Description: < Training Unit Select by Id>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[TrainingUnits_Select_ByPrimaryTrainerId]
	 @currentUserId int
AS

/*
	Declare @currentUserId int = 23;
Execute [dbo].[TrainingUnits_Select_ByPrimaryTrainerId] @currentUserId
			

select * from dbo.TrainingUnits
*/

BEGIN

	select 
			u.Id as PrimaryTrainerId
			,u.FirstName
			,u.LastName
		from dbo.Users as u
		
		Where u.Id = @currentUserId
		OR EXISTS 
			(
				SELECT 1
				from dbo.Employees as e
				inner join dbo.Users as u2 on e.UserId = u2.Id
				WHERE @currentUserId = e.UserId and u2.Id = u.Id
			)

END
GO

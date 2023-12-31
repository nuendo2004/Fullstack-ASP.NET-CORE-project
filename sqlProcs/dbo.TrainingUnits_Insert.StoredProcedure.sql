USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_Insert]    Script Date: 10/27/2022 3:54:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/21/2022>
-- Description: < Training Unit Insert>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[TrainingUnits_Insert]
			@Name nvarchar(100) 
			,@Description nvarchar(500)
			,@OrganizationId int
			,@TrainingStatusId int
			,@PrimaryTrainerId int
			,@UserId int
			
			,@Id int OUTPUT
AS

/*
Declare @Id int = 0
Declare @Name nvarchar(100) = 'Child4'
			,@Description nvarchar(500) = 'Helping4'
			,@OrganizationId int = 14
			,@TrainingStatusId int = 1
			,@PrimaryTrainerId int = 23
			,@UserId int =	23
			
			
Execute [dbo].[TrainingUnits_Insert]

			 @Name 
			,@Description 
			,@OrganizationId 
			,@TrainingStatusId 
			,@PrimaryTrainerId 
			,@UserId 
			
			,@Id OUTPUT

select*
from dbo.TrainingUnits
where Id = @Id


*/

BEGIN

INSERT INTO dbo.TrainingUnits
			([Name]
			,[Description]
			,[OrganizationId]
			,[TrainingStatusId]
			,[PrimaryTrainerId]
			,[CreatedBy]
			,[ModifiedBy])
			
VALUES
			(@Name
			,@Description
			,@OrganizationId
			,@TrainingStatusId
			,@PrimaryTrainerId
			,@UserId
			,@UserId)

	set @Id = SCOPE_IDENTITY()
END
GO

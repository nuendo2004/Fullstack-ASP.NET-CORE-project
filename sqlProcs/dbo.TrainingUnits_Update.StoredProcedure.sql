USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_Update]    Script Date: 10/27/2022 5:40:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/21/2022>
-- Description: < Training Unit Update>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[TrainingUnits_Update]
			@Name nvarchar(100) 
			,@Description nvarchar(500)
			,@TrainingStatusId int
			,@PrimaryTrainerId int
			,@UserId int
			,@Id int 
AS

/*
Declare @Id int = 3
Declare @Name nvarchar(100) = 'Child Dev'
			,@Description nvarchar(500) = 'Helping kids'
			,@TrainingStatusId int = 5
			,@PrimaryTrainerId int = 23
			,@UserId int = 23

select*
from dbo.TrainingUnits
where Id = @Id

Execute [dbo].[TrainingUnits_Update]

			 @Name 
			,@Description 
			,@TrainingStatusId 
			,@PrimaryTrainerId  
			,@UserId 
			,@Id 

select*
from dbo.TrainingUnits
where Id = @Id


*/


BEGIN
Declare @DateNow datetime2 = getutcdate()
Update dbo.TrainingUnits
	set		[Name] = @Name
			,[Description] = @Description
			,[TrainingStatusId] = @TrainingStatusId
			,[PrimaryTrainerId] = @PrimaryTrainerId
			,[ModifiedBy] = @UserId
			,[DateModified] = @DateNow
			

WHERE id = @id
END
GO

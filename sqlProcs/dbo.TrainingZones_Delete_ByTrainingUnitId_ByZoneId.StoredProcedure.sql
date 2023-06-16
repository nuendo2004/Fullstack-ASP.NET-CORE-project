USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingZones_Delete_ByTrainingUnitId_ByZoneId]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Author,,RANA>
-- Create date: <,10/21/2022,>
-- Description: <Delete,,>
-- Code Reviewer:pablo

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[TrainingZones_Delete_ByTrainingUnitId_ByZoneId]
@TrainingUnitId int
,@ZoneId int
as
/*
Execute [dbo].[TrainingZones_Delete_ByTrainingUnitId_ByZoneId]
Declare @TrainingUnitId=1
@ZoneId=1

select * from [dbo].[TrainingZones]
where 
where TrainingUnitId=TrainingUnitId AND ZoneId=@ZoneId
*/

begin 

	DELETE  dbo.TrainingZones
        where TrainingUnitId=TrainingUnitId AND ZoneId=@ZoneId

	Select *
	FROM dbo.TrainingZones
	where TrainingUnitId=@TrainingUnitId AND ZoneId=@ZoneId


end
GO

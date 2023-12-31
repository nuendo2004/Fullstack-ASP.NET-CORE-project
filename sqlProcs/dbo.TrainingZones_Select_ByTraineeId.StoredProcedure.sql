USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingZones_Select_ByTraineeId]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[TrainingZones_Select_ByTraineeId]
@TraineeId int


as
/*
Declare @TraineeId int =8

Execute [dbo].[TrainingZones_Select_ByTraineeId]
@TraineeId 



*/
begin

SELECT
t.[TrainingUnitId]
,t.[ZoneId]
,t.[ThreatConfigId]
,t.[ZoneStatusId]
,t.[CreatedBy]
,t.[DateCreated]
,u.Id
,u.Name
,u.Description
,u.OrganizationId
,u.TrainingStatusId
,u.PrimaryTrainerId
,u.CreatedBy
,u.ModifiedBy
,u.DateCreated
,u.DateModified
,z.Id
,z.Name
,z.Description
,z.ZoneTypeId
,z.ZoneStatusId
,z.IsDeleted
,z.CreatedBy
,z.ModifiedBy
,z.DateCreated
,z.DateModified
,y.Id
,y.Name
,a.Id
,a.Name
,r.Id
,r.Name
,r.Description
,r.OrganizationId
,r.SpreadLevelId
,r.SpeedCategoryId
,r.IsDeleted
,r.CreatedBy
,r.ModifiedBy
,r.DateCreated
,r.DateModified


From dbo.TrainingZones as t Inner Join dbo.TrainingUnits as u
on t.TrainingUnitId= u.Id
INNER JOIN dbo.Zones as z on t.ZoneId=z.Id
INNER JOIN dbo.ZoneTypes as y on z.ZoneTypeId= y.Id
INNER JOIN dbo.ZoneStatus as a on t.ZoneStatusId=a.Id
INNER JOIN dbo.ZoneThreatConfigurationRules as r on t.ThreatConfigId=r.Id
INNER JOIN dbo.Trainees as e on u.Id=e.TrainingUnitId

WHERE e.Id=@TraineeId

order by e.Id



end
GO

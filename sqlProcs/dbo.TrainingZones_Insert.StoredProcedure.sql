USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingZones_Insert]    Script Date: 10/25/2022 3:37:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[TrainingZones_Insert]
@TrainingUnitId int
,@ZoneId int 
,@ThreatConfigId int
,@ZoneStatusId int
,@CreatedBy int




as
/*
Declare

@ThreatConfigId int=1
,@ZoneStatusId int=1
,@CreatedBy int=8
,@ZoneId int=2
,@TrainingUnitId int =3

 Execute [dbo].[TrainingZones_Insert]
@TrainingUnitId
,@ZoneId
 ,@ThreatConfigId
,@ZoneStatusId
,@CreatedBy

select * from dbo.TrainingZones




*/

begin

INSERT INTO dbo.TrainingZones

([TrainingUnitId]
,[ZoneId]
,[ThreatConfigId]
,[ZoneStatusId]
,[CreatedBy])

Values
(@TrainingUnitId,@ZoneId,@ThreatConfigId,@ZoneStatusId,@CreatedBy)

--SET @TrainingUnitId=SCOPE_IDENTITY()
--SET @ZoneId=SCOPE_IDENTITY()

--Select @TrainingUnitId as InsideProc
end
GO

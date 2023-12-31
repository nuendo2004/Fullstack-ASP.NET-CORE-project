USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ZoneRecords_SelectByTraineeId_Count]    Script Date: 4/3/2023 5:42:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Wen Xue>
-- Create date: <04/03/2023>
-- Description:	<Return total record counts of each zones by trainee id>
-- Code Reviewer:<William Chung>


-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ZoneRecords_SelectByTraineeId_Count]
				@TraineeId int
as
/*

	exec [dbo].[ZoneRecords_SelectByTraineeId_Count] 90

*/
			

begin				
		select 
		[Name] = (
			select z.Name 
			from dbo.Zones as z 
			where z.id = al.ZoneId)
		, Count(*) as TotalCount
		from dbo.AccessLogs as al
		where al.EntityId = @TraineeId and al.ZoneId is not null
		group by al.ZoneId
		order by [Name]			
end



GO

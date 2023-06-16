USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeStatus_SelectAll]    Script Date: 10/26/2022 4:17:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Miyah R.>
-- Create date: <10/22/2022>
-- Description: <Select All Trainee Status>
-- Code Reviewer: Pablo

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[TraineeStatus_SelectAll]

  As


  /*
  Execute   dbo.TraineeStatus_SelectAll
  */


  Begin





SELECT [Id]
      ,[Name]
  FROM [dbo].[TraineeStatus]





  End 
GO

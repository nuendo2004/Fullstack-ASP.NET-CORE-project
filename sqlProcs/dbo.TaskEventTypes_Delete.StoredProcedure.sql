USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TaskEventTypes_Delete]    Script Date: 3/16/2023 4:11:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[TaskEventTypes_Delete]
						@Id int

as


/*
Select* from
[dbo].[TaskEventTypes]

Declare @Id int = 2


Execute dbo.TaskEventTypes_Delete
							@Id

Select* from
[dbo].[TaskEventTypes]


*/

BEGIN


			

DELETE FROM [dbo].[TaskEventTypes]
      WHERE Id = @Id



END


GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TaskEvents_Delete]    Script Date: 3/15/2023 2:50:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Andrew Phothisen>
-- Create date: <03/14/2023>
-- Description:	<Delete record for TaskEvents>
-- Code Reviewer: Steve Nam


-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[TaskEvents_Delete]
						@Id int

as

/*
Select* from
[dbo].[TaskEvents]

Declare @Id int = 2


Execute dbo.TaskEvents_Delete
							@Id

Select* from
[dbo].[TaskEvents]

*/

BEGIN

DELETE FROM [dbo].[TaskEvents]
      WHERE Id = @Id

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_DeleteById]    Script Date: 9/12/2022 20:38:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Patricio Alves dos Santos>
-- Create date: <12/7/2022>
-- Description:	<Delete by id in the ExternalLinks table>
-- Code Reviewer: <Augustus Chong>


-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[ExternalLinks_DeleteById]
				@Id int
as
/*
---------- TEST CODE ---------------

	Declare @Id int = 0
		Execute [dbo].[ExternalLinks_DeleteById]
	@Id 



*/



Begin
DELETE FROM [dbo].[ExternalLinks]
      WHERE @Id=Id
end


GO

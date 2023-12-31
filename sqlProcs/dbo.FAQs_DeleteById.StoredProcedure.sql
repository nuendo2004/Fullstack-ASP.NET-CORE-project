USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_DeleteById]    Script Date: 10/24/2022 9:50:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Brendalis Sanchez>
-- Create date: <10/22/2022>
-- Description:	<Delete by id in the FAQs table>
-- Code Reviewer: Noe Gallegos


-- MODIFIED BY: author
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[FAQs_DeleteById]
				@Id int

as

/* ----- Test Code -----

		DECLARE @Id int = 16

		SELECT *
		FROM [dbo].[FAQs]
		WHERE Id = @Id;

		Execute dbo.FAQs_DeleteById @Id

		SELECT *
		FROM [dbo].[FAQs]
		WHERE Id = @Id;

*/

BEGIN

		DELETE FROM [dbo].[FAQs]
		WHERE Id = @Id;

END

GO

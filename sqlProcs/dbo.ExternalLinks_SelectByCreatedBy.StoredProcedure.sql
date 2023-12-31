USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_SelectByCreatedBy]    Script Date: 9/12/2022 20:38:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Patricio Alves dos Santos>
-- Create date: <12/07/2022>
-- Description:	<Selects all of the>
-- Code Reviewer: <Augustus Chong>

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[ExternalLinks_SelectByCreatedBy]
		@Id int
		

AS

/*--------- TEST CODE --------------
	Declare @Id int = 8
	Execute [dbo].[ExternalLinks_SelectByCreatedBy]
	@Id


*/

begin	
SELECT [Id]
      ,[UserId]
      ,[UrlTypeId]
      ,[Url]
      ,[EntityId]
      ,[EntityTypeId]
      ,[DateCreated]
      ,[DateModified]
  FROM [dbo].[ExternalLinks]

  WHERE (@Id=[UserId])

END
GO

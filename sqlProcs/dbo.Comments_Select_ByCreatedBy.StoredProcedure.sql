USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Select_ByCreatedBy]    Script Date: 11/18/2022 5:03:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Luviano, Rafael >
-- Create date: <16 Nov 2022,>
-- Description: < Comments Select_ByCreatedBy,>
-- Code Reviewer: Damien Stella
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================



CREATE proc [dbo].[Comments_Select_ByCreatedBy] 
			@UserId int output

as 
/*

Declare @UserId int = 8

Execute dbo.Comments_Select_ByCreatedBy 
			@UserId  

*/
BEGIN

	SELECT c.[Id]
		  ,c.[Subject]
		  ,c.[Text]
		  ,c.[ParentId]
		  ,c.[EntityTypeId]
		  ,c.[EntityId]
		  ,c.[DateCreated]
		  ,c.[DateModified]
		  ,u.[Id]
		  ,u.[FirstName]
		  ,u.[AvatarUrl]  
		  ,c.[IsDeleted]
		  
		  From dbo.Comments as c inner join dbo.Users as u
		   on c.CreatedBy = u.Id
		
		Where CreatedBy = @UserId

		Order by u.Id

END
GO

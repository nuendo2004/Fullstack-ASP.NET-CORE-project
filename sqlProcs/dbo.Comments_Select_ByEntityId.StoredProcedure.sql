USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Select_ByEntityId]    Script Date: 11/18/2022 5:03:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Luviano, Rafael >
-- Create date: <17 Nov 2022>
-- Description: <Comments select by EnitityId>
-- Code Reviewer: Damian Stella
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================


CREATE proc [dbo].[Comments_Select_ByEntityId]
			 @EntityId int
			,@EntityTypeId int 

/*

	Declare @EntityId int = 2 ,
			@EntityTypeId int = 2

	Execute dbo.Comments_Select_ByEntityId
							@EntityId
							,@EntityTypeId

							select *
							from dbo.EntityTypes

							select *
							from dbo.Comments

*/

AS


BEGIN
 
		SELECT c.[Id]
			  ,c.[Subject]
			  ,c.[Text]
			  ,c.[ParentId]	  
			  ,e.[Id]  as EntityTypeId
			  ,e.[Name] as EntityTypeName
              ,c.[EntityId]
			  ,c.[DateCreated]
			  ,c.[DateModified]
              ,c.[CreatedBy]
              ,c.[IsDeleted]

			  FROM dbo.Comments as c inner join dbo.EntityTypes as e
				on c.EntityTypeId = e.Id
			  WHERE (EntityId = @EntityId)
					AND 
					(EntityTypeId = @EntityTypeId)

END
GO

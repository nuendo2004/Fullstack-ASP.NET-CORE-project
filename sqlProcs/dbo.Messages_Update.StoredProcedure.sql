USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Messages_Update]    Script Date: 10/31/2022 22:13:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Joe Medina>
-- Create date: <10/30/2022>
-- Description: <Update Message>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE: <10/30/2022>
-- Code Reviewer: Damian Stella
-- Note:
-- =============================================
CREATE proc [dbo].[Messages_Update]
	@Id int
	,@Message nvarchar(1000)
	,@Subject nvarchar(100)
	,@RecipientEntityTypeId int
	,@RecipientId int
	,@ZoneId int
	,@DateSent datetime2 = NULL
	,@DateRead datetime2 = NULL

AS

/*

DECLARE @Id int = 10
		,@Message nvarchar(1000) = 'An updated zone message'
		,@Subject nvarchar(100) = 'Updated Subject'
		,@RecipientEntityTypeId int = 1
		,@RecipientId int = 8
		,@ZoneId int = 1
		,@DateSent datetime2 = '10/31/2022'
		,@DateRead datetime2 = null

EXECUTE dbo.Messages_Update
	@Id
	,@Message
	,@Subject
	,@RecipientEntityTypeId
	,@RecipientId
	,@ZoneId
	,@DateSent
	,@DateRead

*/

BEGIN

	UPDATE	[dbo].[Messages]
	SET		[Message] = @Message
			,[Subject] = @Subject
			,[RecipientEntityTypeId] = @RecipientEntityTypeId
			,[RecipientId] = @RecipientId
			,[ZoneId] = @ZoneId
			,[DateSent] = @DateSent
			,[DateRead] = @DateRead
			,[DateModified] = GETUTCDATE()
	WHERE	Id = @Id

END


GO

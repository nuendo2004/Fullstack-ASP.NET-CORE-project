USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[InviteMembers_Insert]    Script Date: 11/30/2022 5:57:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <11/15/2022>
-- Description: <Creates a member that we are inviting to join as a user>
-- Code Reviewer: Andrew Hoang

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[InviteMembers_Insert]
			@Id int OUTPUT
			, @FirstName nvarchar(100)
			, @LastName nvarchar(100)
			, @Email nvarchar(200)
			, @UserRoleTypeId int
			, @OrganizationId int
			, @TokenTypeId int
			, @Token nvarchar(MAX)
			, @CreatedBy int

as

/*------------- TEST CODE ------------------

	Declare @Id int = 0
			, @FirstName nvarchar(100) = 'Smitty'
			, @LastName nvarchar(100) = 'WerbenJagerManJensen'
			, @Email nvarchar(200) = 'smittywerben@email.com'
			, @UserRoleTypeId int = 10
			, @OrganizationId int = 27
			, @TokenTypeId int = 10
			, @Token nvarchar(MAX) = '2172b43a-a024-498a-989c-c54894727111'
			, @CreatedBy int = 79

	Execute [dbo].[InviteMembers_Insert] @Id OUTPUT
										 , @FirstName
										 , @LastName
										 , @Email
										 , @UserRoleTypeId
										 , @OrganizationId
										 , @TokenTypeId
										 , @Token
										 , @CreatedBy

	SELECT *
	FROM [dbo].[InviteMembers]
	WHERE Id = @Id

*/

BEGIN
	
	INSERT INTO [dbo].[InviteMembers]
							([FirstName]
							, [LastName]
							, [Email]
							, [UserRoleTypeId]
							, [OrganizationId]
							, [TokenTypeId]
							, [Token]
							, [CreatedBy])
	VALUES
			(@FirstName
			, @LastName
			, @Email
			, @UserRoleTypeId
			, @OrganizationId
			, @TokenTypeId
			, @Token
			, @CreatedBy)

	SET @Id = SCOPE_IDENTITY()

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[InviteMembers_Select_ByToken]    Script Date: 11/30/2022 5:57:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Miranda Merritt>
-- Create date: <11/26/2022>
-- Description: <Gets the invited member by token>
-- Code Reviewer: 

-- MODIFIED BY: author
-- MODIFIED DATE: mm/dd/yyyy
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[InviteMembers_Select_ByToken]
			@Token nvarchar(MAX)

as

/*----------------- TEST CODE-----------------

	Declare @Token nvarchar(MAX) = '2172b43a-a024-498a-989c-c54894727mmm';

	Execute [dbo].[InviteMembers_Select_ByToken] @Token

*/

BEGIN
	
	Declare @DateNow dateTime2 = getutcdate()
	
	SELECT Id
			, FirstName
			, LastName
			, Email
			, UserRoleTypeId
			, OrganizationId
			, TokenTypeId
			, Token
			, ExpirationDate
			, DateCreated
			, CreatedBy
	
	FROM [dbo].[InviteMembers]

	WHERE (Token = @Token) AND ([ExpirationDate] > @dateNow)
		
END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[NewsletterSubscriptions_Update]    Script Date: 12/20/2022 11:15:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 --=============================================
 --Author: <Ramirez, Andrew>
 --Create date: <2022-12-19>
 --Description: <Update for NewsletterSubscriptions>
 --Code Reviewer: Joseph Aquino
 

 --MODIFIED BY: 
 --MODIFIED DATE: 
 --Code Reviewer: 
 --Note: 
 --=============================================
CREATE PROC [dbo].[NewsletterSubscriptions_Update]
			@Email nvarchar(100)
			,@IsSubscribed bit

AS
/*-----TEST CODE----

	DECLARE @Email nvarchar(100) = 'jake123@email.com'
			,@IsSubscribed bit = 0

	EXECUTE [dbo].[NewsletterSubscriptions_Update]
			@Email 
			,@IsSubscribed 

*/

BEGIN

	UPDATE [dbo].[NewsletterSubscriptions]
	   SET [IsSubscribed] = @IsSubscribed
		  ,[DateModified] = GETUTCDATE()
	 WHERE [Email] = @Email

END
GO

USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update_Password]    Script Date: 12/15/2022 11:28:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Jacob Helton>
-- Create date: <12/15/2022>
-- Description: <Updates Password for Users.>
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note:
-- =============================================

CREATE proc [dbo].[Users_Update_Password]
						@Password nvarchar(100)
					   ,@Id int

as

/*--------- TEST CODE -----------------
	
	Declare @Password nvarchar(100) = 'Password1!'
			,@Id int = 165

	Select *
	From [dbo].[Users]
	Where Id = @Id

	Execute [dbo].[Users_Update_Password] @Password, @Id

	Select *
	From [dbo].[Users]
	Where Id = @Id


*/

BEGIN

	Update [dbo].[Users]
		SET [Password] = @Password

	Where Id = @Id

END
GO

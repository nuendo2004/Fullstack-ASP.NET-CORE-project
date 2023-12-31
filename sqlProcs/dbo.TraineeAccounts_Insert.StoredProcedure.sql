USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_Insert]    Script Date: 10/29/2022 7:11:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <10/23/2022>
-- Description: <Adds TraineeAccounts.>
-- Code Reviewer: Michael Valdez

-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 10/28/2022
-- Code Reviewer: Miyah Robinson
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_Insert]
           @Username nvarchar(100)
           ,@Password nvarchar(100)
           ,@AvatarUrl nvarchar(255)
           ,@ZoneId int
           ,@TraineeId int
           ,@AccountStatusId int
           ,@CreatedBy int
           ,@ModifiedBy int
		   ,@Id int OUTPUT
as

/* ----- Test Code -----
	
	SELECT *
	FROM dbo.TraineeAccounts
	

	DECLARE @Username nvarchar(100) = 'TReUseame'
           ,@Password nvarchar(100) = 'Teewd'
           ,@AvatarUrl nvarchar(255) = 'Tevirl'
           ,@ZoneId int = 5
           ,@TraineeId int = 7
           ,@AccountStatusId int = 3
           ,@CreatedBy int = 22
           ,@ModifiedBy int = 22		   
		   ,@Id int

	EXECUTE [dbo].[TraineeAccounts_Insert]
			@Username
           ,@Password
           ,@AvatarUrl
           ,@ZoneId
           ,@TraineeId
           ,@AccountStatusId
           ,@CreatedBy
           ,@ModifiedBy
		   ,@Id OUTPUT

	SELECT *
	FROM dbo.TraineeAccounts
	WHERE Id = @Id

*/

BEGIN

INSERT INTO [dbo].[TraineeAccounts]
           ([Username]
           ,[Password]
           ,[AvatarUrl]
           ,[ZoneId]
           ,[TraineeId]
           ,[AccountStatusId]
           ,[CreatedBy]
           ,[ModifiedBy]
           )		   

	VALUES
			(@Username
			,@Password
			,@AvatarUrl
			,@ZoneId
			,@TraineeId
			,@AccountStatusId
			,@CreatedBy
			,@ModifiedBy)

	SET @Id = SCOPE_IDENTITY()

END
GO
USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TraineeAccounts_Insert]    Script Date: 3/9/2023 12:15:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Brendalis Sanchez>
-- Create date: <10/23/2022>
-- Description: <Adds TraineeAccounts.>
-- Code Reviewer: Michael Valdez

-- MODIFIED BY: Brendalis Sanchez
-- MODIFIED DATE: 10/28/2022
-- Code Reviewer: Miyah Robinson
-- Note:
-- =============================================

CREATE proc [dbo].[TraineeAccounts_Insert]
           @Username nvarchar(100)
           ,@Password nvarchar(100)
           ,@AvatarUrl nvarchar(255)
           ,@ZoneId int
           ,@TraineeId int
           ,@CreatedBy int
           ,@ModifiedBy int
		   ,@Id int OUTPUT
AS

/* ----- Test Code -----
	
	SELECT *
	FROM dbo.TraineeAccounts
	

	DECLARE @Username nvarchar(100) = 'dsassdfsdfdafjkdlsfjlkUseame'
           ,@Password nvarchar(100) = 'Teewd'
           ,@AvatarUrl nvarchar(255) = 'Tevirl'
           ,@ZoneId int = 5
           ,@TraineeId int = 7
           ,@CreatedBy int = 22
           ,@ModifiedBy int = 22		   
		   ,@Id int

	EXECUTE [dbo].[TraineeAccounts_Insert]
			@Username
           ,@Password
           ,@AvatarUrl
           ,@ZoneId
           ,@TraineeId
           ,1
           ,@CreatedBy
           ,@ModifiedBy
		   ,@Id OUTPUT

	SELECT *
	FROM dbo.TraineeAccounts
	WHERE Id = @Id

	If NOT EXISTS(Select *
					From dbo.TraineeAccounts
					Where @Username= Username
					)

*/


BEGIN

	INSERT INTO [dbo].[TraineeAccounts]
			   ([Username]
			   ,[Password]
			   ,[AvatarUrl]
			   ,[ZoneId]
			   ,[TraineeId]
			   ,[AccountStatusId]
			   ,[CreatedBy]
			   ,[ModifiedBy]
			   )		   

		VALUES
				(@Username
				,@Password
				,@AvatarUrl
				,@ZoneId
				,@TraineeId
				,1
				,@CreatedBy
				,@ModifiedBy)
 
	SET @Id = SCOPE_IDENTITY();

END
GO

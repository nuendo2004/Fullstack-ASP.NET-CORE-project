USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Transactions_Insert]    Script Date: 11/1/2022 2:01:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	<JustinNguyen>
-- Create date: <10/28/2022>
-- Description:	<Transactions_Insert>
-- Code Reviewer: Rey Villasenor


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[Transactions_Insert]
			@PaymentTypeId int
			,@ExternalTransactionId nvarchar(255)
			,@ExternalUserId nvarchar(255)
			,@AmountCharged decimal(18,2)
			,@CreatedBy int
			,@Id int OUTPUT

/*
	Declare @Id int = 0

	Declare 
			@PaymentTypeId int = 1
			,@ExternalTransactionId nvarchar(255) = 'abc1'
			,@ExternalUserId nvarchar(255) = 'user1'
			,@AmountCharged decimal(18,2) = 3.1415
			,@CreatedBy int = 8
	
	Execute dbo.Transactions_Insert
			@PaymentTypeId
			,@ExternalTransactionId
			,@ExternalUserId
			,@AmountCharged
			,@CreatedBy
			,@Id OUTPUT

	Select *
	From dbo.Transactions

*/

as
BEGIN


INSERT INTO [dbo].[Transactions]
           ([PaymentTypeId]
           ,[ExternalTransactionId]
           ,[ExternalUserId]
           ,[AmountCharged]
           ,[CreatedBy])
     VALUES
           (@PaymentTypeId
           ,@ExternalTransactionId
           ,@ExternalUserId
           ,@AmountCharged
           ,@CreatedBy)

	SET @Id = SCOPE_IDENTITY()

END

GO

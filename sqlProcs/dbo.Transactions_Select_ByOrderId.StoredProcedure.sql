USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Transactions_Select_ByOrderId]    Script Date: 11/1/2022 2:01:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	<JustinNguyen>
-- Create date: <10/28/2022>
-- Description:	<Transactions_Select_ByOrderId_SelectAll>
-- Code Reviewer: Rey Villasenor


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[Transactions_Select_ByOrderId]

/*
	Execute dbo.Transactions_Select_ByOrderId
*/
as
BEGIN


SELECT t.Id
      ,t.PaymentTypeId
      ,t.ExternalTransactionId
      ,t.ExternalUserId
      ,t.AmountCharged
      ,u.Id as userId
      ,t.DateCreated

  FROM [dbo].[Transactions] as t inner join dbo.Users as u
  on t.CreatedBy = u.Id

END

GO

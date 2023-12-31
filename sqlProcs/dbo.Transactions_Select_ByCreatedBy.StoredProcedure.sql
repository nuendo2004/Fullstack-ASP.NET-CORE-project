USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[Transactions_Select_ByCreatedBy]    Script Date: 11/1/2022 2:01:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	<JustinNguyen>
-- Create date: <10/28/2022>
-- Description:	<Transactions_Select_ByCreatedBy_Paginated>
-- Code Reviewer: Rey Villasenor


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[Transactions_Select_ByCreatedBy]
		@PageIndex int
		,@PageSize int
		,@CreatedBy int
/*
	Declare @PageIndex int = 0
			,@PageSize int = 10
			,@CreatedBy int = 8

	Execute dbo.Transactions_Select_ByCreatedBy
			@PageIndex
			,@PageSize
			,@CreatedBy

	Select *
	from dbo.Transactions
*/

as
BEGIN
	Declare @offset int = @PageIndex * @PageSize
SELECT t.Id
      ,t.PaymentTypeId
      ,t.ExternalTransactionId
      ,t.ExternalUserId
      ,t.AmountCharged
      ,u.Id as userId
      ,t.DateCreated
	  ,TotalCount = COUNT(1) OVER()

  FROM [dbo].[Transactions] as t inner join dbo.Users as u
  on t.CreatedBy = u.Id
  Where t.CreatedBy = @CreatedBy
  ORDER BY t.CreatedBy
	  OFFSET @offset ROWS
	  FETCH NEXT @PageSize ROWS ONLY


END

GO
